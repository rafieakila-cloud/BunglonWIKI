#!/bin/bash
/root/bacapi/venv-qr/bin/python - <<'PY'
import qrcode

from PIL import Image, ImageDraw, ImageFont

URL = 'https://afif72an.github.io/BunglonWIKI/'
qr = qrcode.QRCode(box_size=20, border=4, error_correction=qrcode.constants.ERROR_CORRECT_H)
qr.add_data(URL)
qr.make(fit=True)
img = qr.make_image(fill_color='#0645ad', back_color='#ffffff').convert('RGB')
# center badge B
size = img.size[0]
dw = ImageDraw.Draw(img)
bbox = dhead = None
# simple centered "B" in white with dark halo
try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', int(size * 0.32))
except Exception:
    font = ImageFont.load_default()
tbbox = dw.textbbox((0, 0), 'B', font=font)
tw, th = tbbox[2] - tbbox[0], tbbox[3] - tbbox[1]
badge_w, badge_h = int(size * 0.32), int(size * 0.32)
cx, cy = size // 2, size // 2
# white rounded box
try:
    dw.rounded_rectangle([cx - badge_w // 2, cy - badge_h // 2, cx + badge_w // 2, cy + badge_h // 2], radius=badge_w // 4, fill='#0645ad', outline='#ffffff', width=max(8, size // 80))
except Exception:
    dw.ellipse([cx - badge_w // 2, cy - badge_h // 2, cx + badge_w // 2, cy + badge_h // 2], fill='#0645ad', outline='#ffffff', width=max(8, size // 80))
dw.text((cx - tw // 2 - tbbox[0], cy - th // 2 - tbbox[1]), 'B', fill='#ffffff', font=font)
img.save('/mnt/c/BacapiWiki/qr.png')
print('saved', img.size)
PY
