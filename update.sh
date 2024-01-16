#!/bin/bash

# Docker container and image names
DOCKER_IMAGE_NAME="webfileuploader"
DOCKER_CONTAINER_NAME="webfileuploader_container"

# 1. Check if the Docker container is running
if [ $(docker ps -q -f name=$DOCKER_CONTAINER_NAME) ]; then
    # 2. If yes, stop and remove the container
    echo "Stopping and removing existing Docker container..."
    docker stop $DOCKER_CONTAINER_NAME
    docker rm $DOCKER_CONTAINER_NAME
fi

# 3. Update the Git repository
echo "Updating Git repository..."
git reset --hard
git clean -fd
git pull

# 4. Build the Docker image
echo "Building Docker image..."
docker build -t $DOCKER_IMAGE_NAME .

# 5. Run the Docker image
echo "Running Docker image..."
docker run -d -p 9000:9000 --name $DOCKER_CONTAINER_NAME $DOCKER_IMAGE_NAME
