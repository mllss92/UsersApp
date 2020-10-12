const mongoose = require('mongoose');
const autoInc = require('mongoose-plugin-autoinc');

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: Date
});

UserSchema.plugin(autoInc.autoIncrement, {
  model: 'Users',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;