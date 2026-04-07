# Setup

Installe toutes les libs en local, besoin de le faire une seule fois.
Normalement déjà fait sur les machines de l'école.
```bash
cd backend
for f in lib/*.jar; do
mvn install:install-file \
-Dfile="$f" \
-DgroupId=local.lib \
-DartifactId="$(basename "$f" .jar)" \
-Dversion=1.0.0 \
-Dpackaging=jar
done
```
