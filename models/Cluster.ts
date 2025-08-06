
const { Schema, model } = require('mongoose')

const clusterSchema = new Schema(
  {
    clusterName: {
      type: String,
      required: [true, 'Cluster name is required'],
    },
    region: {
      type: String,
      required: [true, 'Cluster region is required'],
    },
    state: String,
    membershipTarget: String,
    cellTarget: String,
    country: String,
    clusterLeader: {
      type: String,
      ref: 'User',
      required: [true, 'Cluster leader is required'],
    },
    cells: [{ type: Schema.Types.ObjectId, ref: 'Cell' }],
    description: {
      type: String,
    },
    createdBy: {
      type: String,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const ClusterSchema =  model('Cluster', clusterSchema);
module.exports = {ClusterSchema}
export {};

