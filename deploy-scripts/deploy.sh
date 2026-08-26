#!/bin/bash

# Deploy Frontend
cd /var/www/aocr/frontend
npm install
npm run build

# Deploy Backend
cd /var/www/aocr/backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup PM2 for Frontend (if using Node.js server)
pm2 start npm --name "aocr-frontend" -- start

# Setup PM2 for Backend
pm2 start "python main.py" --name "aocr-backend" --interpreter ./venv/bin/python

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
sudo pm2 startup

