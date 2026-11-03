#stage 1: local
FROM node:20-alpine AS  builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY

RUN npm run build


# stage 2: server
    FROM nginx:alpine
    COPY --from=builder /app/dist /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g" , "daemon off;"]