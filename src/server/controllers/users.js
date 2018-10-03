const Users = require('../models/users');

exports.getAll = (req, res) => {
 console.log(req);
 Users.getAll(req, (err, docs) => {
  if (err) {
   console.log(err);
   return res.send(err).status(500);
  }

  if (!docs.length) {
   return res.send({items: []}).status(200);
  }

  const { _id, ..._docs } = docs[0]
  return res.send(_docs).status(200);
 })
};

exports.add = (req, res) => {
 const { name, address } = req.body;
 const requiredFields = { name, address };
 let errors = {};

 Object.keys(requiredFields).map(key =>{
  if (!requiredFields[key]) {
   errors[key] = 'field is required'
  }
 });

 if (Object.keys(errors).length) {
  return res.status(400).send({errors});
 }

 Users.add({...req.body}, (err, result) => {
   if (err) {
    console.log(err);
    return res.status(500).send(err);
   }
   return res.status(200).send(result.ops[0]);
  })
};

exports.update = (req, res) => {
 const { name, address } = req.body;
 const requiredFields = { name, address };
 let errors = {};

 Object.keys(requiredFields).map(key =>{
  if (!requiredFields[key]) {
   errors[key] = 'field is required'
  }
 });

 if (Object.keys(errors).length) {
  return res.status(400).send({errors});
 }

 Users.update(req.params.id, {...req.body}, (err, result) => {
  if (err) {
   console.log(err);
   return res.status(500).send(err);
  }
  return res.status(200).send(result);
 })
};

exports.delete = (req, res) => {
 Users.delete(req.params.id, (err, result) => {
  if (err) {
   console.log(err);
   return res.status(500).send(err);
  }
  return res.status(200).send(result);
 })
};