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
- Deployment - Docker images using Kubernetes
- In Built Load Balancer (LB)
- App Platform - Node.js
- Caching - Redis

## Architecture Description
In the architecture we tried to use the cloud providers built in capabilities where possible. For Google, this includes Redis service LB.  To provide a potentially scalable solution we can scale out each tier as required, but have not done this due to "free" cloud restrictions.

### Cloud Provider - Google Cloud Platform

### Deployment - Docker images using Kubernetes

Some description on how you created images and deployed using K8s.

### Load Balancer

How was this configured.

### App Platform - Node.js

How was the application developed.

### Caching - Redis

How Redis was used.

## API Contract

- Inputs
  - latitude   (origin)
  - longitude  (origin)
  - entity type
  - radius to search
- Output (Array of)
  - latitude of entity
  - longitude of entity
  - description of entity
  - distance from origin


Example JSON output:

```
[
  {
    "latitude": 123.12312323,
    "longitude": -123.1232333,
    "Joe's Diner",
    "400"
  },
  {
    "latitude": 123.1231455,
    "longitude": -123.123522,
    "Pizza Hut",
    "450"
  },
]
```


## Running the Demo

Access following URL..... blah
Jay, update the URL and the instructions how to run.

   [Application URL](http://www.oracle.com/)

## Source code

- [Docker Image](docker-image)

  Contains the docker image and instructions on how to deploy to Google Cloud.

- [Node Components](node-server)

  Contains the node components which provide both the API and Web App.


## Issues/ TODO

* Issue 1 - Description
* Issue 2 - Description
