Install dependencies and build the app for production
```
npm install
npm run build
npm run start
```

Build the image and run as container
```
docker build -t finance-operations-manager-main-main .
docker run --name finance-operations-manager-main-main_container -p 3000:3000 finance-operations-manager-main-main
```

CICDCD in Docker environment

Require :
- Docker Engine instal

If not already done start an instance of jenkins_master
```
docker run --name jenkins -p <choose_a_port>:8080 jenkins/jenkins
```

Then build and start an instance of a jenkins_agent
If your are on Windows, execute this command in Powershell or cmd
```
cd Jenkins-agent
docker build -t jenkins-agent-with-docker-and-node-finance-operations-manager-main-main .
docker run --init --name jenkins_agent_node -v /var/run/docker.sock:/var/run/docker.sock jenkins-agent-with-docker-and-node -url http://172.17.0.2:8080 8e6b5b1eca5e72e054864f966924131a03198c39ce7aa97aa6fc9dbdb2568200 finance-operations-managemer-main-main
```

Want to try the entire CICD on your own repository and registry ?