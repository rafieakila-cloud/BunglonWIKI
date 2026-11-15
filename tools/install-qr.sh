#!/bin/bash
python3 -m pip install --user --quiet qrcode pillow 2>&1 | tail -3
python3 -c "import qrcode; print('OK')" 2>&1
