FROM node:0.10.38

RUN npm install -g grunt-cli bower

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm install --unsafe-perm

CMD ["npm", "start"]
