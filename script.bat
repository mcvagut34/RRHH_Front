:: Archivos específicos a excluir durante el merge (con rutas relativas)
set EXCLUDED_FILES=src\router\index.js

:: Realizar checkout de los archivos específicos desde la rama de destino (main)
for %%F in (%EXCLUDED_FILES%) do git checkout main -- "%%F"

:: Realizar el merge
git merge dev

:: Restaurar el estado de los archivos específicos en la rama de destino (main)
for %%F in (%EXCLUDED_FILES%) do git checkout dev -- "%%F"

:: Commit de los cambios en la rama de destino (main)
git commit -m "Merge de dev en main, excluyendo cambios en %EXCLUDED_FILES%"
