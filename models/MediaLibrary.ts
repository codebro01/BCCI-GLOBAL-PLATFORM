import { Schema, model } from 'mongoose';

const mediaLibrarySchema = new Schema({
  title: String,
  type: { type: String, enum: ['video', 'audio'] },
  url: String,
  thumbnail: String,
  tags: [String],
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  region: String,
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default model('MediaLibrary', mediaLibrarySchema);