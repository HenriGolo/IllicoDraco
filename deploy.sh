#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

# Nettoyage
rm "$TOMCAT_HOME/webapps/IllicoDraco.war" || true
rm -fr "$TOMCAT_HOME/webapps/IllicoDraco" || true

# Backend
cd backend
./mvnw clean package
cd -
cp backend/target/project-0.0.1-SNAPSHOT.war IllicoDraco.war
# Rajout du frontend dans le WAR
jar uf IllicoDraco.war -C frontend .
cp IllicoDraco.war "$TOMCAT_HOME/webapps/"
# Lancement du serveur Tomcat
exec "$TOMCAT_HOME/bin/startup.sh"
