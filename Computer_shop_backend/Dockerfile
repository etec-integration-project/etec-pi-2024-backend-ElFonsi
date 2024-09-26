
FROM node:latest


WORKDIR /app


COPY ./Computer_shop_backend/package*.json ./


RUN npm install

COPY . .


EXPOSE 8080

CMD ["npm", "run", "dev"]

