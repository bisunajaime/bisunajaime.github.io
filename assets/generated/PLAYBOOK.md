# MiniMax H3 Image playbook

Sources: [GH] github.com/MiniMax-AI/MiniMax-H3-Image (README, `skills/h3-image-prompt-writing`, `examples/`);
[HF] huggingface.co/MiniMaxAI/MiniMax-H3-Image and `-PE`; [Comfy] docs.comfy.org MiniMax H3 Image tutorial
plus the installed templates `image_minimax_h3_image_t2i.json` / `image_minimax_h3_image_edit.json` (templates pack 0.11.106).

1. **Sampler is fixed, do not tune it.** KSampler: 6 steps, cfg 1.0, `euler`, `simple`, denoise 1.0. The model is
   distilled to 6 steps with no CFG; the reference server rejects any other steps/guidance with HTTP 400. [HF][Comfy]
2. **No negative prompt.** cfg 1 means no CFG pass; the template feeds `ConditioningZeroOut` as negative. Put every
   exclusion into the positive prompt as a plain statement ("No people appear."). [Comfy][GH]
3. **Resolution: 4 MP minimum, 16 MP best.** Working range ~4-20 MP; best at ~16 MP (1:1 4096x4096, 4:3 4736x3552,
   3:2 5024x3360, 16:9 5472x3072, 21:9 6272x2688). Both sides must be multiples of 32. The Comfy template defaults to
   4 MP (2048x2048) and warns "doesn't work well in low resolution"; never go below ~2048x2048-equivalent area.
   For web assets: render at 4-8 MP for drafts, final picks at 8-16 MP, then downscale for the site. [GH][Comfy]
4. **Write the whole finished image, in English, as flowing paragraphs.** Order: what the image is / is for ->
   layout (subject count, positions, viewpoint, empty space) -> subjects and their state -> style. The local
   pipeline uses the prompt verbatim (no auto-expansion), so short prompts underperform. [GH skill]
5. **Style through visible details, not quality words.** Name colour, material, light direction and texture
   ("warm low sun from upper left, honed limestone, generous negative space") instead of "premium", "stunning",
   "8k". Words like "cinematic" do not set the canvas shape. [GH README "Prompting Tips"; PE system prompt]
6. **Always state "The image contains no text, letters or numbers."** unless you want text; the model otherwise
   tends to add titles/labels. When you do want text, quote every word exactly, with position and line breaks. [GH]
7. **Prompt expander = for short ideas only.** The template's `TextGenerateV2` with `qwen3.5_9b_w4a8_gptq`
   (stand-in for the official Qwen3.8-27B PE) rewrites a short idea into a detailed caption + aspect ratio
   (template only uses the caption; size still comes from width/height). Use it to explore ideas; turn it OFF
   for final asset renders and hand-write the prompt so wording (and therefore style) stays identical across a
   set. Expansion is sampled (temp 1.0), so it adds run-to-run variation. Costs an extra ~7 GB model load. [HF-PE][Comfy]
8. **Grids/layout by rows and columns** ("2 rows and 3 columns", not "2x3"); for dense layouts name the regions
   first, then fill each. [GH skill]
9. **Consistent style across a set:** (a) lock one shared style paragraph (palette, light, lens/medium, texture,
   negative-space rule) and paste it verbatim at the end of every prompt; (b) keep the same resolution/aspect
   family; (c) fix seeds and vary only the content sentences; (d) expander off. Seeds are reproducible in ComfyUI
   (MiniMax API ignores user seeds; local servers honour them). Seed-locking for *style* is an inference, unverified. [GH; partly unverified]
10. **Strongest consistency lever: reference-image editing.** Feed an approved image as `<Picture 1>` and write
    "Use <Picture 1> as a weak style reference for palette, lighting and material; the subject is new: ...". The
    prompt guide defines roles: fully preserved / partially preserved / attribute transfer / weak reference. [GH edit guide]
11. **How editing works in ComfyUI:** `MiniMaxH3ImageConditioning` takes `images.image_1..N` (up to 16 refs;
    `image_1` is the picture being edited), plus clip + VAE (VAE anchors refs as reference latents; without it they
    only condition the text encoder). There is **no denoise/strength knob** - KSampler stays at denoise 1.0 and the
    prompt controls how much changes. Template scales the ref to 4 MP and rounds to a multiple of 32, and output size
    = ref size. Expansion is "always on" for edits in the API/template. [Comfy node tooltips; edit template]
12. **Edit prompt style:** one paragraph, narrate the final state (not commands): define sources ("The stone
    bowl at the left of <Picture 1> is <Subject 1>."), then "The target image ..." with a relationship per subject,
    then the changed details. Say what changes AND what stays ("...keeping its shape, material, position and size"). [GH edit guide]
13. **Known weaknesses / workarounds:** poor at low resolution (stay >= 4 MP); dense text, charts and diagrams vary
    run to run -> render 2-4 seeds and pick; no masked inpainting, no transparent backgrounds (render on a plain
    flat background and cut out separately); prompt truncated at 4096 tokens. [GH README "Not yet supported"; GH skill]
14. **Licence:** MiniMax-H3-Image Community License; commercial use needs separate written authorisation (MiniMax
    application form). A personal portfolio is probably non-commercial, but **unverified** - check the licence. [HF][GH]
15. **Hardware note (this server):** RTX 4070 12 GB, 32 GB RAM, `--lowvram`; the 21 GB int8 DiT + 25 GB text
    encoder are offloaded. Expect first-load latency; keep jobs batched with the same models loaded.

## Field notes (this project)
- **Edit workflow validated (2026-11-24).** Recolouring one object (`about-desk-01` mug, blue → forest green) worked with the expander off and a one-paragraph "only X changes; everything else stays" prompt. Of 3 seeds, only 1 kept the original warm lighting — the other two shifted the whole scene cooler/flatter. Always render 3 seeds for edits and compare against the source, not just the edited object.
