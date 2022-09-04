FROM node
WORKDIR /api/v1/restaurant
COPY package*.json ./
RUN  npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]