FROM node:18-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma migrate dev && yarn build

CMD [ "node", "dist/main.js" ]
