FROM node:24.12.0 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock .yarnrc.yml /app/
RUN corepack enable
RUN yarn

# Get all remaining files
COPY . /app

# Generate static files
RUN yarn run generate

FROM nginx:stable-alpine

# Copy dist files (generated) from builder layer into this (lightweight) nginx image
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Copy required nginx config for router to work
COPY build/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80

LABEL \
  org.opencontainers.image.vendor="IntellectualSites" \
  org.opencontainers.image.title="schematic-web" \
  org.opencontainers.image.description="Frontend for arkitektonika" \
  org.opencontainers.image.url="https://schematic.cloud/" \
  org.opencontainers.image.url="https://github.com/IntellectualSites" \
  org.opencontainers.image.source="https://github.com/IntellectualSites/schematic.cloud" \
  com.docker.image.source.entrypoint=Dockerfile
