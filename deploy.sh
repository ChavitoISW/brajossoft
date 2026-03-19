#!/bin/bash

# Script de despliegue automatizado para BraJos Soft
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando despliegue de BraJos Soft..."

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Actualizar código
echo -e "${YELLOW}📥 Actualizando código...${NC}"
git pull origin main

# Verificar si existe docker-compose o podman-compose
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif command -v podman-compose &> /dev/null; then
    COMPOSE_CMD="podman-compose"
else
    # Despliegue directo con Node.js
    echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
    npm install
    
    echo -e "${YELLOW}🔨 Construyendo aplicación...${NC}"
    npm run build
    
    echo -e "${GREEN}✅ Build completado!${NC}"
    echo -e "${YELLOW}Inicia el servidor con: npm start${NC}"
    exit 0
fi

# Despliegue con Docker/Podman
echo -e "${YELLOW}🐋 Reconstruyendo contenedores...${NC}"
$COMPOSE_CMD down
$COMPOSE_CMD up -d --build

echo -e "${GREEN}✅ Despliegue completado exitosamente!${NC}"
echo -e "${GREEN}🌐 Sitio disponible en: http://localhost:3001${NC}"
