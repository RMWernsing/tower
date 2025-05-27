# 1. Build the frontend
FROM node:22-slim AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client ./
RUN npm run build

# 2. Build the backend
FROM node:22-slim AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production
COPY server ./

# Copy built frontend into backend (e.g., to serve static files)
COPY --from=client-builder /app/client/dist /app/server/public

# 3. Runtime image
FROM node:22-slim
WORKDIR /app
COPY --from=server-builder /app/server ./

# Start the Node.js backend
CMD ["npm", "start"]
