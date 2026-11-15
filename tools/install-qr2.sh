#!/bin/bash
python3 -m venv /root/bacapi/venv-qr 2>&1 | tail -1 || apt-get install -y python3-venv 2>&1 | tail -2
/root/bacapi/venv-qr/bin/pip install --quiet qrcode pillow 2>&1 | tail -2
/root/bacapi/venv-qr/bin/python -c "import qrcode; print('OK')"
