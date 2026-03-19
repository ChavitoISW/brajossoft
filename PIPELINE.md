# Pipeline CI/CD - BraJos Soft

## 🎯 Descripción del Pipeline

Este documento describe el pipeline completo de CI/CD configurado para el proyecto BraJos Soft.

## 📋 Fases del Pipeline

### FASE 1: Build & Quality (Paralelo)

Dos jobs ejecutándose simultáneamente:

#### 🏗️ Build & Test
- Checkout del código
- Instalación de Node.js 20
- Instalación de dependencias con `npm ci`
- Lint del código
- Build de producción Next.js
- Validación de build exitoso

#### 📊 Code Quality
- Checkout del código
- Instalación de Node.js 20
- Instalación de dependencias
- ESLint checks
- Análisis de estructura del código
- Reporte de archivos JS/JSX

### FASE 2: Docker Build

Solo se ejecuta si las fases anteriores pasan exitosamente:

- Instalación de Podman
- Login a GitHub Container Registry (ghcr.io)
- Generación de tags:
  - SHA del commit (ej: `a1b2c3d4`)
  - `latest` (si es rama main)
  - Versión (si es tag, ej: `v1.0.0`)
- Build de imagen con Podman
- Push a GitHub Container Registry
- Imagen disponible en: `ghcr.io/usuario/brajossoft`

### FASE 3: Deploy

Solo se ejecuta si:
- Docker Build pasó exitosamente
- NO es Pull Request
- Es rama `main`

Pasos del deployment:
1. Conexión SSH al servidor
2. Navegación a `/var/www/brajossoft`
3. Git pull del código actualizado
4. Detención de contenedores actuales
5. Rebuild de imagen con Podman
6. Inicio de nuevos contenedores con podman-compose
7. Verificación de puerto 3001 respondiendo
8. Validación de contenedores corriendo

### FASE 4: Pipeline Summary

Se ejecuta siempre al final (success o failure):

- Resume estado de todas las fases
- Muestra información del commit
- Indica si el pipeline fue exitoso o tuvo errores

## 🔀 Comportamiento por Branch/Evento

### Push a `main`
```
✅ Build & Test
✅ Code Quality
✅ Docker Build → Push imagen con tags: latest + SHA
✅ Deploy → Despliega a producción
✅ Pipeline Summary
```

### Push a `dev` o `testqa`
```
✅ Build & Test
✅ Code Quality
✅ Docker Build → Push imagen con tag SHA
⏭️  Deploy (skipped)
✅ Pipeline Summary
```

### Pull Request (a main/dev)
```
✅ Build & Test
✅ Code Quality
⏭️  Docker Build (skipped)
⏭️  Deploy (skipped)
✅ Pipeline Summary
```

### Push de Tag (ej: v1.0.0)
```
✅ Build & Test
✅ Code Quality
✅ Docker Build → Push con tags: v1.0.0 + latest + SHA
✅ Deploy → Despliega versión específica
✅ Pipeline Summary
```

### Workflow Dispatch (manual)
```
✅ Todas las fases según la rama seleccionada
```

## 📦 Imágenes Docker Generadas

Las imágenes se publican en GitHub Container Registry:

**URL**: `https://github.com/OWNER/brajossoft/pkgs/container/brajossoft`

**Tags disponibles**:
- `latest` - Última versión de main
- `<sha>` - Commit específico (ej: `a1b2c3d4`)
- `v*.*.*` - Versiones etiquetadas (ej: `v1.0.0`)

## 🔍 Monitoreo del Pipeline

### Ver ejecuciones
1. Ve a tu repositorio en GitHub
2. Click en la pestaña **Actions**
3. Verás el historial completo de ejecuciones

### Estados posibles
- ✅ **Success** - Todo pasó correctamente
- ❌ **Failure** - Alguna fase falló
- 🟡 **In Progress** - Ejecutándose actualmente
- ⏭️ **Skipped** - No se ejecutó (por condiciones)
- ⚪ **Cancelled** - Cancelado manualmente

### Logs detallados
- Click en cualquier ejecución para ver logs de cada fase
- Cada step muestra su output completo
- Logs conservados por 90 días

## 🚀 Ejecutar Manualmente

1. Ve a Actions → "🚀 Pipeline CI/CD Completo"
2. Click en "Run workflow"
3. Selecciona la rama
4. Click "Run workflow"

## 🔧 Troubleshooting

### Error en Build & Test
**Síntoma**: Falla en `npm run build`

**Solución**:
```bash
# Local
npm install
npm run build
# Si falla local, arreglar antes de push
```

### Error en Docker Build
**Síntoma**: Falla al construir imagen

**Solución**:
- Verificar que el Dockerfile sea válido
- Probar local: `podman build -t test .`

### Error en Deploy
**Síntoma**: No se conecta al servidor

**Solución**:
- Verificar secretos en GitHub
- Probar SSH manual: `ssh usuario@servidor`
- Ver logs del contenedor en el servidor

### Container no responde en puerto 3001
**Solución en servidor**:
```bash
cd /var/www/brajossoft
podman-compose logs -f
podman ps
netstat -tlnp | grep 3001
```

## 🎯 Mejoras Futuras

Posibles mejoras al pipeline:

- [ ] Tests unitarios con Jest
- [ ] Tests E2E con Playwright
- [ ] Lighthouse CI para performance
- [ ] Security scanning con Trivy
- [ ] Deploy a staging automático desde `dev`
- [ ] Notificaciones a Slack/Discord
- [ ] Métricas de deployment
- [ ] Rollback automático si falla health check

## 📊 Métricas Actuales

El pipeline típicamente toma:
- Build & Quality: ~2-3 minutos
- Docker Build: ~3-5 minutos
- Deploy: ~1-2 minutos
- **Total**: ~7-10 minutos

## 🔐 Secretos Requeridos

El pipeline requiere estos secretos configurados en GitHub:

| Secret | Descripción | Ejemplo |
|--------|-------------|---------|
| `SERVER_HOST` | IP o dominio del servidor | `45.123.456.78` |
| `SERVER_USER` | Usuario SSH | `ubuntu` |
| `SERVER_PORT` | Puerto SSH | `22` |
| `SSH_PRIVATE_KEY` | Clave privada SSH completa | `-----BEGIN...` |
| `GITHUB_TOKEN` | Auto-generado por GitHub | N/A |

Ver configuración completa en: [GITHUB-ACTIONS-SETUP.md](GITHUB-ACTIONS-SETUP.md)
