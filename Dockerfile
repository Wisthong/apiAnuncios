FROM node:latest as node

WORKDIR /app
COPY . .

RUN npm install --force
EXPOSE 3011

CMD [ "npm","start" ]


