export function createRadioPlayer({
  audio,
  onState = () => {},
  remember = () => {},
  online = () => navigator.onLine !== false,
  setTimer = setTimeout,
  clearTimer = clearTimeout,
}) {
  let station = null,
    wanted = false,
    attempts = 0,
    timer = null,
    epoch = 0,
    state = "idle";
  const cancel = () => {
    clearTimer(timer);
    timer = null;
  };
  const emit = (next) => {
    state = next;
    onState({ state, station, attempts, wanted });
  };
  function schedule() {
    cancel();
    if (!wanted) return;
    if (!online()) {
      emit("offline");
      return;
    }
    if (attempts >= 5) {
      emit("failed");
      return;
    }
    emit("reconnecting");
    timer = setTimer(
      () => {
        attempts++;
        connect();
      },
      Math.min(2000 * 2 ** attempts, 30000),
    );
  }
  async function connect() {
    cancel();
    const current = ++epoch;
    if (!station || !wanted) return { ok: false };
    if (!online()) {
      emit("offline");
      return { ok: false, reason: "offline" };
    }
    emit(attempts ? "reconnecting" : "connecting");
    audio.src = station.url;
    audio.load();
    timer = setTimer(schedule, 15000);
    try {
      await audio.play();
      if (current !== epoch || !wanted) return { ok: false };
      return { ok: true };
    } catch (error) {
      if (current !== epoch || !wanted) return { ok: false };
      if (error.name === "NotAllowedError") {
        cancel();
        emit("blocked");
      } else schedule();
      return {
        ok: false,
        reason:
          error.name === "NotAllowedError"
            ? "Tap Play on this screen to allow audio."
            : "Stream unavailable; reconnecting.",
      };
    }
  }
  audio.addEventListener("playing", () => {
    if (!wanted) {
      audio.pause();
      return;
    }
    cancel();
    attempts = 0;
    emit("playing");
  });
  for (const event of ["error", "ended"])
    audio.addEventListener(event, () => {
      if (wanted) schedule();
    });
  for (const event of ["waiting", "stalled"])
    audio.addEventListener(event, () => {
      if (!wanted) return;
      emit("buffering");
      if (!timer) timer = setTimer(schedule, 15000);
    });
  return {
    get station() {
      return station;
    },
    get state() {
      return state;
    },
    get wanted() {
      return wanted;
    },
    play(value = station) {
      if (!value)
        return Promise.resolve({
          ok: false,
          reason: "Choose a station first.",
        });
      station = value;
      wanted = true;
      attempts = 0;
      remember(value);
      return connect();
    },
    pause() {
      wanted = false;
      epoch++;
      cancel();
      audio.pause();
      emit(station ? "paused" : "idle");
    },
    restore(value) {
      if (wanted) return;
      station = value;
      emit(value ? "paused" : "idle");
    },
    offline() {
      epoch++;
      cancel();
      if (wanted) {
        audio.pause();
        emit("offline");
      }
    },
    online() {
      if (wanted && state === "offline") {
        attempts = 0;
        connect();
      }
    },
  };
}
