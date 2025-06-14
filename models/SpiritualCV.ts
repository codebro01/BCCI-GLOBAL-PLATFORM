import { Schema, model } from 'mongoose';

const spiritualCVSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  rolesHeld: [{
    name: String,
    from: Date,
    to: Date
  }],
  testimonies: [{
    text: String,
    date: Date
  }],
  trainingsCompleted: [{ type: Schema.Types.ObjectId, ref: 'Training' }]
}, { timestamps: true });

export default model('SpiritualCV', spiritualCVSchema);