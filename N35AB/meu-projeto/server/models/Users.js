// server/models/users.js
import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({},{ collection: 'users'});

export default mongoose.connection.useDb('sample_mflix').model('Users', usersSchema);
