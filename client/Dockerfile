FROM node:18-alpine

EXPOSE 5173

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY server.cjs ./

RUN npm install -g pnpm && pnpm i

COPY . .

RUN pnpm build

CMD [ "node", "server.cjs" ]
