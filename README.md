# CustomerDetailsMapp

This project is developed using Angular10.0.1, Express 4.17.1 and Mongoose 5.10.8.

## Prerequisite

Node and MongoDb must be up and running in the local machine.

## Install Dependency

Run `npm install --save` in the root folder and also in the "server" folder to install all the dependencies.

## Upload default data (Optional)

Run `mongoimport --db customer-details-mapp --collection customers --drop --file ~/path/to/file/customers-sample.json --jsonArray`.

## Run Application

Run `ng serve` and `nodemon` on the root server. application will be running on `http://localhost:4200`.

## Note:

Before running the application must create database "customer-details-mapp" and collection name "customers"
