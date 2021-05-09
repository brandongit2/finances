FROM node:16.1.0
WORKDIR /usr/finances
COPY ./package.json ./
RUN yarn
EXPOSE 3000
CMD ["yarn", "dev"]
