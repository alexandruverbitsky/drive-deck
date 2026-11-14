// Size app pages from the space left after the header and persistent player.
export function pageLayout(width, height, editing = false) {
  const gap = 10;
  const columns = Math.max(
    1,
    Math.min(
      6,
      Math.floor((Math.max(0, width - 8) + gap) / (editing ? 150 : 108)),
    ),
  );
  const rows = Math.max(
    1,
    Math.min(
      4,
      Math.floor((Math.max(0, height - 12) + gap) / (editing ? 164 : 118)),
    ),
  );
  return { columns, rows, capacity: columns * rows };
}
export function createPager({ viewport, controls, previous, next, status }) {
  let nodes = [],
    editing = false,
    page = 0,
    capacity = 1,
    total = 1,
    frame;
  let layoutKey = "";
  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function update() {
    page = Math.max(
      0,
      Math.min(
        total - 1,
        Math.round(viewport.scrollLeft / Math.max(1, viewport.clientWidth)),
      ),
    );
    previous.disabled = page === 0;
    next.disabled = page === total - 1;
    const label = `Page ${page + 1} of ${total}`;
    if (status.textContent !== label) status.textContent = label;
    for (const [index, button] of [...controls.children].entries()) {
      button.setAttribute("aria-current", index === page ? "page" : "false");
      button.classList.toggle("selected", index === page);
    }
    controls.children[page]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "auto",
    });
  }
  function go(index, smooth = true) {
    page = Math.max(0, Math.min(total - 1, index));
    viewport.scrollTo({
      left: page * viewport.clientWidth,
      behavior: smooth && !reducedMotion() ? "smooth" : "auto",
    });
    // Native scroll events keep dots and arrows in sync throughout a swipe.
    update();
  }
  function arrange(force = false) {
    const width = viewport.clientWidth,
      height = viewport.clientHeight;
    if (!width || !height) return;
    const layout = pageLayout(width, height, editing);
    const key = `${width}:${height}:${layout.capacity}:${editing}`;
    if (!force && key === layoutKey) return;
    layoutKey = key;
    const anchor = page * capacity;
    capacity = layout.capacity;
    total = Math.max(1, Math.ceil(nodes.length / capacity));
    page = Math.min(total - 1, Math.floor(anchor / capacity));
    viewport.style.setProperty("--page-columns", layout.columns);
    viewport.style.setProperty("--page-rows", layout.rows);
    viewport.style.setProperty(
      "--app-size",
      `${Math.round(0.7 * Math.max(36, Math.min(64, height - (editing ? 106 : 56))))}px`,
    );
    const focused = document.activeElement;
    viewport.replaceChildren();
    controls.replaceChildren();
    for (let index = 0; index < total; index++) {
      const section = document.createElement("section");
      section.className = "shortcut-page";
      section.setAttribute("aria-label", `App page ${index + 1} of ${total}`);
      section.append(...nodes.slice(index * capacity, (index + 1) * capacity));
      viewport.append(section);
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to app page ${index + 1}`);
      dot.onclick = () => go(index);
      controls.append(dot);
    }
    viewport.scrollTo({ left: page * width, behavior: "auto" });
    if (focused && viewport.contains(focused))
      focused.focus({ preventScroll: true });
    update();
  }
  previous.onclick = () => go(page - 1);
  next.onclick = () => go(page + 1);
  viewport.addEventListener("scroll", update, { passive: true });
  viewport.addEventListener("keydown", (event) => {
    if (event.target !== viewport) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    go(
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? total - 1
          : page + (event.key === "ArrowRight" ? 1 : -1),
    );
  });
  new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => arrange());
  }).observe(viewport);
  return {
    setItems(nextNodes, isEditing, reset = false) {
      nodes = nextNodes;
      editing = isEditing;
      if (reset) page = 0;
      arrange(true);
    },
  };
}
