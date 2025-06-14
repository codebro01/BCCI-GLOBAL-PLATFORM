import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  title: String,
  description: String,
  type: String,
  startTime: Date,
  endTime: Date,
  location: String,
  region: String,
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default model('Event', eventSchema);