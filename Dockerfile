FROM node:14.15.4-alpine3.12

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["node","index.js"]
