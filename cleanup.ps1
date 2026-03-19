# Script de limpieza para eliminar archivos de Vite
Write-Host "Eliminando archivos innecesarios..." -ForegroundColor Yellow

# Archivos de Vite que ya no se necesitan
$filesToDelete = @(
    "index.html",
    "vite.config.js",
    "script.js",
    "styles.css"
)

# Carpetas que ya no se necesitan
$foldersToDelete = @(
    "src"
)

# Eliminar archivos
foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "[OK] Eliminado: $file" -ForegroundColor Green
    } else {
        Write-Host "[-] No existe: $file" -ForegroundColor Gray
    }
}

# Eliminar carpetas
foreach ($folder in $foldersToDelete) {
    if (Test-Path $folder) {
        Remove-Item $folder -Recurse -Force
        Write-Host "[OK] Eliminado: $folder\" -ForegroundColor Green
    } else {
        Write-Host "[-] No existe: $folder\" -ForegroundColor Gray
    }
}

# Eliminar archivo temporal si existe
if (Test-Path "styles\components.css") {
    Remove-Item "styles\components.css" -Force
    Write-Host "[OK] Eliminado: styles\components.css" -ForegroundColor Green
}

Write-Host ""
Write-Host "Limpieza completada!" -ForegroundColor Cyan
Write-Host "Carpetas del proyecto Next.js:" -ForegroundColor Yellow
Get-ChildItem -Directory | Where-Object { $_.Name -notin @('node_modules', '.next') } | Select-Object Name
