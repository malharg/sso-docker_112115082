# Use an official Node.js runtime as a parent image
FROM node:21

# Set the working directory in the container
RUN mkdir -p /srv/app/streaming-service
WORKDIR /srv/app/streaming-service

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json /srv/app/streaming-service
COPY package-lock.json /srv/app/streaming-service
# Install any needed packages
RUN npm install

# Bundle app source inside Docker image
COPY . /srv/app/streaming-service

# Make port 3000 available to the world outside this container
EXPOSE 1557

# Define environment variable
# ENV NAME World

# Run the app when the container launches
CMD ["npm", "run", "dev"]
