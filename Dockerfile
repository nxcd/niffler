FROM node:carbon-alpine

ENV NODE_ENV production

RUN npm i -g pnpm --unsafe-perm

COPY ["./package.json", "./shrinkwrap.yaml", "/usr/src/app/"]

RUN pnpm install --only prod

## Add source code
COPY ["./src", "./tsconfig.json", "/usr/src/app/"]

## Build
RUN pnpm run build:clean

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
