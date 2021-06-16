FROM node:carbon-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Install dependencies
COPY ["./package.json", "./package-lock.json", "/usr/src/app/"]

RUN npm install

## Add source code
COPY ["./src", "./tsconfig.json", "/usr/src/app/"]

## Production
ENV NODE_ENV production

## Build
RUN npm run build:clean

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
