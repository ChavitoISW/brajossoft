# Guía de Despliegue en Servidor - BraJos Soft

> 🚀 **Despliegue Automático con GitHub Actions (Recomendado)**  
> El proyecto está configurado para desplegar automáticamente con cada push a `main`.  
> **[Ver guía completa de configuración →](GITHUB-ACTIONS-SETUP.md)**

> 💡 **¿Tu servidor ya tiene Nginx configurado?**  
> Ve directamente a **[NGINX-SETUP.md](NGINX-SETUP.md)** para instalación manual.

---

## 🎯 Estrategia de Despliegue Recomendada

### GitHub Actions + Podman + Nginx

**Ventajas**:
- ✅ Despliegue automático en cada push
- ✅ Build y contenedores en el servidor
- ✅ Sin necesidad de permisos root (Podman)
- ✅ Aislamiento completo con contenedores
- ✅ Rollback fácil con Git
- ✅ Historial de despliegues

**Configuración**:
1. Instalar Podman en el servidor: [PODMAN.md](PODMAN.md)
2. Configurar GitHub Actions (una sola vez): [GITHUB-ACTIONS-SETUP.md](GITHUB-ACTIONS-SETUP.md)
3. Desarrollar, commit, push → ¡Despliegue automático con contenedores! 🐋

---

## � Opción 1: Despliegue con Docker/Podman

### Instalar Docker o Podman

#### Ubuntu/Debian (Podman)
```bash
sudo apt update
sudo apt install -y podman podman-compose
```

#### Ubuntu/Debian (Docker)
```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
```

### Desplegar
```bash
# Clonar repositorio
cd /var/www
sudo git clone https://github.com/ChavitoISW/brajossoft.git
cd brajossoft
sudo chown -R $USER:$USER .

# Con Docker
docker-compose up -d

# O con Podman
podman-compose up -d

# Ver logs
docker-compose logs -f  # o podman-compose logs -f
```

### Auto-inicio con systemd
```bash
# Para Podman
sudo podman generate systemd --new --name brajos-soft-web-1 > /etc/systemd/system/brajos-soft.service
sudo systemctl enable brajos-soft.service

# Para Docker (ya inicia automáticamente)
sudo systemctl enable docker
```

---

## 📦 Opción 2: Despliegue en Vercel (Más Fácil)

La forma más sencilla sin servidor propio:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy desde el directorio del proyecto
vercel
```

Sigue las instrucciones. Tu sitio estará en: `https://tu-proyecto.vercel.app`

---

## 🚀 Opción 3: Despliegue Directo con Node.js

### Requisitos
- Node.js 20+
- Nginx (opcional, como reverse proxy)

### Pasos

#### 1. Preparar el servidor
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 2. Clonar repositorio
```bash
cd /var/www
sudo git clone https://github.com/ChavitoISW/brajossoft.git
cd brajossoft
sudo chown -R $USER:$USER .
```

#### 3. Instalar dependencias y build
```bash
npm install
npm run build
```

#### 4. Crear servicio systemd
```bash
sudo nano /etc/systemd/system/brajossoft.service
```

Contenido:
```ini
[Unit]
Description=BraJos Soft Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/brajossoft
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3001

[Install]
WantedBy=multi-user.target
```

Activar e iniciar:
```bash
sudo systemctl enable brajossoft
sudo systemctl start brajossoft
sudo systemctl status brajossoft
```

#### 5. Configurar Nginx (opcional)
```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/brajossoft
```

Contenido:
```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar sitio
sudo ln -s /etc/nginx/sites-available/brajossoft /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 6. SSL con Certbot (opcional)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

---

## � Actualización del Sitio

### Con Docker/Podman
```bash
cd /var/www/brajossoft  # o donde esté tu proyecto
git pull

# Con Docker
docker-compose down
docker-compose up -d --build

# O con Podman
podman-compose down
podman-compose up -d --build
```

### Con Node.js directo (systemd)
```bash
cd /var/www/brajossoft
git pull
npm install
npm run build
sudo systemctl restart brajossoft
```

### Script de actualización automática

Para Docker/Podman:
```bash
#!/bin/bash
cd /var/www/brajossoft
git pull
docker-compose down
docker-compose up -d --build
echo "Sitio actualizado: $(date)"
```

Para Node.js directo:
```bash
#!/bin/bash
cd /var/www/brajossoft
git pull
npm install
npm run build
sudo systemctl restart brajossoft
echo "Sitio actualizado: $(date)"
```

---

## 🔐 Seguridad

### Firewall
```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Variables de entorno
```bash
# Crear .env.local
nano .env.local
```

```env
NODE_ENV=production
PORT=3001
```

---

## 📊 Monitoreo

### Ver logs con Docker/Podman
```bash
# Docker
docker-compose logs -f

# Podman
podman-compose logs -f

# Ver logs de contenedor específico
docker logs -f brajos-soft-web-1
```

### Ver logs con systemd
```bash
# Ver logs del servicio
sudo journalctl -u brajossoft -f

# Ver últimas 100 líneas
sudo journalctl -u brajossoft -n 100
```

### Monitoreo de recursos
```bash
# Ver estado del servicio
sudo systemctl status brajossoft

# Ver uso de recursos (si usas Docker)
docker stats
```

---

## 🌐 Dominios recomendados
- www.brajossoft.com
- brajossoft.com
- brajos.dev
