FROM node:alpine

RUN mkdir -p /usr/src/dolph-server

WORKDIR /usr/src/dolph-server

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY package.json ./
COPY yarn.lock ./

RUN npm install --legacy-peer-deps --include=dev && npm install --global @dolphjs/cli

COPY . /usr/src/dolph-server

RUN npm run build

EXPOSE 3300

# CMD [ "npm", "start" ]

CMD [ "dolph", "watch" ] # would update back to `start` when cli is fixed