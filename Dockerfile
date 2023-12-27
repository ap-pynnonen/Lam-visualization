FROM node:18

ENV NODE_ENV=production

WORKDIR /app

COPY /lam-visualization-app ./
COPY /lam-visualization-app/package.json ./
COPY /lam-visualization-app/package-lock.json ./

RUN npm install --legacy-peer-deps

RUN npm run build

RUN rm ./package.json

RUN rm ./package-lock.json

COPY /lam-visualization-backend ./

RUN npm install --production

EXPOSE 80

CMD ["node", "server.js"]