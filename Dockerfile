# Use a Node.js base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy production dependencies from builder
COPY --from=builder /app/package*.json ./
RUN npm install --production

# Copy built Next.js app from the builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
RUN if [ -f /app/next.config.js ]; then \
    COPY --from=builder /app/next.config.js ./; \
fi

# Expose port 3000 (default Next.js port)
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]