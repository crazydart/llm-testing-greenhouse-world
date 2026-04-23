# Greenwood Nursery — 3D Tour

A browser-based first-person 3D walkthrough of the Greenwood Nursery greenhouse complex, with four themed sections: Desert, Jungle, Houseplants, and Bonsai.

## How to Run

The experience is a single self-contained HTML file. No server, build step, or installation required.

**Open directly in a browser:**

```
open greenhouse.html
```

Or drag `greenhouse.html` into any modern browser window (Chrome, Firefox, Safari, Edge).

> Three.js is loaded from a CDN, so an internet connection is required on first load. After that it may be cached.

---

## Controls

| Action | Key / Input |
|---|---|
| **Look around** | Move mouse (after clicking to start) |
| **Move forward** | `W` or `↑` |
| **Move backward** | `S` or `↓` |
| **Strafe left** | `A` or `←` |
| **Strafe right** | `D` or `→` |
| **Run** | Hold `Shift` while moving |
| **Inspect plant** | Look at a plant, press `E` when prompted |
| **Pause / release mouse** | `Esc` |
| **Resume** | Click the screen |

---

## World Layout

```
[Entrance / Outdoor Area]
         |
   [Sign: Greenwood Nursery]
         |
 ┌───────┬───────┬──────────┬────────┐
 │Desert │Jungle │Houseplants│ Bonsai │
 │  GH1  │  GH2  │   GH3    │  GH4  │
 └───────┴───────┴──────────┴────────┘
```

You start outside, facing the four greenhouses. Walk forward to enter any of them through their front doors.

---

## Interactive Plants

Approach the featured plant in each greenhouse and press `E` to read about it:

| Greenhouse | Featured Plant | Info |
|---|---|---|
| Desert | Giant Saguaro Cactus | Lifespan, habitat, size |
| Jungle | Areca Palm | Air-purifying qualities, care |
| Houseplants | Monstera Deliciosa | Leaf fenestrations, growth |
| Bonsai | Japanese Maple Bonsai | Age, pruning tradition |

The info panel closes automatically after 6 seconds.

---

## HUD Elements

- **Crosshair** — center of screen, used for targeting interactive plants
- **[E] Plant Name** — appears when looking at an interactable plant within range
- **Zone label** — top center, shows which greenhouse you're currently inside
- **Minimap** — bottom right; colored squares are the four greenhouses, white dot is your position, white line is your facing direction
- **Controls reminder** — bottom left, visible while playing
