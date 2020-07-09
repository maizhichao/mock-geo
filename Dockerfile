FROM node:12-slim

WORKDIR /home/node/mock-geo

EXPOSE 8080

COPY . /home/node/mock-geo

CMD ["yarn", "run", "dev"]
