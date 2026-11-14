// Shared allowlist: saved choices are IDs, never user-supplied CSS or URLs.
export const defaultTheme = "aurora";
export const themes = [
  {
    id: "aurora",
    name: "Aurora",
    description: "Electric blue · violet",
    mode: "dark",
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Coral · magenta · midnight",
    mode: "dark",
  },
  { id: "ocean", name: "Ocean", description: "Cyan · deep blue", mode: "dark" },
  { id: "solar", name: "Solar", description: "Amber · ink blue", mode: "dark" },
  {
    id: "midnight",
    name: "Midnight",
    description: "Clean, quiet charcoal",
    mode: "dark",
  },
  {
    id: "graphite",
    name: "Graphite",
    description: "Silver · smoke",
    mode: "dark",
  },
  {
    id: "daylight",
    name: "Daylight",
    description: "Bright, soft and airy",
    mode: "light",
  },
  {
    id: "forest",
    name: "Forest",
    description: "The original moss green",
    mode: "dark",
  },
];
export const isTheme = (value) => themes.some((theme) => theme.id === value);
