"""Crop a studio capture to its frame and write the PNG master (raw/) and the WebP the site serves.

python3 crop.py <capture.png> <frame height in CSS px> <slug> <name> [frame width, default 1200]
"""
import os, subprocess, sys
from PIL import Image

src, h, slug, name = sys.argv[1], float(sys.argv[2]), sys.argv[3], sys.argv[4]
w = float(sys.argv[5]) if len(sys.argv) > 5 else 1200
here = os.path.dirname(os.path.abspath(__file__))
raw = os.path.join(here, 'raw', slug)
pub = os.path.join(here, '..', 'client', 'public', 'shots', slug)
os.makedirs(raw, exist_ok=True)
os.makedirs(pub, exist_ok=True)
im = Image.open(src)
scale = 2
box = (0, 0, min(im.width, round(w * scale)), min(im.height, round(h * scale)))
png = os.path.join(raw, f'{name}.png')
im.crop(box).save(png)
webp = os.path.join(pub, f'{name}.webp')
subprocess.run(['cwebp', '-quiet', '-q', '84', '-m', '6', png, '-o', webp], check=True)
print(f'{slug}/{name}.webp', box[2], 'x', box[3], os.path.getsize(webp) // 1024, 'KB')
