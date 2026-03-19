# BraJos Soft - Sitio Web Corporativo

Sitio web profesional desarrollado con Next.js para BraJos Soft, empresa especializada en desarrollo de sistemas informáticos a la medida y diseño web.

## 🚀 Tecnologías

- **Next.js 14** - Framework de React con SSR
- **React 18** - Librería de UI
- **CSS3** - Estilos personalizados
- **Responsive Design** - Diseño adaptable a todos los dispositivos

## 📦 Instalación

```bash
# Instalar dependencias
npm install
```

## 💻 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3001](http://localhost:3001) en tu navegador.

## 🏗️ Construcción y Despliegue

### Construcción local
```bash
npm run build
npm start
```

### Despliegue Automático con GitHub Actions ⭐ (Recomendado)

El proyecto incluye un **pipeline CI/CD completo** con 4 fases:

**Pipeline Automático**:
1. 🏗️ **Build & Test** - Valida que el código compile
2. 📊 **Code Quality** - ESLint y análisis de código
3. 🐳 **Docker Build** - Construye y publica imagen en GitHub Registry
4. 🚀 **Deploy** - Despliega a producción con Podman (solo rama `main`)

**Configuración inicial** (solo una vez): Ver guía completa en **[GITHUB-ACTIONS-SETUP.md](GITHUB-ACTIONS-SETUP.md)**

Pasos rápidos:
1. Instalar Podman y podman-compose en el servidor
2. Generar clave SSH y copiarla al servidor
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
