# Greenhouse World — 3D Walkthrough

## How to Run

**Option 1: Open directly in browser**
```
open greenhouse.html
```
or double-click `greenhouse.html` in Finder.

**Option 2: Serve via local HTTP server** (required for ES module imports)
```
cd qwen3.6-27b-Q6-opencode
python3 -m http.server 8080
```
Then open http://localhost:8080/greenhouse.html in your browser.

## Controls

| Key | Action |
|-----|--------|
| **W A S D** | Move forward, left, back, right |
| **Mouse** | Look around (after clicking to start) |
| **Shift** | Run (faster movement) |
| **Space** | Jump |
| **Click** | Interact with hovered object |
| **E** | Interact with object you're facing |
| **M** | Toggle minimap |
| **ESC** | Release mouse / pause |

## What to Interact With

- **Doors**: Click any greenhouse door to open/close it, then walk inside
- **Plants**: Click any plant to see information about it in a popup
- **Signs**: Greenhouse name signs are displayed above each door

## World Layout

Four themed greenhouses arranged left to right:

1. **Desert** — Saguaro cacti, barrel cacti, aloe, succulents in pots, scattered rocks, sandy ground
2. **Jungle** — Monsteras, ferns, banana plants, heliconia flowers, hanging vines, dense ground cover
3. **House Plants** — Snake plants, pothos on shelves, fiddle leaf fig, peace lily, spider plant, succulent on center table
4. **Bonsai** — Juniper, pine, maple, ficus, and jade bonsai on stone tables, zen garden with raked gravel, stone lantern, jin technique display

Connecting glass-covered tunnels link each greenhouse. An entrance sign greets you at the front.

## Technical Details

- **Engine**: Three.js r163 (loaded from jsDelivr CDN)
- **Controls**: PointerLockControls for FPS-style first-person movement
- **Collision**: AABB-based wall collision with player push-out resolution
- **Rendering**: ACES filmic tone mapping, PCF soft shadows, exponential fog
- **Single file**: All code, styling, and assets are self-contained in `greenhouse.html`
