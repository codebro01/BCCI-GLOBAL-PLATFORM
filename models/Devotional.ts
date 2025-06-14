import { Schema, model } from 'mongoose';

const devotionalSchema = new Schema({
  title: String,
  body: String,
  category: String,
  tags: [String],
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  likes: Number,
  bookmarkedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default model('Devotional', devotionalSchema);