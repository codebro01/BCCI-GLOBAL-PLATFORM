import { Schema, model } from 'mongoose';

const gamificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  earnedBadges: [String],
  unlockedFeatures: [String]
}, { timestamps: true });

export default model('Gamification', gamificationSchema);