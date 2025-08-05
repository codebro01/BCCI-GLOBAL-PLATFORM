const  mongoose =  require('mongoose')

const { Schema, model, Types } = mongoose


const MinistryInvolvementSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      default: null,
    },
    achievement: {
      type: String,
      default: '',
    },
    role: {
      type: [
        {
          type: String,
          enum: [
            'YOUTH_MINISTRY_LEADER',
            'WORSHIP_TEAM_MEMBER',
            'CELL_GROUP_MEMBER',
            'USHER',
            'MEDIA_TEAM',
            'TECH_SUPPORT',
            'OTHER',
          ],
        },
      ],
      required: true,
    }
  },
  { timestamps: true }
)

const ministryInvolvement =  model('MinistryInvolvement', MinistryInvolvementSchema);

module.exports = {ministryInvolvement};
export {} // This export is only to fix typescript scope issue, so its not really exporting anything. 

