FROM node:16.18.0

WORKDIR /usr/src/app/

COPY *.json /usr/src/app/

RUN npm ci
RUN npm install -g eas-cli
RUN npx expo login -u "Aryath" -p "123456abcdef"
ENV EAS_NO_VCS=1

COPY . /usr/src/app/

RUN mkdir -p mobile

RUN curl -L -o "mobile.apk" "$(eas build -p android --profile preview | grep '^https')"

CMD ["cp", "/usr/src/app/mobile.apk", "/usr/src/app/mobile/client.apk"]