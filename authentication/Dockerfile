FROM node:20-alpine
RUN apk update && apk upgrade
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY src/ ./src/
RUN npm run build && npm prune --production
CMD ["node", "dist/server.js"]