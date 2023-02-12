FROM node:16.19.0-alpine3.16

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["node","index.js"]
