# Build stage
FROM node:lts-alpine3.18 as build-stage

WORKDIR /frontend

COPY /frontend/package*.json /frontend/

RUN npm install

COPY /frontend /frontend

RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=build-stage /frontend/build /usr/share/nginx/html

# Копируем конфигурацию
COPY /frontend/nginx.conf /etc/nginx/nginx.conf

# Требуется порт 80 для Nginx
EXPOSE 80