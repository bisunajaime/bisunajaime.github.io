"""Reference-image edit with MiniMax H3 Image: upload a source image, queue one job per seed, download results.

Usage: python3 edit.py source.png out-prefix "prompt" seed [seed ...]
Appends each result to manifest.json.
"""
import json, sys, time, uuid, copy, pathlib, urllib.request, urllib.parse
from gen import SERVER, HERE, call

EDIT = json.loads((HERE / "workflow-edit-api.json").read_text())


def upload(path):
    boundary = uuid.uuid4().hex
    data = pathlib.Path(path).read_bytes()
    body = (f"--{boundary}\r\nContent-Disposition: form-data; name=\"image\"; filename=\"{pathlib.Path(path).name}\"\r\n"
            f"Content-Type: image/png\r\n\r\n").encode() + data + \
           f"\r\n--{boundary}\r\nContent-Disposition: form-data; name=\"overwrite\"\r\n\r\ntrue\r\n--{boundary}--\r\n".encode()
    req = urllib.request.Request(SERVER + "/upload/image", data=body,
                                 headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())["name"]


def main():
    src, prefix, prompt, *seeds = sys.argv[1:]
    name = upload(HERE / src)
    client = str(uuid.uuid4()); pending = {}
    for s in seeds:
        w = copy.deepcopy(EDIT)
        w["20"]["inputs"]["image"] = name
        w["10"]["inputs"]["value"] = prompt
        w["11"]["inputs"]["value"] = False  # expander off: the prompt already describes the exact final state
        w["6"]["inputs"]["seed"] = int(s)
        w["8"]["inputs"]["filename_prefix"] = f"portfolio/{prefix}"
        res = json.loads(call("/prompt", {"prompt": w, "client_id": client}))
        pending[res["prompt_id"]] = (int(s), time.time())
        print("queued", prefix, s, res["prompt_id"], flush=True)

    manifest_path = HERE / "manifest.json"
    i = 0
    while pending:
        time.sleep(10)
        for pid, (seed, t0) in list(pending.items()):
            hist = json.loads(call(f"/history/{pid}"))
            if pid not in hist:
                continue
            entry = hist[pid]
            if entry.get("status", {}).get("status_str") == "error":
                print("ERROR", seed, json.dumps(entry["status"].get("messages"))[:800], flush=True)
                del pending[pid]; continue
            imgs = [x for o in entry["outputs"].values() for x in o.get("images", []) if x.get("type") == "output"]
            if not imgs:
                continue
            img = imgs[0]; i += 1
            q = urllib.parse.urlencode({"filename": img["filename"], "subfolder": img["subfolder"], "type": img["type"]})
            out = HERE / f"{prefix}-{seed}.png"
            out.write_bytes(call(f"/view?{q}"))
            manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else []
            manifest = [m for m in manifest if m["file"] != out.name]
            manifest.append({"file": out.name, "source": src, "mode": "reference-image edit", "prompt": prompt, "seed": seed,
                             "settings": {"steps": 6, "cfg": 1.0, "sampler": "euler", "scheduler": "simple", "denoise": 1.0,
                                          "prompt_expander": False, "reference_scaled_to_mp": 4.0},
                             "selected": False})
            manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
            print(f"done {out.name} in {time.time() - t0:.0f}s", flush=True)
            del pending[pid]


if __name__ == "__main__":
    main()
