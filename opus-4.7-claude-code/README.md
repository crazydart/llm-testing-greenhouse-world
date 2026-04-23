# Greenwood Nursery — 3D Walkthrough

A first-person, browser-based walkthrough of a four-greenhouse plant nursery (Desert, Jungle, Houseplants, Bonsai), inspired by the provided reference image. Built with [Three.js](https://threejs.org/), loaded from a CDN. No build step, no dependencies to install.

---

## Quick Start

The entire experience is a single file: `index.html`. Because it uses ES modules with an import map, **it must be served over HTTP** — double-clicking the file from Finder will not work in most browsers.

### Option 1 — Python (built into macOS)

From this directory, run:

```bash
python3 -m http.server 8765
```

Then open **<http://localhost:8765>** in any modern browser (Chrome, Safari, Firefox, or Edge).

### Option 2 — Node.js

```bash
npx http-server -p 8765
```

Same URL: <http://localhost:8765>

### Option 3 — VS Code

Install the **Live Server** extension, right-click `index.html`, and choose *Open with Live Server*.

### Stopping the server

Press `Ctrl+C` in the terminal. If it's running in the background, find the process with `lsof -i :8765` and `kill` the PID.

---

## Browser Requirements

- **WebGL 2.0** enabled (default in all modern browsers)
- **Pointer Lock API** — required for mouse look; used by default in Chromium-based browsers, Firefox, and Safari 14+
- Hardware acceleration recommended — the scene renders ~200 meshes with real-time shadows

If the page appears black, open the browser DevTools console (`Cmd+Option+J` / `F12`) and check for errors.

---

## Controls

The overlay screen lists the controls; they are reproduced here for reference.

### Movement

| Input | Action |
|---|---|
| `W` | Walk forward |
| `S` | Walk backward |
| `A` | Strafe left |
| `D` | Strafe right |
| `Shift` (held) | Run (roughly 2× speed) |
| `Space` | Jump |
| `Mouse` | Look around (after pointer lock engages) |
| `Esc` | Release the mouse cursor |

### Interaction

| Input | Action |
|---|---|
| **Click** | Interact with whatever the crosshair is pointing at |

The crosshair sits in the center of the screen. When you aim it at something interactive, it **turns gold and enlarges**, and a small tooltip appears beneath it telling you what you're about to do (e.g. *"Click: Saguaro Cactus"* or *"Click to open/close door"*).

**Interactive elements include:**

- **Plants** — Click any plant inside any greenhouse to see its species name and a short horticultural note.
- **Doors** — Each greenhouse has a hinged wooden door on its south-facing gable. Click to swing it open or closed.
- **Theme signs** (DESERT · JUNGLE · HOUSEPLANTS · BONSAI) — Above each door. Click for a description of that house's collection.
- **The entrance sign** — *GREENWOOD NURSERY — Est. 1932* — Click for background on the nursery.
- **Watering cans** — Three of them are scattered on the paths (two near the front, one around back). Click to pick one up; it will appear in your hand (bottom-right corner). While carrying it, clicking any plant **waters** it — triggers an animated droplet burst and a confirmation popup. Click the inventory badge in the bottom-right to drop the can.

Popups auto-dismiss after ~7 seconds, or click the `×` in the top-right corner of the popup.

### Re-engaging Pointer Lock

If you press `Esc` and your mouse is released, simply **click anywhere in the 3D view** to re-lock the pointer and resume looking around.

---

## The Four Greenhouses

Arranged left to right from the entrance sign:

| # | Name | Terrain | Featured Plants |
|---|---|---|---|
| 1 | **DESERT** | Sand & rocks | Saguaros, golden barrel cacti, agaves, prickly pears |
| 2 | **JUNGLE** | Dark soil, raised cedar beds | Areca palms, monstera, Boston ferns, banana plants |
| 3 | **HOUSEPLANTS** | Gravel, wooden benches | Snake plants, pothos, fiddle-leaf figs, succulents, hanging pothos |
| 4 | **BONSAI** | Gravel, raised cedar benches | Junipers, white pines, elms, Japanese maples |

Each greenhouse has a numbered sign on its gable (1 through 4) visible from the plaza.

---

## Layout Reference

```
                    (perimeter forest)
   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
   │   1    │  │   2    │  │   3    │  │   4    │
   │ DESERT │  │ JUNGLE │  │ HOUSE- │  │ BONSAI │
   │        │  │        │  │ PLANTS │  │        │
   │        │  │        │  │        │  │        │
   │ ▯door▯ │  │ ▯door▯ │  │ ▯door▯ │  │ ▯door▯ │
   └────────┘  └────────┘  └────────┘  └────────┘
                      ╔══════════╗
                      ║GREENWOOD ║      ← entrance sign
                      ║ NURSERY  ║
                      ╚══════════╝
                  ◆ you spawn here, facing north
```

Paths of gravel connect the plaza to the rear of each building.

---

## Troubleshooting

**The page loads but nothing is visible / everything is black.**
Check the browser console. Most commonly: the page was opened via `file://` instead of `http://`, which blocks ES module imports. Serve it with `python3 -m http.server`.

**The mouse doesn't move the camera.**
Pointer lock isn't engaged. Click the "Enter the Nursery" button, or click anywhere in the canvas. On macOS, Safari may prompt for permission the first time.

**I walked through a wall.**
The collision box has a small radius (0.35m). If you wedge yourself into a corner at high speed you may occasionally slip through — walk back out and continue.

**Performance is choppy.**
Shadows are the expensive part. If needed, you can lower shadow map resolution in `index.html` (search for `sun.shadow.mapSize`).

**No sound.**
There is no sound — this version is silent.

---

## Files

- `index.html` — the entire experience (HTML + CSS + Three.js code in one file)
- `prompt-image.png` — the reference aerial photo that inspired the layout
- `README.md` — this document

No build artifacts, no `node_modules`, no package manifest. Just serve and open.
