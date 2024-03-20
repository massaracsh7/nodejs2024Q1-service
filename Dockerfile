# Use the official Node.js image as the base image for building
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use a lightweight Node.js image as the base image for the final application
FROM node:20-alpine
WORKDIR /app

# Copy only the necessary files and directories from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json
COPY --from=builder /app/src ./src
COPY --from=builder /app/doc ./doc

# Generate Prisma client
RUN npx prisma generate

# Expose the port specified by the PORT environment variable
EXPOSE $PORT

# Command to start the application in production mode
CMD ["npm", "run", "start:prod"]
