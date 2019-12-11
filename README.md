# temp-sensor-api
A simple API built with NodeJS and Express. Retrieve temperature data from DynamoDB.

## Requirements
- node
- docker

## Running Locally
### Setup
Install dependencies
```
npm install
```
Bring up the api and the local instance of dynamodb
```
docker-compose up --build
```
Ssh into the api container
```
docker exec -it api sh
```
Run the DB creation script
```
npm run create-db
```