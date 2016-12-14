# Welcome to the Locator-Service API

## Overview
The Locator-Service API is an endpoint that will allow you to provide a longitude, latitude, radius and entity type and will return a list of all those entity types within the radius from the location.

This API uses a 'Cache-Aside' pattern to return API data matching the query. E.g try to read the data from Redis and return directly if found.  If data is not present, then query the Google Maps API and then store result in Redis before returning result to the client.

We also built a small Web App to showcase this.

## Architecture Overview

We initially chose AWS as our cloud platform but as we had some issue installing/ configuring Kubernetes, we ended up switching to Google Cloud Platform which proved much easier.

The diagram below shows our overall architecture:

![Architecture](images/architecture.png)

## Technology Components

- Cloud Provider - Google Cloud Platform
- Deployment - Docker images via Kubernetes
- In Built Load Balancer (LB) from Google
- App Platform - Node.js
- Caching - Redis running on Google

## Architecture Description
In the architecture we tried to use the cloud providers built in capabilities where possible. For Google, this includes Redis service LB.  To provide a potentially scalable solution we can scale out each tier as required, but have not done this due to "free" cloud restrictions.




## Running the Demo

Access following URL..... blah
Jay, update the URL and the instructions how to run.

   [Application URL](http://www.oracle.com/)

## Source code

- [Docker Image](docker-image/README.md)

  Contains the docker image and instructions on how to deploy to Google Cloud.

- [Node Components](node-server/README.md)

  Contains the node components which provide both the API and Web App.


## Issues/ TODO

* asdasd
* asdasd  
