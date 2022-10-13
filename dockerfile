FROM node:14.20

ARG API_URL

ENV API_URL ${API_URL}
ENV NODE_ENV=production

WORKDIR /publish
COPY ./ /publish

RUN npm install
RUN npm run build --if-present
EXPOSE 3000

CMD ["npm", "start"]
