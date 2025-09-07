FROM node:20-alpine
RUN apk update && apk upgrade
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY src/ ./src/
RUN npm run build && npm prune --production
EXPOSE 5000
CMD ["node", "dist/server.js"]