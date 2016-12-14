Have attached the Dockerfile and server.js files. 
Command to create docker image is --

```
docker build -t gcr.io/$PROJECT_ID/hello-node:v1 .
```

Command to run the image locally:

```
docker run -d -p 8080:8080 --name hello_tutorial gcr.io/$PROJECT_ID/hello-node:v1
```

here $PROJECT_ID is google project id and registy gcr.io is google registry.

Not sure how it will work when run from your machines.

So we can continue to use mic2 docker registry only with PROJECT_ID as mic.

Will figure out a better way to deal with this problem.

Regards,
Harsha
