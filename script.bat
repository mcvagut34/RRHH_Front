#!/bin/bash

# Archivo específico a excluir durante el merge (con ruta relativa)
EXCLUDED_FILE="src/router/index.js"

# Realizar un stash de los cambios locales en la rama de destino (main)
git stash

# Realizar el merge
git merge dev

# Aplicar los cambios locales nuevamente (sin aplicar los cambios del archivo específico)
git stash apply --index

# Deshacer los cambios del archivo específico en la rama de destino (main)
git checkout main

# Cherry-pick solo los cambios que no incluyen el archivo específico
git cherry-pick --no-commit dev
git reset

# Commit de los cambios en la rama de destino (main)
git commit -m "Merge de dev en main, excluyendo cambios en $EXCLUDED_FILE"
