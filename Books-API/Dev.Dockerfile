FROM node:18-alpine

WORKDIR /app/server
ENV NODE_ENV=local
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","start"]