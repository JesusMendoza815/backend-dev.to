import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
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
    default: "404 bio not found"
  },
  nat: {
    type: String,
    minLength: 2,
    maxLength: 5
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

const User = mongoose.model('users', userSchema);

export { User };