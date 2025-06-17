FROM node:24-alpine AS builder

WORKDIR /app

ARG VITE_API_URL

ENV VITE_API_URL=${VITE_API_URL}

COPY . .

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]