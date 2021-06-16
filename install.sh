#!/bin/bash

# Update your system
sudo apt update -y

# Install packages over https
sudo apt install apt-transport-https ca-certificates curl software-properties-common -

# Add the GPG key for the official Docker repository to your system
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add the Docker repo to your APT sources
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

# Update the package database with the new Docker Packages
sudo apt-get update -y

# Install from the Docker repo instead of the default Ubuntu repo
apt-cache policy docker-ce

# Install Docker
sudo apt install docker-ce -y

# Install Docker-Compose
sudo apt-get install docker-compose -y

wget https://raw.githubusercontent.com/Peppermint-Lab/Peppermint/master/docker-compose.yml

docker-compose up -d

exit 0
