# BASE IMAGE with an alias #
FROM node:14.2.0-alpine3.11 as build
WORKDIR /app

# Install Angular CLI to run Build #
RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

# BASE IMAGE with an alias #
FROM nginx as runtime

# Copy contents from the other container with alias "build" #
# onto the specified path in the current container#
COPY --from=build /app/dist/blk-design-system-angular /usr/share/nginx/html

# docker build .
# docker run -p 8080:80 container_id