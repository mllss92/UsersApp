const mongoose = require('mongoose');
const autoInc = require('mongoose-plugin-autoinc');

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: { type: String, required: true },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: Date,
  isAdmin: { type: Boolean, default: false },
  userRights: { type: Array, default: ['can_view_users'] }
});

UserSchema.plugin(autoInc.autoIncrement, {
  model: 'Users',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;