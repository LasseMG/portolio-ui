# Deployment Guide - Portfolio UI to K3s

This guide will walk you through deploying your portfolio to a k3s cluster with a custom domain and automatic TLS certificates.

## Prerequisites

- ✅ k3s cluster running
- ✅ kubectl configured to access your cluster
- ✅ cert-manager installed in your cluster
- ✅ Docker installed locally
- ✅ Docker Hub account (username: lassemg)
- 🔜 Domain name purchased and configured

## Step 1: Purchase and Configure Your Domain

1. **Purchase a domain** from a registrar (Namecheap, GoDaddy, Cloudflare, etc.)

2. **Configure DNS A Record**:
   - Log into your domain registrar's DNS management
   - Create an A record pointing to your k3s cluster's public IP

   Example:
   ```
   Type: A
   Name: portfolio (or @ for root domain)
   Value: YOUR_K3S_PUBLIC_IP
   TTL: 300 (or Auto)
   ```

3. **Update the Ingress manifest**:
   Edit `k8s/ingress.yaml` and replace `portfolio.yourdomain.com` with your actual domain:
   ```bash
   # Find and replace in k8s/ingress.yaml
   portfolio.yourdomain.com → portfolio.yourrealdomain.com
   # Or for root domain:
   portfolio.yourdomain.com → yourrealdomain.com
   ```

## Step 2: Apply cert-manager ClusterIssuer

This sets up Let's Encrypt to automatically issue TLS certificates:

```bash
kubectl apply -f k8s/cert-issuer.yaml
```

Verify it's created:
```bash
kubectl get clusterissuer letsencrypt-prod
```

## Step 3: Build and Push Docker Image

### Option A: Using the deployment script (Linux/Mac)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option B: Manual steps (Windows/All platforms)

```bash
# 1. Build the Docker image
docker build -t lassemg/portfolio-ui:latest .

# 2. Login to Docker Hub
docker login

# 3. Push the image
docker push lassemg/portfolio-ui:latest
```

## Step 4: Deploy to Kubernetes

Apply all Kubernetes manifests:

```bash
kubectl apply -f k8s/
```

This will create:
- ✅ Deployment (2 replicas)
- ✅ Service (ClusterIP)
- ✅ Ingress (with TLS)

## Step 5: Verify Deployment

### Check Pods
```bash
kubectl get pods -l app=portfolio-ui
```

Expected output:
```
NAME                            READY   STATUS    RESTARTS   AGE
portfolio-ui-xxxxxxxxxx-xxxxx   1/1     Running   0          30s
portfolio-ui-xxxxxxxxxx-xxxxx   1/1     Running   0          30s
```

### Check Service
```bash
kubectl get svc portfolio-ui
```

### Check Ingress
```bash
kubectl get ingress portfolio-ui
```

Expected output:
```
NAME           CLASS     HOSTS                      ADDRESS         PORTS     AGE
portfolio-ui   traefik   portfolio.yourdomain.com   X.X.X.X         80, 443   1m
```

### Check TLS Certificate
```bash
kubectl get certificate -n default
```

Wait for the certificate to be ready (may take 1-2 minutes):
```bash
kubectl describe certificate portfolio-ui-tls
```

## Step 6: Access Your Portfolio

Once DNS propagates (can take 5 minutes to 48 hours):

```
https://portfolio.yourdomain.com
```

### Troubleshooting DNS

Check if DNS is propagating:
```bash
# Linux/Mac
nslookup portfolio.yourdomain.com

# Windows
nslookup portfolio.yourdomain.com

# Online tool
# Visit: https://dnschecker.org
```

## Common Issues and Solutions

### Issue: Certificate not issuing

**Check cert-manager logs:**
```bash
kubectl logs -n cert-manager deployment/cert-manager
```

**Check certificate status:**
```bash
kubectl describe certificate portfolio-ui-tls
kubectl describe certificaterequest -n default
```

### Issue: 404 Not Found

**Check if ingress is configured:**
```bash
kubectl describe ingress portfolio-ui
```

**Check Traefik logs:**
```bash
kubectl logs -n kube-system -l app.kubernetes.io/name=traefik
```

### Issue: Pods not starting

**Check pod logs:**
```bash
kubectl logs -l app=portfolio-ui
```

**Check pod events:**
```bash
kubectl describe pods -l app=portfolio-ui
```

### Issue: Can't pull image

**Verify image exists:**
```bash
docker pull lassemg/portfolio-ui:latest
```

**If image is private, create a docker-registry secret:**
```bash
kubectl create secret docker-registry dockerhub-secret \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=lassemg \
  --docker-password=YOUR_PASSWORD \
  --docker-email=lasse.gelsbjerg@gmail.com

# Then add to deployment.yaml under spec.template.spec:
# imagePullSecrets:
# - name: dockerhub-secret
```

## Updating the Application

After making changes to your code:

```bash
# 1. Build and push new image
docker build -t lassemg/portfolio-ui:latest .
docker push lassemg/portfolio-ui:latest

# 2. Restart the deployment to pull new image
kubectl rollout restart deployment/portfolio-ui

# 3. Watch the rollout
kubectl rollout status deployment/portfolio-ui
```

## Useful Commands

### View logs
```bash
# All pods
kubectl logs -l app=portfolio-ui --tail=100 -f

# Specific pod
kubectl logs portfolio-ui-xxxxxxxxxx-xxxxx -f
```

### Scale deployment
```bash
kubectl scale deployment portfolio-ui --replicas=3
```

### Delete deployment
```bash
kubectl delete -f k8s/
```

### Force new deployment
```bash
kubectl rollout restart deployment/portfolio-ui
```

### Check resource usage
```bash
kubectl top pods -l app=portfolio-ui
```

## File Structure

```
portolio-ui/
├── k8s/
│   ├── deployment.yaml      # Kubernetes Deployment
│   ├── service.yaml         # Kubernetes Service
│   ├── ingress.yaml         # Ingress with TLS
│   └── cert-issuer.yaml     # Let's Encrypt ClusterIssuer
├── Dockerfile               # Production container
├── nginx.conf              # Nginx configuration
├── deploy.sh               # Deployment script
└── DEPLOYMENT.md           # This file
```

## Security Notes

- TLS certificates are automatically renewed by cert-manager
- Nginx serves static files with security headers
- Resources are limited to prevent resource exhaustion
- Health checks ensure pods are healthy before receiving traffic

## Next Steps

1. **Custom Domain**: Update `k8s/ingress.yaml` with your actual domain
2. **DNS**: Point your domain's A record to your k3s cluster IP
3. **Deploy**: Run `./deploy.sh` or follow manual steps
4. **Monitor**: Watch logs and certificate issuance
5. **Verify**: Access your portfolio via HTTPS

---

**Need help?** Check the troubleshooting section or review pod logs for specific errors.
