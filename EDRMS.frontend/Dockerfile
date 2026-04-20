# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first (layer-cache friendly — only re-runs npm ci if package.json changes)
COPY package*.json ./
RUN npm ci --prefer-offline

# Copy source and build for production
COPY . .
RUN npm run build -- --configuration production

# ── Runtime stage (Nginx) ─────────────────────────────────────────────────────
FROM nginx:alpine AS runtime

# Remove the default Nginx site
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output
# outputPath in angular.json is dist/sakai-ng
COPY --from=build /app/dist/sakai-ng/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
