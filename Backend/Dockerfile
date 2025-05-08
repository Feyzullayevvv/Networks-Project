# Use a lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install only production deps
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Tell Docker (and Fly) which port your app listens on
ENV PORT 3001
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
