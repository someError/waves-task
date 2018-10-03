const db = require('../db');
const objectId = require('mongodb').ObjectID

exports.getAll = (req, callback) => {
 const pipeline = [
  { $match: {} },
  { $sort: { "_id": -1 } },
  { $group: {_id: null, items: { $push: "$$ROOT" }, total: { $sum: 1 } } },
  {$project: {
   total: 1,
   items: '$items'
  }}
 ];


 db.get().collection('users').aggregate(pipeline).toArray((err, docs) => {
  callback(err, docs)
 });
};

exports.findById = (id, callback) => {
 db.get().collection('users').find({id}).sort({_id: -1}).toArray((err, docs) => {
  callback(err, docs)
 });
};

exports.add = (user, callback) => {
 db.get().collection('users').insert(user, (err, res) => {
  callback(err, res)
 })
};

exports.update = (id, user, callback) => {
 db.get().collection('users').update({_id: objectId(id)}, user, (err, res) => {
  callback(err, res)
 })
};

exports.delete = (id, callback) => {
 db.get().collection('users').remove({_id: objectId(id)}, (err, res) => {
  callback(err, res)
 })
};