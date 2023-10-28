FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY server.cjs ./

RUN npm install -g pnpm && pnpm i

COPY . .

RUN pnpm build

CMD [ "node", "server.cjs" ]
