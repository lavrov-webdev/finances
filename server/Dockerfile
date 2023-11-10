FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma migrate deploy && yarn prisma generate && yarn build

CMD [ "node", "dist/main.js" ]
