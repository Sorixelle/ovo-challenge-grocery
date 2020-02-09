# Build stage
FROM node:12 as build
WORKDIR /frontend

COPY . .
ARG API_URL
RUN echo "API_URL=$API_URL" > .env
RUN yarn
RUN yarn build

# Package stage
FROM nginx:alpine

COPY --from=build /frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
