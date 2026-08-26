#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python 3.11 and related tools
sudo apt install -y python3.11 python3.11-venv python3-pip

# Install nginx
sudo apt install -y nginx

# Install certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Install PM2 globally
sudo npm install -y pm2 -g

# Create application directory
sudo mkdir -p /var/www/aocr
sudo chown -R ubuntu:ubuntu /var/www/aocr

# Install system dependencies
sudo apt install -y build-essential python3.11-dev

