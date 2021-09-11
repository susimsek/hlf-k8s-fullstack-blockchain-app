FROM node:12-alpine AS build-step

# install required dependencies by NPM packages:
# current dependencies are: python, make, g++
RUN apk add --no-cache --virtual npm-deps python3 make g++ curl bash && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    rm -r /root/.cache

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

FROM node:12-alpine

RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY . /usr/src/app

COPY --from=build-step /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 4000
CMD ["node","app.js"]