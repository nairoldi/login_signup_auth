# Use the Node.js 21 base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for the main and Vite projects
COPY node/package*.json ./node/
COPY vite-project/package*.json ./vite-project/

# Install dependencies for both main and Vite projects
RUN cd /app/node && npm install
RUN cd /app/vite-project && npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ENV PORT=3001

# Expose the desired port
EXPOSE 3001

# Run the application using a script to run both dev commands
CMD ["sh", "-c", "cd /app/node && npm run dev & cd /app/vite-project && npm run dev"]
