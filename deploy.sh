set -euo pipefail

cd "$(dirname "$0")"

# Frontend
source comp.sh frontend
cp frontend.war "$TOMCAT_HOME/webapps/IDFront.war"
# Backend
cd backend
./mvnw package
cd -
cp backend/target/project-0.0.1-SNAPSHOT.war "$TOMCAT_HOME/webapps/IllicoDraco.war"
exec "$TOMCAT_HOME/bin/startup.sh"
