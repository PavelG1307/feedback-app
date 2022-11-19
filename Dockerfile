FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

COPY ./dist ./dist

CMD [ "npm", "run", "start:prod" ]
