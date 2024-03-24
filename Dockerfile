FROM node:20 as builder
FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install && npm cache clean --force

RUN npx prisma generate

COPY . .

EXPOSE ${PORT}

RUN npm run build

CMD sh -c "npx prisma migrate deploy && npm run start:dev"
