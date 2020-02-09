FROM phusion/baseimage:latest
WORKDIR /backend

COPY . .

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists/*

RUN yarn

ENV SERVER_PORT 80

EXPOSE 80/tcp

CMD ["yarn", "prod"]
