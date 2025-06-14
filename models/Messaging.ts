import { Schema, model } from 'mongoose';

const messagingSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  threadId: String,
  sentAt: Date,
  readAt: Date
}, { timestamps: true });

export default model('Message', messagingSchema);