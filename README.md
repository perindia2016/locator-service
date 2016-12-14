# Welcome to the Locator-Service API

## Overview
The Locator-Service API is an endpoint that will allow you to provide a longitude, latitude, radius and entity type and will return a list of all those entity types within the radius from the location.

## Architecture Overview

We initially chose AWS as our cloud platform but as we had some issue installing/ configuring Kubernetes, we ended up switching to Google Cloud Platform which proved much easier.

The diagram below shows our overall architecture:

![Architecture](images/architecture.png)

## Technology Components

- Cloud Provider - Google Cloud Platform
- Deployment - Docker images via Kubernetes
- App Platform - Node.js
- Caching - Redis running on Google

## Architecture Description


## Running the Demo
