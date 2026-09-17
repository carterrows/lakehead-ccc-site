FROM node:24.21.0-alpine3.24 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24.21.0-alpine3.24 AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3030
COPY --from=build /app/dist ./dist
COPY server.mjs ./server.mjs

EXPOSE 3030
USER node
CMD ["node", "server.mjs"]
