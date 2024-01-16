FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p /app/upload

COPY . .

EXPOSE 9000

CMD ["node", "server.js"]
