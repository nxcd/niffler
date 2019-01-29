FROM node:carbon-alpine

ENV DEBUG expresso:*,gg:*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Install dependencies
COPY ["./package.json", "./shrinkwrap.yaml", "/usr/src/app/"]

RUN npm i -g pnpm --unsafe-perm

RUN pnpm install --only prod

## Add source code
COPY ["./src", "./tsconfig.json", "/usr/src/app/"]

## Build
RUN pnpm run build:clean

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
