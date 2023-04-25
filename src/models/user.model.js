import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 100,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 100,
    required: true
  },
  bio: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 500,
    required: true
  },
  nat: {
    type: String,
    minLength: 2,
    maxLength: 5,
    required: true
  },
  email: {
    type: String,
    match: /.*@.*\..*/,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: new Date()
  }
});

const User = mongoose.model('user', userSchema);

export { User };