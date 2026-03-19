# GitHub Actions para BraJos Soft

Este proyecto usa GitHub Actions para despliegue automático a GitHub Pages.

## Configuración

1. **Habilitar GitHub Pages:**
   - Ve a Settings → Pages
   - Source: GitHub Actions

2. **Push automático:**
   ```bash
   git add .
   git commit -m "Configurar GitHub Actions"
   git push
   ```

3. **Ver el sitio:**
   - URL: https://chavitoISW.github.io/brajossoft/

## Comandos

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Exportar estático
npm run export
```

## Workflow

- ✅ Build automático en cada push a main
- ✅ Deploy automático a GitHub Pages
- ✅ Node.js 20
- ✅ Cache de dependencias npm
