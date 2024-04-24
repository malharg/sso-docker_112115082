# Use an official Node.js runtime as a parent image
FROM node:21

# Set the working directory in the container
RUN mkdir -p /srv/app/messaging-service
WORKDIR /srv/app/messaging-service

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json /srv/app/messaging-service
COPY package-lock.json /srv/app/messaging-service
# Install any needed packages
RUN npm install

# Bundle app source inside Docker image
COPY . /srv/app/messaging-service

# Make port 3000 available to the world outside this container
EXPOSE 1337

# Define environment variable
# ENV NAME World

# Run the app when the container launches
CMD ["npm", "run", "dev"]
