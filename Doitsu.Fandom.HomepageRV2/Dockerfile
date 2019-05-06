FROM node:10.13-alpine

WORKDIR /usr/src/app
COPY Doitsu.Fandom.HomepageRV2/package.json .
COPY Doitsu.Fandom.HomepageRV2/package-lock.json .
RUN npm install
COPY Doitsu.Fandom.HomepageRV2/ .
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
