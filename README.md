# Pdf uploader

### Prerequisites
```
    node, mongoDB
```

### Usage
* Run `npm i` to install all the dependencies.
* Start mongoDB server.
* Add `.env` file to the root of this project with following configuration.
```
PORT=<Port of your choice>
ENV=<Environment development/production>
SECRET=<Some strong secret, a string>
ENABLE_ACCESS_LOGS=<Boolean true/false>
ENABLE_DEBUG_LOGS=<Boolean true/false>
MONGO_URI=<Mongo DB uri>
```
* Run `npm run dev` to run the server.

