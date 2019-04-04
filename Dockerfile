FROM node:carbon-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i -g pnpm --unsafe-perm

## Install dependencies
COPY ["./package.json", "./pnpm-lock.yaml", "/usr/src/app/"]

RUN npx pnpm install

## Add source code
COPY ["./src", "./tsconfig.json", "/usr/src/app/"]

## Production
ENV NODE_ENV production

## Build
RUN npm run build:clean

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
