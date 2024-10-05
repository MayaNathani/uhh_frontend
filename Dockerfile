# Use an official Node runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use an official NGINX image to serve the frontend
FROM nginx:alpine

# Copy the build output to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom NGINX config that listens on $PORT
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that Cloud Run will use
EXPOSE 8080

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
