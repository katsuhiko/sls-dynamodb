'use strict';

const AWS = require('aws-sdk'),
      dynamoDb = new AWS.DynamoDB.DocumentClient(),
      env = require('dotenv').config(),
      todos = require('./todos.js');

const createResponse = (statusCode, body) => (
  {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(body),
  }
);

module.exports.todosReadAll = (event, context, callback) => {
  todos.readAll(dynamoDb, (err, result) => {
    if (err) {
      callback(createResponse(500, { message: err.message }));
    } else {
      callback(null, createResponse(200, result));
    }
  });
};

module.exports.todosReadOne = (event, context, callback) => {
  const id = event.pathParameters.id;

  todos.readOne(dynamoDb, id, (err, result) => {
    if (err) {
      callback(createResponse(500, { message: err.message }));
    }  else if (!result) {
      callback(null, createResponse(404, { message: 'not found'}));
    } else {
      callback(null, createResponse(200, result));
    }
  });
};

module.exports.todosCreate = (event, context, callback) => {
  const data = JSON.parse(event.body);

  todos.create(dynamoDb, data, (err, result) => {
    if (err) {
      callback(createResponse(500, { message: err.message }));
    } else {
      callback(null, createResponse(201, result));
    }
  });
};

module.exports.todosUpdate = (event, context, callback) => {
  const id = event.pathParameters.id,
        data = JSON.parse(event.body);

  todos.update(dynamoDb, id, data, (err, result) => {
    if (err) {
      callback(createResponse(500, { message: err.message }));
    } else {
      callback(null, createResponse(200, result));
    }
  });
};

module.exports.todosDelete = (event, context, callback) => {
  const id = event.pathParameters.id;

  todos.delete(dynamoDb, id, (err, result) => {
    if (err) {
      callback(createResponse(500, { message: err.message }));
    } else {
      callback(null, createResponse(204));
    }
  });
};
