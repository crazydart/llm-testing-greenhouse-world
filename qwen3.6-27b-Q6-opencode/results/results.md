Run on a local LLM hosted on B70 GPUs — Qwen 3.6 27B (Q6 quant) driven by the opencode harness. Surprisingly strong result for a small local model. Generated a clean 3D world on the first shot — no follow-up prompts needed.

Generation took **47 minutes** end-to-end and the context window was at **~50k tokens** when it finished.

Notable details:
- Doors render somewhat *inside* the greenhouses rather than flush with the front wall.
- Plants are visually interesting and use more than just green — terracotta pots, gray boulders, varied shapes per theme.
- Movement is a little buggy — got stuck against geometry a few times and had to restart the page.
- Has connecting tunnels between greenhouses (per the model's own README) — the first model in this test to actually attempt them.
- Doors are clickable to open/close, plants are clickable for info popups.
