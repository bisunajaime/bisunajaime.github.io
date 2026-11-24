"""Worst-case WCAG contrast of each text box over an image blended onto the page bg at a given opacity."""
import sys, json
import numpy as np
from PIL import Image

BG = np.array([0xFA, 0xFA, 0xF9]) / 255
COLORS = {"text": "1C1917", "text-muted": "57534E", "text-subtle": "78716C", "accent": "2F5D3A"}

def lin(c):
    return np.where(c <= 0.03928, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

def lum(rgb):
    l = lin(rgb); return 0.2126 * l[..., 0] + 0.7152 * l[..., 1] + 0.0722 * l[..., 2]

def report(img_path, scale, boxes, alphas):
    img = np.asarray(Image.open(img_path).convert("RGB")).astype(float) / 255
    for a in alphas:
        blended = BG * (1 - a) + img * a
        L = lum(blended)
        rows = []
        for name, color, x, y, w, h in boxes:
            region = L[int(y * scale):int((y + h) * scale), int(x * scale):int((x + w) * scale)]
            worst = np.percentile(region, 2)  # darkest 2% of background under the text
            tc = lum(np.array([int(COLORS[color][i:i + 2], 16) / 255 for i in (0, 2, 4)]))
            rows.append(f"{name}({color})={(worst + 0.05) / (tc + 0.05):.2f}")
        print(f"opacity {a:.2f}: " + "  ".join(rows))

if __name__ == "__main__":
    cfg = json.loads(sys.argv[1])
    report(cfg["img"], cfg["scale"], cfg["boxes"], cfg["alphas"])
