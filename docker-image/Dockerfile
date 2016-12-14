FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ../node-server/package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY ../node-server/* /usr/src/app

EXPOSE 8090

CMD [ "npm", "start" ]