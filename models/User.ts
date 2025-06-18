import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String, 
    required: true, 
  }, 
  surname: {
    type: String, 
    required: true, 
  }, 
  otherNames: {
    type: String, 
    required: true, 
  }, 
  email: { type: String, unique: true },
  phone: String,
  password: String,
  roles: {
    type: Array, 
    required: true, 
  },
  location: {
    country: String,
    state: String,
    city: String
  },
  clusterId: { type: Types.ObjectId, ref: 'Cluster' },
  cellId: { type: Types.ObjectId, ref: 'Cell' },
  spiritualGoals: [{
    goalName: String,
    status: String,
    progress: Number
  }],
  ministryInterests: [String],
  bookmarks: [Schema.Types.ObjectId],
  contributionHistory: [{
    type: String,
    date: Date,
    value: Number
  }],
  growthPoints: Number,
  badges: [String],
  serviceCV: { type: Types.ObjectId, ref: 'SpiritualCV' }
}, { timestamps: true });

const User =  model('User', userSchema);

module.exports = {User}