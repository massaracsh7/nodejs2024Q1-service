# Stage 1: Build the application
FROM node:20.11.1-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

RUN npm run build

FROM node:20.11.1-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm cache clean --force

RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/index.js"]
