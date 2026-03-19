# Configuración de Nginx para BraJos Soft

> 🚀 **Después de configurar el servidor, habilita despliegue automático**  
> Una vez instalado, configura GitHub Actions para despliegues automáticos: **[GITHUB-ACTIONS-SETUP.md](GITHUB-ACTIONS-SETUP.md)**

---

## 🚀 Instalación Automática (Recomendado)

El script `install.sh` automatiza todo el proceso de instalación:

```bash
# Descarga y ejecuta el script
cd /var/www/brajossoft
chmod +x install.sh
./install.sh
```

El script instalará:
- Node.js 20 (si no está instalado)
- Nginx (si no está instalado)
- Dependencias del proyecto
- Servicio systemd
- Configuración de Nginx
- Certificado SSL con Let's Encrypt (opcional)

---

## 📝 Instalación Manual

Si prefieres instalar manualmente o ya tienes Nginx configurado:

### Paso 1: Clonar y construir el proyecto

```bash
# Clonar repositorio
cd /var/www
sudo git clone https://github.com/ChavitoISW/brajossoft.git
cd brajossoft
sudo chown -R $USER:$USER .

# Instalar y construir
npm install
npm run build
```

### Paso 2: Crear servicio systemd

```bash
sudo nano /etc/systemd/system/brajossoft.service
```

**Contenido del archivo:**
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
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3001

[Install]
WantedBy=multi-user.target
```

**Activar el servicio:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable brajossoft
sudo systemctl start brajossoft
sudo systemctl status brajossoft
```

### Paso 3: Configurar Nginx

```bash
# Copiar archivo de configuración
sudo cp nginx.conf /etc/nginx/sites-available/brajossoft

# Si usas dominios diferentes, edita el archivo
sudo nano /etc/nginx/sites-available/brajossoft
# Cambia: server_name brajossoft.com www.brajossoft.com;
# Por tu dominio real

# Activar sitio
sudo ln -s /etc/nginx/sites-available/brajossoft /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx
```

### Paso 4: SSL con Certbot

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL (esto modificará automáticamente tu nginx.conf)
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Verificar renovación automática
sudo certbot renew --dry-run
```

## 🔄 Actualización del Sitio

```bash
cd /var/www/brajossoft
git pull
npm install
npm run build
sudo systemctl restart brajossoft
```

**Script de actualización automática:**
```bash
#!/bin/bash
cd /var/www/brajossoft
echo "🔄 Actualizando BraJos Soft..."
git pull
npm install
npm run build
sudo systemctl restart brajossoft
echo "✅ Actualización completada: $(date)"
```

Guarda como `update.sh`, da permisos con `chmod +x update.sh` y ejecuta con `./update.sh`

## 📊 Monitoreo

### Ver logs del servicio
```bash
# Logs en tiempo real
sudo journalctl -u brajossoft -f

# Últimas 50 líneas
sudo journalctl -u brajossoft -n 50

# Logs desde hoy
sudo journalctl -u brajossoft --since today
```

### Ver logs de Nginx
```bash
# Access log
sudo tail -f /var/log/nginx/brajossoft-access.log

# Error log
sudo tail -f /var/log/nginx/brajossoft-error.log
```

### Estado del servicio
```bash
sudo systemctl status brajossoft
```

## 🔧 Troubleshooting

### El servicio no inicia
```bash
# Ver error específico
sudo journalctl -u brajossoft -n 50

# Verificar que Node.js esté instalado
node --version

# Verificar que el puerto 3001 esté libre
sudo netstat -tlnp | grep 3001
```

### Nginx muestra error 502 Bad Gateway
```bash
# Verificar que el servicio esté corriendo
sudo systemctl status brajossoft

# Reiniciar servicio
sudo systemctl restart brajossoft

# Verificar logs
sudo journalctl -u brajossoft -n 50
```

### Error de permisos
```bash
# Cambiar propietario a www-data
sudo chown -R www-data:www-data /var/www/brajossoft

# O al usuario actual
sudo chown -R $USER:$USER /var/www/brajossoft
```

## 🔐 Seguridad

### Firewall
```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
sudo ufw status
```

### Verificar SSL
```bash
# Verificar certificado
sudo certbot certificates

# Renovar manualmente
sudo certbot renew
```

## 📍 Configuración sin Dominio (solo IP)

Si aún no tienes dominio, edita el nginx.conf:

```bash
sudo nano /etc/nginx/sites-available/brajossoft
```

Cambia:
```nginx
# De:
server_name brajossoft.com www.brajossoft.com;

# A:
server_name tu_ip_del_servidor;

# Y comenta las secciones SSL:
# listen 443 ssl http2;
# ssl_certificate...
# ssl_certificate_key...
```

Solo deja el servidor HTTP en puerto 80:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name tu_ip_del_servidor;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Luego:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

Accede en: `http://tu_ip_del_servidor`
