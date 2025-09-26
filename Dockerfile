FROM node:18

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy source code
COPY . .

# Build the NestJS project
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
