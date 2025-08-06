const { Schema, model } = require('mongoose')

const cellSchema = new Schema(
  {
    cellName: {type: String, requied: [true, 'Cell name is required']},
    cellType: String,
    meetingLocation: String,
    meetingTime: String,
    cluster: { type: Schema.Types.ObjectId, ref: 'Cluster' },
    membershipTarget: Number,
    monthlyBudget: Number,
    createdBy: {
      type: String,
      ref: 'User',
    },
    cellLeader: { type: String, ref: 'User', required: [true, 'Cell Leader is required'] },
    members: [{ type:String, ref: 'User' }],
    maxCapacity: { type: Number, default: 10 },
    communicationTools: {
      chatId: String,
      announcementBoardId: String,
    },
    location: String,
  },
  { timestamps: true }
)

const CellSchema = model('Cell', cellSchema)
module.exports = {CellSchema}
export {}
