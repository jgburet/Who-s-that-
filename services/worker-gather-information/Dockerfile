FROM node:10.14.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . /app

CMD ["yarn", "start"]
