# Stage 1: Build the application
FROM node:20.11.1-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

RUN npm install @nestjs/cli
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
