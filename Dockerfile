# 1: build app Vite
FROM node:20 AS builder

WORKDIR /app
COPY . .

# env  build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm install
RUN npm run build

#  2: serve  Nginx
FROM nginx:alpine

# Copy config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy output Vite đã build
COPY --from=builder /app/dist /usr/share/nginx/html
