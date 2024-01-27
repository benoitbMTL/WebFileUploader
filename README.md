# WebFileUploader

WebFileUploader is a simple web application for uploading files to a server. It uses Node.js for the backend and Bootstrap for the frontend. This application allows users to upload files and view a directory listing of the uploaded files.

## Features

- File upload functionality.
- Server-side storage of uploaded files.
- Directory listing of uploaded files.

## Installation

### Prerequisites

- Docker
- Git

### Steps to Install and Run

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/benoitbMTL/WebFileUploader.git
   cd WebFileUploader
   ```

2. **Run the Update Script:**
Execute the update.sh script to set up the Docker container. This script performs several tasks:

- Stops and removes the existing Docker container if it's already running.
- Updates the Git repository.
- Builds a new Docker image from the current codebase.
- Runs the Docker image as a container.

   ```bash
    chmod 744 update.sh
    ./update.sh
   ```

3. **Access the Application:**
After running the script, the application will be accessible at http://localhost:9000.

## Usage
- Upload a File: Choose a file and click on 'Upload File'.
- View Uploaded Files: Uploaded files will be listed under 'File Directory Listing'.
- Delete Files: Use the 'Delete Files' button to remove all uploaded files.

## Docker Details
- Docker Image Name: webfileuploader
- Docker Container Name: webfileuploader_container
- Exposed Port: 9000