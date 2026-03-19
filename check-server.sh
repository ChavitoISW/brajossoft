#!/bin/bash

# Script de verificación de configuración para GitHub Actions
# Ejecutar en el servidor antes de configurar GitHub Actions

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════╗"
echo "║  Verificación de Servidor para GitHub Actions ║"
echo "║              (Despliegue con Podman)          ║"
echo "╚═══════════════════════════════════════════════╝"
echo -e "${NC}"

ERRORS=0

# Verificar directorio del proyecto
echo -e "\n${YELLOW}📁 Verificando directorio del proyecto...${NC}"
if [ -d "/var/www/brajossoft" ]; then
    echo -e "${GREEN}✓ Directorio existe: /var/www/brajossoft${NC}"
else
    echo -e "${RED}✗ Directorio no existe: /var/www/brajossoft${NC}"
    echo -e "${YELLOW}  Crea el directorio o cambia la ruta en el workflow${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verificar usuario actual
echo -e "\n${YELLOW}👤 Usuario actual: ${BLUE}$(whoami)${NC}"
echo -e "${YELLOW}   Este usuario debe tener acceso SSH${NC}"

# Verificar SSH
echo -e "\n${YELLOW}🔐 Verificando configuración SSH...${NC}"
if [ -f "$HOME/.ssh/authorized_keys" ]; then
    echo -e "${GREEN}✓ Archivo authorized_keys existe${NC}"
    KEY_COUNT=$(wc -l < "$HOME/.ssh/authorized_keys")
    echo -e "   Claves configuradas: ${BLUE}$KEY_COUNT${NC}"
else
    echo -e "${RED}✗ Archivo authorized_keys no encontrado${NC}"
    echo -e "${YELLOW}  Crea: mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verificar permisos SSH
if [ -d "$HOME/.ssh" ]; then
    SSH_PERMS=$(stat -c "%a" "$HOME/.ssh")
    AK_PERMS=$(stat -c "%a" "$HOME/.ssh/authorized_keys" 2>/dev/null || echo "000")
    
    if [ "$SSH_PERMS" = "700" ]; then
        echo -e "${GREEN}✓ Permisos .ssh correctos (700)${NC}"
    else
        echo -e "${RED}✗ Permisos .ssh incorrectos: $SSH_PERMS (debe ser 700)${NC}"
        echo -e "${YELLOW}  Ejecuta: chmod 700 ~/.ssh${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    if [ "$AK_PERMS" = "600" ]; then
        echo -e "${GREEN}✓ Permisos authorized_keys correctos (600)${NC}"
    else
        echo -e "${RED}✗ Permisos authorized_keys incorrectos: $AK_PERMS (debe ser 600)${NC}"
        echo -e "${YELLOW}  Ejecuta: chmod 600 ~/.ssh/authorized_keys${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Verificar Node.js
echo -e "\n${YELLOW}📦 Verificando Podman...${NC}"
if command -v podman &> /dev/null; then
    PODMAN_VERSION=$(podman --version)
    echo -e "${GREEN}✓ Podman instalado: $PODMAN_VERSION${NC}"
else
    echo -e "${RED}✗ Podman no está instalado${NC}"
    echo -e "${YELLOW}  Instala con: sudo apt install -y podman podman-compose${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verificar podman-compose
if command -v podman-compose &> /dev/null; then
    COMPOSE_VERSION=$(podman-compose --version 2>&1 | head -n 1)
    echo -e "${GREEN}✓ podman-compose instalado: $COMPOSE_VERSION${NC}"
else
    echo -e "${RED}✗ podman-compose no está instalado${NC}"
    echo -e "${YELLOW}  Instala con: sudo apt install -y podman-compose${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verificar git
echo -e "\n${YELLOW}🔄 Verificando Git...${NC}"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓ Git instalado: $GIT_VERSION${NC}"
else
    echo -e "${RED}✗ Git no está instalado${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Verificar servicio systemd
echo -e "\n${YELLOW}⚙️  Verificando contenedores Podman...${NC}"
if [ -f "/var/www/brajossoft/docker-compose.yml" ]; then
    echo -e "${GREEN}✓ docker-compose.yml existe${NC}"
    
    # Verificar si hay contenedores corriendo
    cd /var/www/brajossoft 2>/dev/null || true
    RUNNING_CONTAINERS=$(podman-compose ps --quiet 2>/dev/null | wc -l)
    
    if [ "$RUNNING_CONTAINERS" -gt 0 ]; then
        echo -e "${GREEN}✓ Hay $RUNNING_CONTAINERS contenedor(es) corriendo${NC}"
    else
        echo -e "${YELLOW}⚠ No hay contenedores corriendo${NC}"
        echo -e "${YELLOW}  Inicia con: podman-compose up -d${NC}"
    fi
else
    echo -e "${YELLOW}⚠ docker-compose.yml no existe en /var/www/brajossoft${NC}"
fi

# Verificar puerto 3001
echo -e "\n${YELLOW}🔌 Verificando puerto 3001...${NC}"
if netstat -tuln 2>/dev/null | grep -q ":3001 " || ss -tuln 2>/dev/null | grep -q ":3001 "; then
    echo -e "${GREEN}✓ Puerto 3001 está en uso (servicio corriendo)${NC}"
else
    echo -e "${YELLOW}⚠ Puerto 3001 no está en uso${NC}"
    echo -e "${YELLOW}  El servicio puede no estar corriendo${NC}"
fi

# Verificar Nginx
echo -e "\n${YELLOW}🌐 Verificando Nginx...${NC}"
if command -v nginx &> /dev/null; then
    NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)
    echo -e "${GREEN}✓ Nginx instalado: $NGINX_VERSION${NC}"
    
    if [ -f "/etc/nginx/sites-available/brajossoft" ]; then
        echo -e "${GREEN}✓ Configuración Nginx econtenedor corriendo)${NC}"
else
    echo -e "${YELLOW}⚠ Puerto 3001 no está en uso${NC}"
    echo -e "${YELLOW}  Los contenedores pueden no estar corriendo${NC}"
fi

# Verificar Nginx
echo -e "\n${YELLOW}🌐 Verificando Nginx...${NC}"
if command -v nginx &> /dev/null; then
    NGINX_VERSION=$(nginx -v 2>&1 | cut -d'/' -f2)
    echo -e "${GREEN}✓ Nginx instalado: $NGINX_VERSION${NC}"
    
    if [ -f "/etc/nginx/sites-available/brajossoft" ]; then
        echo -e "${GREEN}✓ Configuración Nginx existe${NC}"
    else
        echo -e "${YELLOW}⚠ Configuración Nginx no encontrada${NC}"
        echo -e "${YELLOW}  Nginx puede servir el sitio sin configuración especial${NC}"
    fi
    
    if [ -L "/etc/nginx/sites-enabled/brajossoft" ]; then
        echo -e "${GREEN}✓ Configuración Nginx habilitada${NC}"
    else
        echo -e "${YELLOW}⚠ Configuración Nginx no está habilitada${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Nginx no está instalado (opcional con Podman)${NC}"
    echo -e "${YELLOW}  Podman puede servir el sitio directamente en puerto 3001l servidor"
    echo -e "   2. Configura secretos en GitHub"
    echo -e "   3. Haz push y el despliegue será automático"
    echo ""
    echo -e "${YELLOW}Ver guía completa: ${BLUE}GITHUB-ACTIONS-SETUP.md${NC}"
else
    echo -e "${RED}"
    echo "╔═══════════════════════════════════════════════╗"
    echo "║     ⚠️  Se encontraron $ERRORS problema(s)           ║"
    echo "╚═══════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo -e "${YELLOW}Revisa los errores arriba y corrígelos${NC}"
    echo -e "${YELLOW}Luego ejecuta este script nuevamente${NC}"
    exit 1
fi
