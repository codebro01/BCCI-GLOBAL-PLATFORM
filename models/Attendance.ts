import { Schema, model } from 'mongoose';

const attendanceSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  cellId: { type: Schema.Types.ObjectId, ref: 'Cell' },
  date: Date,
  status: { type: String, enum: ['present', 'absent', 'late'] },
  type: String
}, { timestamps: true });

export default model('Attendance', attendanceSchema);