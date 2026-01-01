#!/bin/bash

# Portfolio UI Deployment Script
# This script builds, pushes, and deploys the portfolio to k3s

set -e

DOCKER_USERNAME="lassemg"
IMAGE_NAME="portfolio-ui"
TAG="${1:-latest}"
FULL_IMAGE="${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}"

echo "🔨 Building Docker image..."
docker build -t ${FULL_IMAGE} .

echo "📤 Pushing to Docker Hub..."
docker push ${FULL_IMAGE}

echo "🚀 Deploying to Kubernetes..."
kubectl apply -f k8s/

echo "⏳ Waiting for rollout to complete..."
kubectl rollout status deployment/portfolio-ui -n default

echo "✅ Deployment complete!"
echo ""
echo "📋 Check status with:"
echo "  kubectl get pods -n default -l app=portfolio-ui"
echo "  kubectl get ingress -n default portfolio-ui"
echo ""
echo "🔍 View logs with:"
echo "  kubectl logs -n default -l app=portfolio-ui --tail=100 -f"
