# Docker Complete Tutorial: From Basics to Advanced

## Table of Contents

1. [What is Docker?](#what-is-docker)
2. [Key Concepts](#key-concepts)
3. [Installation](#installation)
4. [Basic Commands](#basic-commands)
5. [Docker Images](#docker-images)
6. [Docker Containers](#docker-containers)
7. [Dockerfile](#dockerfile)
8. [Docker Compose](#docker-compose)
9. [Networking](#networking)
10. [Volumes and Data Management](#volumes-and-data-management)
11. [Best Practices](#best-practices)
12. [Practical Examples](#practical-examples)

## What is Docker?

Docker is a **containerization platform** that allows you to package applications and their dependencies into lightweight, portable containers. Think of it as a way to create a "box" that contains everything your application needs to run, regardless of where it's deployed.

### Why Docker?

**Before Docker:**

- "It works on my machine" syndrome
- Complex deployment processes
- Environment inconsistencies
- Resource overhead from virtual machines

**With Docker:**

- Consistent environments across development, testing, and production
- Lightweight and fast compared to VMs
- Easy scaling and deployment
- Microservices architecture enablement

## Key Concepts

### 1. Container

A **container** is a running instance of an image. It's an isolated process that runs on the host OS kernel.

```
Container = Running Image + Writable Layer
```

### 2. Image

An **image** is a read-only template used to create containers. It contains:

- Application code
- Runtime environment
- Libraries and dependencies
- Configuration files

### 3. Dockerfile

A **Dockerfile** is a text file with instructions to build a Docker image.

### 4. Docker Registry

A **registry** is a storage and distribution system for Docker images (e.g., Docker Hub).

### 5. Docker Engine

The **Docker Engine** is the runtime that creates and manages containers.

## Installation

### macOS (your current system)

```bash
# Using Homebrew
brew install --cask docker

# Or download Docker Desktop from docker.com
```

### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt-get update

# Install required packages
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add user to docker group (optional, to run without sudo)
sudo usermod -aG docker $USER
```

### Windows

```powershell
# Download and install Docker Desktop from docker.com
# Requires Windows 10/11 with WSL2
```

### Verify Installation

```bash
docker --version
docker run hello-world
```

## Basic Commands

### Image Management

```bash
# List images
docker images
docker image ls

# Pull an image from registry
docker pull nginx
docker pull node:18-alpine

# Remove an image
docker rmi image_name
docker image rm image_name

# Build an image from Dockerfile
docker build -t my-app .
docker build -t my-app:v1.0 .

# Push image to registry
docker push username/my-app:tag
```

### Container Management

```bash
# Run a container
docker run nginx
docker run -d nginx                    # Run in background (detached)
docker run -p 8080:80 nginx           # Port mapping
docker run --name my-nginx nginx      # Give container a name
docker run -it ubuntu bash            # Interactive mode

# List containers
docker ps           # Running containers
docker ps -a        # All containers (including stopped)

# Stop a container
docker stop container_name_or_id
docker kill container_name_or_id      # Force stop

# Start/restart a container
docker start container_name_or_id
docker restart container_name_or_id

# Remove a container
docker rm container_name_or_id
docker rm -f container_name_or_id     # Force remove (even if running)

# Execute commands in running container
docker exec -it container_name bash
docker exec container_name ls /app

# View container logs
docker logs container_name
docker logs -f container_name         # Follow logs
```

### System Management

```bash
# Show Docker system information
docker info
docker system df                      # Disk usage

# Clean up unused resources
docker system prune                   # Remove stopped containers, unused networks, images
docker system prune -a               # Remove all unused images
docker container prune               # Remove stopped containers
docker image prune                   # Remove dangling images
docker volume prune                  # Remove unused volumes
```

## Docker Images

### Image Layers

Images are built in layers. Each instruction in a Dockerfile creates a new layer:

```
Layer 4: COPY app.js /app/           ← Your app
Layer 3: RUN npm install            ← Dependencies
Layer 2: COPY package.json /app/     ← Package definition
Layer 1: FROM node:18-alpine         ← Base image
```

### Image Naming and Tagging

```bash
# Format: [registry]/[username]/[repository]:[tag]
docker.io/library/nginx:latest
ghcr.io/username/my-app:v1.0
localhost:5000/my-app:dev

# Tag an image
docker tag my-app:latest my-app:v1.0
docker tag my-app username/my-app:latest
```

### Inspect Images

```bash
# View image details
docker inspect nginx

# View image history (layers)
docker history nginx

# Search for images on Docker Hub
docker search nodejs
```

## Docker Containers

### Container Lifecycle

```
Created → Running → Stopped → Removed
    ↑         ↓
   Start    Stop/Kill
```

### Running Containers

```bash
# Basic run
docker run hello-world

# Run with options
docker run \
  --name my-web-server \
  --detach \
  --publish 8080:80 \
  --volume /host/path:/container/path \
  --env NODE_ENV=production \
  nginx

# Interactive containers
docker run -it ubuntu:20.04 /bin/bash
docker run -it python:3.9 python
docker run -it node:18 node
```

### Container Networking

```bash
# Expose ports
docker run -p 3000:3000 my-app       # Host:Container
docker run -P my-app                 # Publish all exposed ports

# List port mappings
docker port container_name
```

### Environment Variables

```bash
# Set environment variables
docker run -e NODE_ENV=production my-app
docker run -e API_KEY=secret -e DEBUG=true my-app

# From file
docker run --env-file .env my-app
```

## Dockerfile

A Dockerfile is a script that contains instructions to build a Docker image.

### Basic Dockerfile Structure

```dockerfile
# Comments start with #
FROM base_image:tag
WORKDIR /app
COPY source dest
RUN command
EXPOSE port
CMD ["executable", "param1", "param2"]
```

### Common Instructions

#### FROM

Specifies the base image:

```dockerfile
FROM node:18-alpine
FROM ubuntu:20.04
FROM python:3.9-slim
```

#### WORKDIR

Sets the working directory:

```dockerfile
WORKDIR /app
WORKDIR /usr/src/app
```

#### COPY vs ADD

```dockerfile
# COPY (preferred for local files)
COPY package.json /app/
COPY . /app/

# ADD (can handle URLs and tar files)
ADD https://example.com/file.tar.gz /app/
ADD archive.tar.gz /app/
```

#### RUN

Executes commands during build:

```dockerfile
RUN apt-get update && apt-get install -y curl
RUN npm install
RUN pip install -r requirements.txt

# Multi-line RUN
RUN apt-get update \
    && apt-get install -y \
        curl \
        vim \
        git \
    && rm -rf /var/lib/apt/lists/*
```

#### EXPOSE

Documents which ports the container listens on:

```dockerfile
EXPOSE 3000
EXPOSE 80 443
```

#### ENV

Sets environment variables:

```dockerfile
ENV NODE_ENV=production
ENV API_URL=https://api.example.com
ENV PORT=3000
```

#### CMD vs ENTRYPOINT

```dockerfile
# CMD - can be overridden
CMD ["node", "app.js"]
CMD ["python", "app.py"]

# ENTRYPOINT - cannot be overridden (use with CMD for defaults)
ENTRYPOINT ["node"]
CMD ["app.js"]
```

### Example Dockerfiles

#### Node.js Application

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]
```

#### Python Flask Application

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for better caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

EXPOSE 5000

CMD ["python", "app.py"]
```

### Multi-stage Builds

Reduce image size by using multiple stages:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Build Context and .dockerignore

Create a `.dockerignore` file to exclude files from build context:

```dockerfile
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
coverage
nyc_output
*.md
```

## Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file.

### Installation

Docker Compose comes with Docker Desktop. For Linux:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Basic docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'

volumes:
  postgres_data:
```

### Docker Compose Commands

```bash
# Start services
docker-compose up
docker-compose up -d                 # Detached mode
docker-compose up --build           # Rebuild images

# Stop services
docker-compose down
docker-compose down -v              # Remove volumes
docker-compose down --rmi all       # Remove images

# View logs
docker-compose logs
docker-compose logs app             # Specific service
docker-compose logs -f              # Follow logs

# Scale services
docker-compose up --scale app=3

# Execute commands
docker-compose exec app bash
docker-compose run app npm test
```

### Advanced Docker Compose Features

#### Networks

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    networks:
      - frontend-network

  backend:
    build: ./backend
    networks:
      - frontend-network
      - backend-network

  database:
    image: postgres:13
    networks:
      - backend-network

networks:
  frontend-network:
  backend-network:
```

#### Health Checks

```yaml
services:
  app:
    build: .
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

#### Secrets

```yaml
version: '3.8'

services:
  app:
    image: my-app
    secrets:
      - db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

## Networking

### Network Types

1. **Bridge** (default): Isolated network for containers
2. **Host**: Use host's network directly
3. **None**: No networking
4. **Overlay**: Multi-host networking (Docker Swarm)

### Network Commands

```bash
# List networks
docker network ls

# Create network
docker network create my-network
docker network create --driver bridge my-bridge

# Connect container to network
docker network connect my-network container_name

# Disconnect container from network
docker network disconnect my-network container_name

# Inspect network
docker network inspect my-network

# Remove network
docker network rm my-network
```

### Container Communication

```bash
# Containers on same network can communicate by name
docker network create my-app-network

docker run -d --name database --network my-app-network postgres:13

docker run -d --name backend --network my-app-network my-backend-image
# Backend can connect to database using hostname "database"

docker run -d --name frontend --network my-app-network -p 3000:3000 my-frontend-image
```

## Volumes and Data Management

### Volume Types

1. **Named Volumes**: Managed by Docker
2. **Bind Mounts**: Map host directory to container
3. **tmpfs Mounts**: Store in host memory

### Volume Commands

```bash
# List volumes
docker volume ls

# Create volume
docker volume create my-volume

# Inspect volume
docker volume inspect my-volume

# Remove volume
docker volume rm my-volume

# Cleanup unused volumes
docker volume prune
```

### Using Volumes

```bash
# Named volume
docker run -v my-volume:/app/data my-app

# Bind mount (absolute path required)
docker run -v /host/path:/container/path my-app
docker run -v $(pwd):/app my-app

# Read-only mount
docker run -v /host/path:/container/path:ro my-app

# tmpfs mount
docker run --tmpfs /tmp my-app
```

### Volume Examples

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    volumes:
      # Named volume
      - app-data:/app/data
      # Bind mount for development
      - ./src:/app/src
      # Anonymous volume
      - /app/node_modules

  database:
    image: postgres:13
    volumes:
      # Named volume for data persistence
      - postgres-data:/var/lib/postgresql/data

volumes:
  app-data:
  postgres-data:
```

## Best Practices

### Dockerfile Best Practices

1. **Use Official Base Images**

```dockerfile
FROM node:18-alpine  # Good
FROM ubuntu          # Avoid if official image exists
```

2. **Minimize Layers**

```dockerfile
# Bad
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim

# Good
RUN apt-get update \
    && apt-get install -y \
        curl \
        vim \
    && rm -rf /var/lib/apt/lists/*
```

3. **Order Instructions by Change Frequency**

```dockerfile
# Dependencies change less frequently
COPY package*.json ./
RUN npm install

# Source code changes more frequently
COPY . .
```

4. **Use Multi-stage Builds**

```dockerfile
FROM node:18 AS builder
# Build steps...

FROM node:18-alpine AS production
COPY --from=builder /app/dist ./dist
```

5. **Don't Run as Root**

```dockerfile
RUN adduser --disabled-password --gecos '' appuser
USER appuser
```

6. **Use .dockerignore**

```
node_modules
.git
.env
*.md
coverage/
```

### Security Best Practices

1. **Use Specific Image Tags**

```dockerfile
FROM node:18.12.1-alpine  # Good
FROM node:latest          # Avoid
```

2. **Scan Images for Vulnerabilities**

```bash
docker scan my-image:latest
```

3. **Keep Images Updated**

```bash
docker pull node:18-alpine
docker build --no-cache -t my-app .
```

4. **Limit Container Capabilities**

```bash
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE my-app
```

5. **Use Read-only Root Filesystem**

```bash
docker run --read-only my-app
```

### Performance Best Practices

1. **Use Alpine Images When Possible**

```dockerfile
FROM node:18-alpine    # ~50MB
FROM node:18          # ~900MB
```

2. **Optimize Layer Caching**

```dockerfile
# Copy package files first
COPY package*.json ./
RUN npm install

# Copy source code last
COPY . .
```

3. **Remove Package Managers**

```dockerfile
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean
```

4. **Use .dockerignore Effectively**

```
# Exclude large unnecessary files
node_modules/
.git/
*.log
coverage/
```

## Practical Examples

Let me create practical examples using your current project structure.

### Example 1: Dockerizing Your React Frontend

```dockerfile
# frontend.Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (optional)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Example 2: Dockerizing Your Node.js Backend

```dockerfile
# backend.Dockerfile
FROM node:18-alpine

WORKDIR /app

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY backend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy backend source
COPY backend/ .

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3001

CMD ["node", "src/server.js"]
```

### Example 3: Complete Docker Compose Setup

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: frontend.Dockerfile
    ports:
      - '3000:80'
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:3001

  backend:
    build:
      context: .
      dockerfile: backend.Dockerfile
    ports:
      - '3001:3001'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@database:5432/myapp
    depends_on:
      - database
    volumes:
      - ./backend/logs:/app/logs

  database:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - '5432:5432'

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    name: myapp-network
```

### Example 4: Development Docker Compose

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dev
      target: development
    ports:
      - '3000:3000'
    volumes:
      - ./src:/app/src
      - ./public:/app/public
      - /app/node_modules
    environment:
      - REACT_APP_API_URL=http://localhost:3001
      - CHOKIDAR_USEPOLLING=true

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - '3001:3001'
    volumes:
      - ./backend/src:/app/src
      - ./backend/routes:/app/routes
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@database:5432/myapp_dev
    command: npm run dev

  database:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: myapp_dev
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - '5432:5432'
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data

volumes:
  postgres_dev_data:
```

### Common Commands for Your Project

```bash
# Development
docker-compose -f docker-compose.dev.yml up --build

# Production
docker-compose up --build -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Execute commands
docker-compose exec backend npm run test
docker-compose exec database psql -U user -d myapp

# Rebuild specific service
docker-compose build frontend
docker-compose up -d frontend

# Scale services
docker-compose up --scale backend=3

# Clean up
docker-compose down -v
docker system prune -a
```

## Advanced Topics

### Docker Swarm (Orchestration)

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml myapp

# Scale services
docker service scale myapp_backend=3

# List services
docker service ls
```

### Container Monitoring

```yaml
version: '3.8'

services:
  app:
    image: my-app
    logging:
      driver: 'json-file'
      options:
        max-size: '10m'
        max-file: '3'

  prometheus:
    image: prom/prometheus
    ports:
      - '9090:9090'

  grafana:
    image: grafana/grafana
    ports:
      - '3000:3000'
```

### Image Optimization

```dockerfile
# Multi-stage with build cache
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]
```

This comprehensive guide covers Docker from basics to advanced concepts. You now have the knowledge to:

1. ✅ Understand what Docker is and why it's useful
2. ✅ Install and set up Docker on your system
3. ✅ Use essential Docker commands
4. ✅ Create and manage images and containers
5. ✅ Write effective Dockerfiles
6. ✅ Use Docker Compose for multi-container applications
7. ✅ Implement best practices for security and performance
8. ✅ Apply Docker to real-world projects

Start with simple examples and gradually work your way up to more complex scenarios. Practice with your current React/Node.js project to get hands-on experience!
