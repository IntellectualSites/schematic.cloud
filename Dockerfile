FROM node:16.19.0@sha256:64e8bcdfdad6718050801a2639f7e6645fdaf85ec37a98cdb61f6a5331217618 AS builder

# Set working directory
WORKDIR /app

# Install dependencies without lock file
COPY package.json /app/package.json
RUN yarn install --silent

# Get all remaining files
COPY . /app

# Generate static files
RUN yarn run generate

FROM nginx:stable-alpine@sha256:2366ede62d2e26a20f7ce7d0294694fe52b166107fd346894e4658dfb5273f9c

# Copy dist files (generated) from builder layer into this (lightweight) nginx image
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80

LABEL \
  org.opencontainers.image.vendor="IntellectualSites" \
  org.opencontainers.image.title="schematic.cloud" \
  org.opencontainers.image.description="Frontend for arkitektonika" \
  org.opencontainers.image.url="https://github.com/IntellectualSites" \
  org.opencontainers.image.source="https://github.com/IntellectualSites/schematic.cloud"
