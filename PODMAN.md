# BraJos Soft - Guía de Podman

## 🐋 Comandos con Podman

### Desarrollo
```bash
# Build de desarrollo
podman-compose -f docker-compose.dev.yml build

# Iniciar desarrollo
podman-compose -f docker-compose.dev.yml up

# En segundo plano
podman-compose -f docker-compose.dev.yml up -d

# Ver logs
podman-compose -f docker-compose.dev.yml logs -f

# Detener
podman-compose -f docker-compose.dev.yml down
```

### Producción
```bash
# Build de producción
podman-compose build

# Iniciar producción
podman-compose up -d

# Ver logs
podman-compose logs -f

# Detener
podman-compose down
```

### Comandos Podman directos
```bash
# Build
podman build -t brajos-soft .

# Run
podman run -d -p 3001:3001 --name brajos-soft-web brajos-soft

# Ver contenedores
podman ps

# Ver logs
podman logs brajos-soft-web

# Detener
podman stop brajos-soft-web

# Eliminar
podman rm brajos-soft-web

# Eliminar imagen
podman rmi brajos-soft
```

### Limpiar todo
```bash
# Detener todos los contenedores
podman stop $(podman ps -aq)

# Eliminar todos los contenedores
podman rm $(podman ps -aq)

# Eliminar todas las imágenes
podman rmi $(podman images -q)

# Limpiar volúmenes
podman volume prune
```

## 🔧 Alternativa sin compose

Si no tienes `podman-compose`, usa Podman directamente:

```bash
# Build
podman build -t brajos-soft:latest .

# Run
podman run -d \
  --name brajos-soft \
  -p 3001:3001 \
  -e NODE_ENV=production \
  brajos-soft:latest

# Desarrollo con volúmenes
podman run -d \
  --name brajos-soft-dev \
  -p 3001:3001 \
  -v $(pwd):/app:Z \
  -v /app/node_modules \
  -e NODE_ENV=development \
  brajos-soft:dev
```

## 📝 Notas

- Podman no requiere daemon (rootless por defecto)
- Compatible con Dockerfile y docker-compose
- Mejor seguridad que Docker
- Comandos idénticos a Docker
