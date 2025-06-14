import { Schema, model } from 'mongoose';

const clusterSchema = new Schema({
  name: String,
  region: String,
  state: String,
  country: String,
  leaderId: { type: Schema.Types.ObjectId, ref: 'User' },
  cellGroups: [{ type: Schema.Types.ObjectId, ref: 'Cell' }]
}, { timestamps: true });

export default model('Cluster', clusterSchema);