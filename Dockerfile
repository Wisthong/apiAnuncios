FROM node:18-alpine as runner

WORKDIR /app
COPY . .

RUN npm install 
EXPOSE 3000

CMD [ "npm","start" ]


