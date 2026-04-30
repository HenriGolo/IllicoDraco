set -euo pipefail

# source comp.sh Annuaire
# cp Annuaire.war "$TOMCAT_HOME/webapps/."
cd backend
./mvnw package
cd -
cp backend/target/project-0.0.1-SNAPSHOT.war "$TOMCAT_HOME/webapps/IllicoDraco.war"
