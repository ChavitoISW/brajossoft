#!/bin/bash

# Script para verificar qué contenedores serían afectados por el deployment
# Ejecutar en el servidor antes de hacer deployment

echo "🔍 Análisis de Contenedores en el Servidor"
echo "=========================================="
echo ""

# Mostrar TODOS los contenedores corriendo
echo "📦 Contenedores actualmente corriendo:"
podman ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
echo ""

# Mostrar contenedores del proyecto BraJos Soft que serían afectados
echo "🎯 Contenedores de BraJos Soft (serán afectados por deployment):"
BRAJOS_CONTAINERS=$(podman ps -a --filter "name=brajos-soft" --format "{{.Names}}")

if [ -n "$BRAJOS_CONTAINERS" ]; then
    for container in $BRAJOS_CONTAINERS; do
        echo "  ✓ $container (será detenido y eliminado)"
        podman inspect "$container" --format "    Puerto: {{range .NetworkSettings.Ports}}{{.}}{{end}}" 2>/dev/null || true
    done
else
    echo "  ℹ️  No hay contenedores de BraJos Soft corriendo"
fi

echo ""
echo "✅ Contenedores que NO serán afectados:"
podman ps --filter "name!=brajos-soft" --format "  ✓ {{.Names}} ({{.Image}})"

echo ""
echo "=========================================="
echo "ℹ️  El deployment solo afectará contenedores con 'brajos-soft' en el nombre"
