FROM node:16

WORKDIR var/www/html

COPY package.json ./
RUN npm install

COPY . .

COPY .env.example .env

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
