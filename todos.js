'use strict';

const uuid = require('uuid'),
      moment = require('moment'),
      tableName = `${process.env.STAGE}-todos`;

module.exports.readAll = (db, callback) => {
  const params = {
    TableName: tableName
  };

  return db.scan(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, data.Items);
    }
  });
};

module.exports.readOne = (db, id, callback) => {
  const params = {
    TableName: tableName,
    Key: {
      id: id
    }
  };

  return db.get(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, data.Item);
    }
  });
};

module.exports.create = (db, item, callback) => {
  item.id = uuid.v1();
  item.updatedUtc = moment().utc().toISOString();

  const params = {
    TableName: tableName,
    Item: item
  };

  return db.put(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, params.Item);
    }
  });
};

module.exports.update = (db, id, item, callback) => {
  item.id = id;
  item.updatedAt = moment().utc().toISOString();

  const params = {
    TableName : tableName,
    Item: item
  };

  return db.put(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, params.Item);
    }
  });
};

module.exports.delete = (db, id, callback) => {
  const params = {
    TableName : tableName,
    Key: {
      id: id
    }
  };

  return db.delete(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, params.Key);
    }
  });
};
