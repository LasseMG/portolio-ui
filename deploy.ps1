# Portfolio UI Deployment Script (PowerShell)
# This script builds, pushes, and deploys the portfolio to k3s

param(
    [string]$Tag = "latest"
)

$ErrorActionPreference = "Stop"

$DOCKER_USERNAME = "lassemg"
$IMAGE_NAME = "portfolio-ui"
$FULL_IMAGE = "${DOCKER_USERNAME}/${IMAGE_NAME}:${Tag}"

Write-Host "🔨 Building Docker image..." -ForegroundColor Cyan
docker build -t $FULL_IMAGE .

Write-Host "📤 Pushing to Docker Hub..." -ForegroundColor Cyan
docker push $FULL_IMAGE

Write-Host "🚀 Deploying to Kubernetes..." -ForegroundColor Cyan
kubectl apply -f k8s/

Write-Host "⏳ Waiting for rollout to complete..." -ForegroundColor Cyan
kubectl rollout status deployment/portfolio-ui -n default

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Check status with:" -ForegroundColor Yellow
Write-Host "  kubectl get pods -n default -l app=portfolio-ui"
Write-Host "  kubectl get ingress -n default portfolio-ui"
Write-Host ""
Write-Host "🔍 View logs with:" -ForegroundColor Yellow
Write-Host "  kubectl logs -n default -l app=portfolio-ui --tail=100 -f"
