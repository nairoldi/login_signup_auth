# motion-mastery

This is a login signup and auth starting point Nico Airoldi. The tech stack is MERN (Mongoose, Express, React, Node) and the project is dockerized.

# Node

    The app is using an express to run the server and connect to a mongoose database to store all data.

# Vite-React

    The front end is built with vite-react that provides fast and simple enviorment for web based applications. I am using tailwindcss to build and design the components. The compents are linked using react router dom.

# Tests

    I am using jest for testing. To run tests open terminal and make sure you are in the node folder and run "npm test".

# Docker

    Dockerization
    This section explains how to build and run the Docker container for the login_signup_auth project.

    Prerequisites
    Ensure you have Docker installed on your machine.

    Building the Docker Image
    Clone the Repository:

    sh
    Copy code
    git clone https://github.com/nairoldi/login_signup_auth
    cd login_signup_auth
    Build the Docker Image:
    Run the following command to build the Docker image:

    docker build -t login_signup_auth .
    This command will use the Dockerfile to build an image named login_signup_auth. The Dockerfile sets up the environment, installs dependencies, and prepares the application to run.

    Running the Docker Container
    Run the Docker Container:
    After building the image, you can run the container with the following command:

    docker run -p 3001:3001 login_signup_auth
    This command starts a container from the login_signup_auth image, mapping port 3001 of the container to port 3001 on your local machine.

    Dockerfile Explanation
    The Dockerfile defines the steps to create a Docker image. Here’s a breakdown of what each part of the Dockerfile does:

    Base Image:

    Dockerfile
    Copy code
    FROM node:21
    This line specifies the base image to use, which is Node.js version 21.

    Set Working Directory:
    WORKDIR /app
    Sets the working directory inside the container to /app.

    Copy Dependencies Files:
    COPY node/package*.json ./node/
    COPY vite-project/package*.json ./vite-project/
    Copies the package.json and package-lock.json files for both the main and Vite projects.

    Install Dependencies:
    RUN cd node && npm install
    RUN cd ../vite-project && npm install
    Installs the necessary dependencies for both projects.

    Copy Application Code:
    COPY . .
    Copies the rest of the application code into the container.

    Set Environment Variables:
    ENV PORT=3001
    Sets the PORT environment variable to 3001.

    Expose Port:
    EXPOSE 3001
    Exposes port 3001 for the container.

    Start the Application:
    CMD ["sh", "-c", "cd /app/node && npm run dev & cd /app/vite-project && npm run dev"]
    This command starts both the main Node.js application and the Vite development server. The & operator allows both commands to run simultaneously.

# Start the Vite project in the background

cd /app/vite-project && npm run dev &

# Start the Node.js server

cd /app/node && npm run dev

# Things to add and do

    I want to make sure the test work. I also want to get tests set up to run on git push and only allow them to be merged if all the test cases pass.
