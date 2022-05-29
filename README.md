# From Monolith to K8s :: API Gateway / FrontEnd

User facing component as it contains an API Gateway and the User Interface of the Conference Platform. 

## Build and Release

```
mvn package
```

```
docker build -t salaboy/fmtok8s-frontend:0.1.0
docker push salaboy/fmtok8s-frontend:0.1.0
```

```
cd charts/fmtok8s-frontend
helm package .
```

Copy tar to http://github.com/salaboy/helm and push

## Running the front end only

Install all deps with yarn, from inside the `frontend` directory:

```
yarn install
```

Start the application: 

```
yarn start
```


# CloudEvents Accepted for Tickets Flow

Cloud Event to Join the Queue

```
curl -X POST http://localhost:8080/default/default -H "Content-Type: application/json" -H "ce-type: Queue.CustomerJoined"  -H "ce-id: 123"  -H "ce-specversion: 1.0" -H "ce-source: curl-command" -d '{"sessionId" : "123" }'
```

Cloud Event received for Customer to Exit the Queue from Queue Service
```
curl -X POST http://localhost:8080/default/default -H "Content-Type: application/json" -H "ce-type: Queue.CustomerExited"  -H "ce-id: 123"  -H "ce-specversion: 1.0" -H "ce-source: curl-command" -d '{"sessionId" : "123" }'
```

