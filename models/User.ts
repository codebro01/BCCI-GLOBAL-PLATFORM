import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: String,
  passwordHash: String,
  roles: [String],
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

export default model('User', userSchema);