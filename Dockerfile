# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Set container port
EXPOSE 3000

# Define start command
CMD ["npm", "start"]
