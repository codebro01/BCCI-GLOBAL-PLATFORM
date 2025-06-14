import { Schema, model } from 'mongoose';

const cellSchema = new Schema({
  name: String,
  clusterId: { type: Schema.Types.ObjectId, ref: 'Cluster' },
  leaderId: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  maxCapacity: { type: Number, default: 10 },
  communicationTools: {
    chatId: String,
    announcementBoardId: String
  },
  location: String
}, { timestamps: true });

export default model('Cell', cellSchema);