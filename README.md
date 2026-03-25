# BraJos Soft - Sitio Web Corporativo

Sitio web profesional desarrollado con Next.js para BraJos Soft, empresa especializada en desarrollo de software a medida.

## 🚀 Stack Tecnológico

- **Next.js 16.2** - Framework React con Turbopack
- **React 19** - Librería UI
- **Podman** - Container runtime
- **GitHub Actions** - CI/CD automático
- **Nginx** - Reverse proxy

## 🌐 Sitio en Producción

- **URL**: https://brajossoft.com
- **Puerto**: 3001 (interno)
- **Servidor**: `/opt/proyectos/brajossoft`

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build producción
npm run build
npm start
```

Abre [http://localhost:3001](http://localhost:3001)

## 🚀 Deployment Automático

**Pipeline CI/CD con GitHub Actions**:
- Push a `main` → Deploy automático a producción
- Push a `dev`/`testqa` → Build y quality checks

**Configuración del Servidor (primera vez)**:
```bash
# 1. Instalar Podman
sudo apt install -y podman
pip3 install --user podman-compose

# 2. Crear estructura
sudo mkdir -p /opt/proyectos
sudo chown -R $USER:$USER /opt/proyectos

# 3. Configurar GitHub Secrets
# - SERVER_HOST: IP del servidor
# - SERVER_USER: Usuario SSH
# - SERVER_PORT: Puerto SSH (22)
# - SSH_PRIVATE_KEY: Clave privada completa
```

**Nginx Reverse Proxy**:
```nginx
server {
    listen 80;
    server_name brajossoft.com www.brajossoft.com;
    
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

## 📁 Estructura del Proyecto

```
brajossoft/
├── .github/workflows/    # CI/CD pipeline
├── app/                  # Páginas Next.js
├── components/           # Componentes React
├── public/               # Assets estáticos
├── styles/               # CSS global
├── docker-compose.yml    # Orquestación Podman
└── Dockerfile           # Imagen de producción
```

## 🐳 Container Management

```bash
# Ver contenedores
podman ps --filter "name=brajos-soft"

# Ver logs
podman logs brajos-soft-web

# Reiniciar
cd /opt/proyectos/brajossoft
podman-compose restart

# Rebuild manual
podman build --no-cache -t brajossoft:latest .
podman-compose up -d --force-recreate
```

## 📝 Contacto

- **Email**: contacto@brajossoft.com
- **Teléfono**: +506 6100 0702
- **Ubicación**: Alajuela, Costa Rica
3. Agregar secretos en GitHub (SERVER_HOST, SERVER_USER, SSH_PRIVATE_KEY, SERVER_PORT)
4. ¡Push y listo! El pipeline ejecuta automáticamente 🚀

**Uso diario**:
```bash
git add .
git commit -m "Nueva funcionalidad"
git push  # El pipeline CI/CD se ejecuta automáticamente

# Ver progreso en: https://github.com/TuUsuario/brajossoft/actions
```

**Branches**:
- `main` → Build, Quality, Docker Build, **Deploy a producción**
- `dev` → Build, Quality, Docker Build (sin deploy)
- `testqa` → Build, Quality, Docker Build (sin deploy)

**Tags de versión**:
```bash
git tag v1.0.0
git push origin v1.0.0  # Despliega versión específica
```

Ver documentación completa en: **[GITHUB-ACTIONS-SETUP.md](GITHUB-ACTIONS-SETUP.md)** y **[PIPELINE.md](PIPELINE.md)**

### Despliegue Manual en Servidor con Nginx

Si prefieres desplegar manualmente, sigue la guía en **[NGINX-SETUP.md](NGINX-SETUP.md)**

Resumen:
```bash
# Instalación automática
./install.sh

# O manual
npm install && npm run build
sudo systemctl restart brajossoft
```

### Despliegue con Docker/Podman
```bash
# Con Podman (recomendado)
podman-compose up -d

# O con Docker
docker-compose up -d
```

Ver guía completa: **[DEPLOYMENT.md](DEPLOYMENT.md)** y **[PODMAN.md](PODMAN.md)**

## 📁 Estructura del Proyecto

```
brajos-soft/
├── app/
│   ├── layout.js        # Layout principal
│   └── page.js          # Página de inicio
├── components/
│   ├── Header.jsx       # Navegación
│   ├── Hero.jsx         # Sección hero
│   ├── Services.jsx     # Servicios
│   ├── About.jsx        # Sobre nosotros
│   ├── Projects.jsx     # Proyectos
│   ├── Contact.jsx      # Contacto
│   └── Footer.jsx       # Pie de página
├── styles/
│   └── globals.css      # Estilos globales
├── public/
│   └── logo.png         # Logo de la empresa
└── package.json
```

## 🎨 Características

- ✅ Diseño responsivo completo
- ✅ Navegación suave entre secciones
- ✅ Animaciones y transiciones
- ✅ Optimización SEO
- ✅ Rendimiento optimizado
- ✅ Paleta de colores corporativa
- ✅ Formulario de contacto funcional

## 📞 Secciones

1. **Inicio** - Hero con llamado a la acción
2. **Servicios** - Sistemas a medida, Diseño Web, Consultoría
3. **Nosotros** - Información de la empresa y estadísticas
4. **Proyectos** - Portafolio de trabajos
5. **Contacto** - Formulario y datos de contacto

## 🎨 Paleta de Colores

- Primario: `#0066b3` (Azul corporativo)
- Secundario: `#ff9933` (Naranja)
- Gradientes personalizados

## 📝 Licencia

© 2026 BraJos Soft. Todos los derechos reservados.
