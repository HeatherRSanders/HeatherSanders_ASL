FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @jworkman-fs/wdv-cli

RUN npm install -g jest

COPY . .

EXPOSE 8080

CMD ["npm", "start"]