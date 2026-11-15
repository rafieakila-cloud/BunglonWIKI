#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

for size, fname in [(512, 'icon-512.png'), (192, 'icon-192.png')]:
    img = Image.new('RGBA', (size, size), (13, 17, 23, 255))
    d = ImageDraw.Draw(img)
    m = int(size * 0.16)
    try:
        d.rounded_rectangle([m, m, size - m, size - m], radius=int(size * 0.20),
                             fill=(24, 28, 36, 255),
                             outline=(240, 192, 64, 255), width=max(3, size // 100))
    except Exception:
        d.ellipse([m, m, size - m, size - m], fill=(24, 28, 36, 255),
                  outline=(240, 192, 64, 255), width=max(3, size // 100))
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', int(size * 0.58))
    bbox = d.textbbox((0, 0), 'B', font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1] - 2), 'B',
           fill=(240, 192, 64, 255), font=font)
    img.save(f'/mnt/c/BacapiWiki/{fname}', 'PNG')
    print('Saved', fname)
