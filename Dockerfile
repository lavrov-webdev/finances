FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./server/package.json ./
COPY ./server/yarn.lock ./

RUN yarn

COPY ./server .

RUN yarn prisma migrate deploy && yarn prisma generate && yarn build

CMD [ "node", "dist/main.js" ]
