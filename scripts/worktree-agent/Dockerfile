FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar scripts
COPY watcher.js .
COPY cron.js .

# Script de inicio que arranca tanto el watcher como el cron
RUN echo '#!/bin/sh' > start.sh && \
    echo 'node watcher.js &' >> start.sh && \
    echo 'node cron.js' >> start.sh && \
    chmod +x start.sh

CMD ["./start.sh"]
