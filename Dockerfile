FROM node:alpine
RUN mkdir -p /code
WORKDIR /code
COPY package*.json ./
RUN npm ci && \
    apk add --no-cache \
        redis
RUN redis-server --daemonize yes
COPY . .
CMD ["node", "server.js"]