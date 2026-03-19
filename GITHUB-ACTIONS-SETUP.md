# Configuración de GitHub Actions para Despliegue Automático

## ✅ Verificación Rápida del Servidor

Antes de configurar GitHub Actions, ejecuta este script en tu servidor para verificar que todo esté listo:

```bash
cd /var/www/brajossoft
chmod +x check-server.sh
./check-server.sh
```

El script verificará:
- ✅ Node.js y npm instalados
- ✅ Directorio del proyecto existe
- ✅ Configuración SSH correcta
- ✅ Servicio systemd configurado
- ✅ Permisos sudo sin contraseña
- ✅ Nginx configurado

---

## 🚀 Estrategia de Despliegue

El workflow despliega automáticamente usando **Podman** con un pipeline CI/CD completo de 4 fases:

### Pipeline Completo

```
📥 Push a GitHub
    ↓
🔀 FASE 1: Build & Quality (Paralelo)
    ├─ 🏗️ Build & Test
    │   ├─ Instalar dependencias
    │   ├─ Lint código
    │   └─ Build Next.js
    │
    └─ 📊 Code Quality
        ├─ ESLint checks
        └─ Análisis de código
    ↓
🐳 FASE 2: Docker Build
    ├─ Build imagen con Podman
    ├─ Tag con SHA y versión
    └─ Push a GitHub Container Registry
    ↓
🚀 FASE 3: Deploy (solo rama main)
    ├─ Conectar al servidor vía SSH
    ├─ Git pull del código
    ├─ Rebuild contenedores
    ├─ Verificar puerto 3001
    └─ Validar deployment
    ↓
📋 FASE 4: Resumen
    └─ Estado de todos los jobs
```

**Ventajas**:
- 🔒 No requiere permisos root (Podman)
- 🚀 Aislamiento completo del sistema
- 📦 Imágenes versionadas en GitHub Registry
- 🔄 Rollback fácil con Git tags
- ✅ Validación automática en cada paso
- 🎯 Deploy solo si todos los tests pasan

## 🔐 Configurar Secretos en GitHub

### Paso 1: Generar clave SSH (si no tienes)

En tu computadora local o servidor:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy"
```

Cuando pregunte dónde guardar:
```
Enter file in which to save the key: /home/tu_usuario/.ssh/github_actions
```

No pongas contraseña (deja en blanco).

Esto creará dos archivos:
- `github_actions` (clave privada) ← Esta va a GitHub
- `github_actions.pub` (clave pública) ← Esta va al servidor

### Paso 2: Copiar clave pública al servidor

```bash
# Ver contenido de la clave pública
cat ~/.ssh/github_actions.pub

# Copiar al servidor
ssh-copy-id -i ~/.ssh/github_actions.pub usuario@tu-servidor.com

# O manualmente: agregar contenido de github_actions.pub a ~/.ssh/authorized_keys en el servidor
```

Verifica que funciona:
```bash
ssh -i ~/.ssh/github_actions usuario@tu-servidor.com
```

### Paso 3: Agregar Secretos en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret**

Agrega los siguientes secretos:

#### `SERVER_HOST`
- **Nombre**: `SERVER_HOST`
- **Valor**: IP o dominio de tu servidor
- Ejemplo: `45.123.456.78` o `servidor.brajossoft.com`

#### `SERVER_USER`
- **Nombre**: `SERVER_USER`
- **Valor**: Usuario SSH de tu servidor
- Ejemplo: `ubuntu` o `root` o `brajosalva`

#### `SERVER_PORT`
- **Nombre**: `SERVER_PORT`
- **Valor**: Puerto SSH (generalmente 22)
- Ejemplo: `22`

#### `SSH_PRIVATE_KEY`
- **Nombre**: `SSH_PRIVATE_KEY`
- **Valor**: Contenido completo de tu clave privada

```bash
# Ver contenido de la clave privada
cat ~/.ssh/github_actions
```

Copia TODO el contenido, incluyendo:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...todo el contenido...
-----END OPENSSH PRIVATE KEY-----
```

### Paso 4: Configurar Podman en el servidor

En tu servidor, instala y configura Podman:

```bash
# Instalar Podman y podman-compose
sudo apt update
sudo apt install -y podman podman-compose

# Verificar instalación
podman --version
podman-compose --version

# Habilitar socket de Podman para el usuario
systemctl --user enable podman.socket
systemctl --user start podman.socket

# Configurar para que sobreviva reinicios
loginctl enable-linger $USER
```

**Primera ejecución del contenedor**:
```bash
cd /var/www/brajossoft

# Iniciar contenedores
podman-compose up -d

# Verificar que funcionan
podman-compose ps
podman-compose logs -f
```

**Configurar auto-inicio con systemd** (opcional):
```bash
# Generar servicio systemd
cd /var/www/brajossoft
podman generate systemd --new --name brajos-soft-web-1 --files

# Mover a systemd user
mkdir -p ~/.config/systemd/user/
mv container-brajos-soft-web-1.service ~/.config/systemd/user/

# Habilitar
systemctl --user daemon-reload
systemctl --user enable container-brajos-soft-web-1.service
systemctl --user start container-brajos-soft-web-1.service
```

## 📋 Verificar Configuración

### Prueba local de conexión SSH

```bash
ssh -i ~/.ssh/github_actions usuario@servidor "cd /var/www/brajossoft && pwd"
```

Debería mostrar: `/var/www/brajossoft`

### Probar despliegue

1. Haz un cambio pequeño en el código
2. Commit y push:
```bash
git add .
git commit -m "Test: nuevo pipeline CI/CD"
git push
```

3. Ve a GitHub → tu repositorio → **Actions**
4. Verás el pipeline ejecutándose con 4 fases:
   - ✅ Build & Test
   - ✅ Code Quality  
   - ✅ Docker Build
   - ✅ Deploy
   - ✅ Pipeline Summary

5. Click en el workflow para ver los logs en tiempo real de cada fase

### Branches y Tags

El pipeline se comporta diferente según el evento:

**Push a `main`**:
- ✅ Ejecuta todas las fases
- ✅ Build imagen con tag `latest` y SHA
- ✅ Push a GitHub Container Registry
- ✅ Deploy automático a producción

**Push a `dev` o `testqa`**:
- ✅ Ejecuta Build & Quality
- ✅ Build imagen con tag SHA
- ✅ Push a Registry
- ❌ NO despliega (solo main despliega)

**Pull Request**:
- ✅ Ejecuta Build & Quality
- ❌ NO build de imagen
- ❌ NO despliega

**Push de Tag (ej: v1.0.0)**:
```bash
git tag v1.0.0
git push origin v1.0.0
```
- ✅ Build imagen con tag `v1.0.0`, `latest` y SHA
- ✅ Deploy a producción

## 🔍 Troubleshooting

### Error: "Permission denied (publickey)"

**Causa**: La clave SSH no está configurada correctamente

**Solución**:
```bash
# Verificar en el servidor que la clave pública esté en authorized_keys
cat ~/.ssh/authorized_keys

# Verificar permisos
ch 🎯 Workflow Personalizado

### Ver imágenes publicadas

Todas las imágenes se publican en GitHub Container Registry:

```
https://github.com/TuUsuario/brajossoft/pkgs/container/brajossoft
```

Puedes ver:
- Tag `latest` (última versión de main)
- Tags por SHA (ej: `a1b2c3d4`)
- Tags de versión (ej: `v1.0.0`)

### Usar imagen publicada en otro servidor

```bash
# Login al registry
echo $GITHUB_TOKEN | podman login ghcr.io -u USERNAME --password-stdin

# Pull imagen
podman pull ghcr.io/tuusuario/brajossoft:latest

# Run
podman run -d -p 3001:3001 ghcr.io/tuusuario/brajossoft:latest
```

##mod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### Error: "sudo: no tty present and no askpass program specified"

**Causa**: El usuario no tiene permisos sudo sin contraseña

**Solución**: Configurar sudoers (ver Paso 4 arriba)

### Error: "npm: command not found"

**Causa**: Node.js no está en el PATH del usuario SSH

**Solución**: Agregar al `~/.bashrc` en el servidor:
```bash
export PATH="/usr/bin:/usr/local/bin:$PATH"
export NVM_DIR="build sin deploy automático, edita `.github/workflows/deploy.yml`:

```yaml
deploy:
  # ...
  if: github.event_name != 'pull_request' && github.ref == 'refs/heads/main' && false  # Agregar "&& false"
```

O comenta el job completo de `deploy`.

### Agregar environment de staging

Puedes crear un environment de staging en `.github/workflows/deploy.yml`:

```yaml
deploy-staging:
  name: 🧪 Deploy a Staging
  runs-on: ubuntu-latest
  needs: [docker-build]
  if: github.ref == 'refs/heads/dev'
  environment: staging
  
  steps:
    # Similar al deploy de producción pero con otro servidor
```

Luego configura secretos específicos para staging en GitHub.
**Solución**: Ver logs del workflow en GitHub Actions y logs del servidor:
```bash
# En el servidor
sudo journalctl -u brajossoft -n 50
```

## 🎯 Workflow Personalizado

Si necesitas modificar el workflow, edita [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

### Ejecutar manualmente

1. Ve a GitHub → Actions
2. Selecciona "Deploy to Server with Nginx"
3. Click en "Run workflow"
4. Selecciona la rama `main`
5. Click "Run workflow"

### Desactivar despliegue automático

Si solo quieres despliegue manual, edita `.github/workflows/deploy.yml`:

```yaml
on:
  # push:  # Comentar esta línea
  #   branches: ["main"]  # Comentar esta línea
  workflow_dispatch:  # Solo esto permite ejecución manual
```

## 📊 Monitoreo de Despliegues

### Ver historial de despliegues

1. GitHub → Actions
2. Historial completo con estados: ✅ Success, ❌ Failed, 🟡 In Progress

### Notificaciones

GitHub te enviará emails cuando:
- ❌ Un despliegue falla
- ✅ Un despliegue se completa (si está configurado)

### Configurar notificaciones de Slack/Discord (opcional)

Agrega al final de `.github/workflows/deploy.yml`:

```yaml
      - name: Notify deployment status
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 🔄 Rollback (Revertir Despliegue)

Si algo sale mal:

```bash
# En el servidor
cd /var/www/brajossoft
git log --oneline  # Ver commits
git reset --hard <commit-hash>  # Volver a commit anterior
npm install
npm run build
sudo systemctl restart brajossoft
```

O desde GitHub:
1. Find el commit que funcionaba
2. Revert el commit problemático
3. Push → GitHub Actions desplegará automáticamente

## ✅ Checklist de Configuración

- [ ] Clave SSH generada
- [ ] Clave pública copiada al servidor
- [ ] Conexión SSH verificada
- [ ] Secretos agregados en GitHub:
  - [ ] `SERVER_HOST`
  - [ ] `SERVER_USER`
  - [ ] `SERVER_PORT`
  - [ ] `SSH_PRIVATE_KEY`
- [ ] Permisos sudo configurados para systemctl
- [ ] Prueba de despliegue exitosa
- [ ] Workflow ejecutándose correctamente

## 🎉 ¡Listo!

Ahora cada push a `main` desplegará automáticamente tu sitio. 

**Flujo de trabajo**:
1. Hacer cambios en local
2. Commit y push a GitHub
3. GitHub Actions se ejecuta automáticamente
4. Código se despliega al servidor
5. Servicio se reinicia
6. ¡Sitio actualizado! 🚀
