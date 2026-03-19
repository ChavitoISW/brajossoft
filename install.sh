#!/bin/bash

# Script de instalación automática para BraJos Soft en servidor con Nginx
# Uso: curl -fsSL [URL_ESTE_SCRIPT] | bash
# O descargar y ejecutar: chmod +x install.sh && ./install.sh

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   BraJos Soft - Instalación Servidor  ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar si se ejecuta como root
if [ "$EUID" -eq 0 ]; then 
    echo -e "${RED}❌ No ejecutar como root. Usa un usuario normal con sudo.${NC}"
    exit 1
fi

# Verificar Node.js
echo -e "${YELLOW}📦 Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js no encontrado. Instalando Node.js 20...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js instalado: $NODE_VERSION${NC}"

# Verificar Nginx
echo -e "${YELLOW}🌐 Verificando Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    echo -e "${RED}❌ Nginx no está instalado.${NC}"
    read -p "¿Deseas instalar Nginx? (s/n): " INSTALL_NGINX
    if [ "$INSTALL_NGINX" = "s" ]; then
        sudo apt update
        sudo apt install -y nginx
        sudo systemctl enable nginx
        sudo systemctl start nginx
    else
        echo -e "${RED}Nginx es necesario. Saliendo...${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✓ Nginx instalado${NC}"

# Directorio de instalación
INSTALL_DIR="/var/www/brajossoft"
echo -e "${YELLOW}📁 Directorio de instalación: $INSTALL_DIR${NC}"

# Clonar repositorio
if [ -d "$INSTALL_DIR" ]; then
    echo -e "${YELLOW}⚠️  El directorio ya existe.${NC}"
    read -p "¿Deseas eliminarlo y reinstalar? (s/n): " REINSTALL
    if [ "$REINSTALL" = "s" ]; then
        sudo rm -rf "$INSTALL_DIR"
    else
        echo -e "${YELLOW}Usando directorio existente...${NC}"
    fi
fi

if [ ! -d "$INSTALL_DIR" ]; then
    echo -e "${YELLOW}📥 Clonando repositorio...${NC}"
    cd /var/www
    sudo git clone https://github.com/ChavitoISW/brajossoft.git
    sudo chown -R $USER:$USER "$INSTALL_DIR"
fi

# Instalar dependencias
echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
cd "$INSTALL_DIR"
npm install

# Build
echo -e "${YELLOW}🔨 Construyendo aplicación...${NC}"
npm run build

# Crear servicio systemd
echo -e "${YELLOW}⚙️  Configurando servicio systemd...${NC}"
sudo tee /etc/systemd/system/brajossoft.service > /dev/null <<EOF
[Unit]
Description=BraJos Soft Website
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$INSTALL_DIR
ExecStart=$(which npm) start
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3001

[Install]
WantedBy=multi-user.target
EOF

# Activar servicio
echo -e "${YELLOW}🚀 Activando servicio...${NC}"
sudo systemctl daemon-reload
sudo systemctl enable brajossoft
sudo systemctl start brajossoft

# Esperar a que el servicio inicie
echo -e "${YELLOW}⏳ Esperando que el servicio inicie...${NC}"
sleep 5

# Verificar que el servicio esté corriendo
if systemctl is-active --quiet brajossoft; then
    echo -e "${GREEN}✓ Servicio iniciado correctamente${NC}"
else
    echo -e "${RED}❌ Error al iniciar el servicio. Revisa los logs:${NC}"
    echo -e "${YELLOW}sudo journalctl -u brajossoft -n 50${NC}"
    exit 1
fi

# Configurar Nginx
echo -e "${YELLOW}🌐 Configurando Nginx...${NC}"

# Solicitar dominio
read -p "¿Tienes un dominio configurado? (s/n): " HAS_DOMAIN

if [ "$HAS_DOMAIN" = "s" ]; then
    read -p "Ingresa tu dominio (ej: brajossoft.com): " DOMAIN
    
    # Crear configuración Nginx con dominio
    sudo tee /etc/nginx/sites-available/brajossoft > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
EOF
    
    SSL_SETUP=true
else
    # Obtener IP del servidor
    SERVER_IP=$(hostname -I | awk '{print $1}')
    
    # Crear configuración Nginx con IP
    sudo tee /etc/nginx/sites-available/brajossoft > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_IP;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
    }

    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
EOF
    
    SSL_SETUP=false
fi

# Activar sitio
sudo ln -sf /etc/nginx/sites-available/brajossoft /etc/nginx/sites-enabled/

# Eliminar configuración default si existe
sudo rm -f /etc/nginx/sites-enabled/default

# Verificar configuración
echo -e "${YELLOW}🔍 Verificando configuración de Nginx...${NC}"
if sudo nginx -t; then
    echo -e "${GREEN}✓ Configuración de Nginx válida${NC}"
    sudo systemctl reload nginx
else
    echo -e "${RED}❌ Error en la configuración de Nginx${NC}"
    exit 1
fi

# Configurar firewall si está activo
if command -v ufw &> /dev/null; then
    echo -e "${YELLOW}🔐 Configurando firewall...${NC}"
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    echo -e "${GREEN}✓ Firewall configurado${NC}"
fi

# Configurar SSL con Certbot
if [ "$SSL_SETUP" = true ]; then
    echo -e "${YELLOW}🔒 ¿Deseas instalar certificado SSL gratis con Let's Encrypt? (Recomendado)${NC}"
    read -p "(s/n): " INSTALL_SSL
    
    if [ "$INSTALL_SSL" = "s" ]; then
        # Instalar Certbot si no está instalado
        if ! command -v certbot &> /dev/null; then
            echo -e "${YELLOW}Instalando Certbot...${NC}"
            sudo apt update
            sudo apt install -y certbot python3-certbot-nginx
        fi
        
        echo -e "${YELLOW}Ejecutando Certbot...${NC}"
        sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN
    fi
fi

# Resumen final
echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════╗"
echo "║   ✅ Instalación Completada            ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${GREEN}🎉 BraJos Soft ha sido instalado exitosamente!${NC}"
echo ""
echo -e "${BLUE}📍 Información del servicio:${NC}"
echo -e "   • Directorio: ${YELLOW}$INSTALL_DIR${NC}"
echo -e "   • Puerto interno: ${YELLOW}3001${NC}"
echo -e "   • Servicio: ${YELLOW}brajossoft${NC}"
echo ""

if [ "$HAS_DOMAIN" = "s" ]; then
    if [ "$INSTALL_SSL" = "s" ]; then
        echo -e "${BLUE}🌐 Tu sitio está disponible en:${NC}"
        echo -e "   ${GREEN}https://$DOMAIN${NC}"
        echo -e "   ${GREEN}https://www.$DOMAIN${NC}"
    else
        echo -e "${BLUE}🌐 Tu sitio está disponible en:${NC}"
        echo -e "   ${GREEN}http://$DOMAIN${NC}"
        echo -e "   ${GREEN}http://www.$DOMAIN${NC}"
        echo -e "${YELLOW}   ⚠️  Instala SSL con: sudo certbot --nginx -d $DOMAIN${NC}"
    fi
else
    echo -e "${BLUE}🌐 Tu sitio está disponible en:${NC}"
    echo -e "   ${GREEN}http://$SERVER_IP${NC}"
fi

echo ""
echo -e "${BLUE}📌 Comandos útiles:${NC}"
echo -e "   • Ver logs: ${YELLOW}sudo journalctl -u brajossoft -f${NC}"
echo -e "   • Reiniciar: ${YELLOW}sudo systemctl restart brajossoft${NC}"
echo -e "   • Estado: ${YELLOW}sudo systemctl status brajossoft${NC}"
echo -e "   • Actualizar: ${YELLOW}cd $INSTALL_DIR && git pull && npm install && npm run build && sudo systemctl restart brajossoft${NC}"
echo ""
