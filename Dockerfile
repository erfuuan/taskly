# Build stage
FROM node:22-bullseye AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:22-bullseye AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["node", "dist/main.js"]
