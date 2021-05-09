FROM node:16.1.0
WORKDIR /usr/finances-web
COPY ./package.json ./
RUN yarn
EXPOSE 3000
CMD ["yarn", "docker:dev"]
