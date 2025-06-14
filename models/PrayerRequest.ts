import { Schema, model } from 'mongoose';

const prayerRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  message: String,
  submittedAt: Date,
  assignedLeaderId: { type: Schema.Types.ObjectId, ref: 'User' },
  status: String
}, { timestamps: true });

export default model('PrayerRequest', prayerRequestSchema);