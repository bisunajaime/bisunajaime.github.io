"""Queue MiniMax H3 Image text-to-image jobs on the ComfyUI server and download results.

Usage: python3 gen.py jobs.json
jobs.json: [{"name": "hero-bg-desktop-01", "prompt": "...", "width": 4352, "height": 1856, "seed": 1101, "use": "..."}]
Appends finished jobs to manifest.json (prompt, seed, size, settings, usage).
"""
import json, sys, time, uuid, urllib.request, urllib.parse, pathlib, copy

SERVER = "http://192.168.50.241:8188"
HERE = pathlib.Path(__file__).parent
BASE = json.loads((HERE / "workflow-t2i-api.json").read_text())


def call(path, data=None):
    req = urllib.request.Request(SERVER + path, data=json.dumps(data).encode() if data else None,
                                 headers={"Content-Type": "application/json"} if data else {})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def build(job):
    w = copy.deepcopy(BASE)
    w["10"]["inputs"]["value"] = job["prompt"]
    w["11"]["inputs"]["value"] = False  # prompt expander off: hand-written prompts keep the set consistent
    w["4"]["inputs"]["width"], w["4"]["inputs"]["height"] = job["width"], job["height"]
    w["6"]["inputs"]["seed"] = job["seed"]
    w["8"]["inputs"]["filename_prefix"] = f"portfolio/{job['name']}"
    return w


def main():
    jobs = json.loads(pathlib.Path(sys.argv[1]).read_text())
    client = str(uuid.uuid4())
    pending = {}
    for job in jobs:
        res = json.loads(call("/prompt", {"prompt": build(job), "client_id": client}))
        pending[res["prompt_id"]] = (job, time.time())
        print("queued", job["name"], res["prompt_id"], flush=True)

    manifest_path = HERE / "manifest.json"
    manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else []
    while pending:
        time.sleep(10)
        for pid, (job, t0) in list(pending.items()):
            hist = json.loads(call(f"/history/{pid}"))
            if pid not in hist:
                continue
            entry = hist[pid]
            status = entry.get("status", {})
            if status.get("status_str") == "error":
                print("ERROR", job["name"], json.dumps(status.get("messages"))[:800], flush=True)
                del pending[pid]
                continue
            imgs = [i for o in entry["outputs"].values() for i in o.get("images", []) if i.get("type") == "output"]
            if not imgs:
                continue
            img = imgs[0]
            q = urllib.parse.urlencode({"filename": img["filename"], "subfolder": img["subfolder"], "type": img["type"]})
            out = HERE / f"{job['name']}.png"
            out.write_bytes(call(f"/view?{q}"))
            manifest = [m for m in manifest if m["file"] != out.name]
            manifest.append({
                "file": out.name, "prompt": job["prompt"], "seed": job["seed"],
                "size": [job["width"], job["height"]],
                "settings": {"model": "minimax_h3_image_pruned_int8_convrot", "text_encoder": "qwen3vl_32b_minimax_h3_int8_convrot",
                             "vae": "minimax_h3_image_vae_fp16", "steps": 6, "cfg": 1.0, "sampler": "euler",
                             "scheduler": "simple", "denoise": 1.0, "prompt_expander": False},
                "use": job.get("use", ""), "selected": False,
            })
            manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
            print(f"done {job['name']} in {time.time() - t0:.0f}s -> {out.name}", flush=True)
            del pending[pid]


if __name__ == "__main__":
    main()
