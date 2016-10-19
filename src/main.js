/* eslint-disable no-console */

import Promise from 'bluebird';
import mongoose, {Schema} from 'mongoose';

mongoose.Promise = Promise;


mongoose.connect('mongodb://localhost/hako');
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Could not connect to server:'));
connection.once('open', () => {
  console.log('Connected to mongo database.');
  const KittenSchema = new Schema({
    name: {type: String, index: {unique: true}},
    farts: {type: Number, default: 1}
  });
  const Kitten = mongoose.model('Kitten', KittenSchema);
  Kitten.on('index', (error) => {
    if (error) {
      console.log(`error indexing kittens: ${error}`);
      process.exit(1);
    }
    const silence = new Kitten({name: 'Silence'});
    silence.save().then(() => {
      console.log('saved');
      process.exit(0);
    })
    .catch((error2) => {
      console.log('could not save:');
      console.log(error2);
      process.exit(1);
    });
  });
});
