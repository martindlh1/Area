FROM node:16.18.0

WORKDIR /usr/src/app/

COPY *.json /usr/src/app/

RUN npm ci

COPY . /usr/src/app/

EXPOSE 8080

CMD [ "npm", "start" ]