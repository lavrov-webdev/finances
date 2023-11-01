# надо доработать так как будут качаться latest имеджи альпины и ноды, а значит, что в какой-то момент могут возникнуть ошибки из-за разницы в версиях
FROM alpine
RUN apk update && apk add nodejs && apk add npm

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY server.cjs ./

RUN npm install -g pnpm && pnpm i

COPY . .

RUN pnpm build

CMD [ "node", "server.cjs" ]
