const MongoClient = require('mongodb').MongoClient;

const state = {
 db: null
};

exports.connect = (url, done) => {
 if (state.db) {
  return done();
 }

 MongoClient.connect(url, {useNewUrlParser: true }, (err, db) => {
  if (err) {
   return done(err);
  }
  state.db = db.db('waves-task');
  done();
 })
};

exports.get = () => { return state.db };