FROM node:12 AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY config-local/configs/dev ./

RUN npm install -g nodemon
RUN npm install glob rimraf
RUN npm install --only=development

COPY . .
ARG CONFIG_FILE=config.json

RUN npm run build
