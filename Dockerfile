FROM node:22-bullseye AS build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build



FROM node:22-bullseye-slim AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY --from=build /usr/src/app/package.json ./

RUN npm install --production --legacy-peer-deps \
&& npm cache clean --force

# Use non-root user for better security
RUN useradd -m tasklyuser && chown -R tasklyuser /usr/src/app
USER tasklyuser

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
    