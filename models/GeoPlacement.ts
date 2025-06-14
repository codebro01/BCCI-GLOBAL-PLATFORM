import { Schema, model } from 'mongoose';

const geoPlacementSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  location: {
    lat: Number,
    lng: Number
  },
  matchedCluster: String,
  matchedCell: String,
  assignedAt: Date
}, { timestamps: true });

export default model('GeoPlacement', geoPlacementSchema);