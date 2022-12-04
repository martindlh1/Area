FROM node:16.18.0

WORKDIR /usr/src/app/

COPY *.json /usr/src/app/

RUN npm ci

COPY . /usr/src/app/

RUN npm run build

RUN npm install -g serve

EXPOSE 8081