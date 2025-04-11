#!/bin/bash

# Origin IDP Deployment Script
# This script automates the deployment of the Origin AI-powered Internal Developer Platform

# Exit on error
set -e

echo "Starting Origin IDP deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Build the application
echo "Building the application..."
npm run build

# Build Docker image
echo "Building Docker image..."
docker build -t origin-idp:latest .

# Check if we're running in production mode
if [ "$1" == "production" ]; then
    echo "Deploying to production environment..."
    
    # Stop any existing containers
    docker-compose -f docker-compose.prod.yml down || true
    
    # Start the containers in production mode
    docker-compose -f docker-compose.prod.yml up -d
    
    echo "Running database migrations..."
    docker-compose -f docker-compose.prod.yml exec app npm run db:migrate
    
    echo "Production deployment completed successfully!"
else
    echo "Deploying to development environment..."
    
    # Stop any existing containers
    docker-compose down || true
    
    # Start the containers in development mode
    docker-compose up -d
    
    echo "Running database migrations..."
    docker-compose exec app npm run db:migrate
    
    echo "Development deployment completed successfully!"
fi

echo "Origin IDP is now running!"
echo "Access the application at: http://localhost:3000"
