import { Schema, model } from 'mongoose';

const learningPathSchema = new Schema({
  title: String,
  steps: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  type: String,
  progressPerUser: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    step: Number,
    status: String
  }]
}, { timestamps: true });

export default model('LearningPath', learningPathSchema);