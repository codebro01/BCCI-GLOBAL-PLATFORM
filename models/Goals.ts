const {nanoid} = require('nanoid');
const mongoose = require('mongoose');


const goalSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(8), // override ObjectId
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'PRAYER_AND_DEVOTION',
        'BIBLE_STUDY',
        'EVANGELISM',
        'MINISTRY_SERVICE',
        'CHURCH_ATTENDANCE',
      ],
    },
    target: {
      type: String, // could be numeric or more structured if needed
      default: '',
    },
    timeFrame: {
      type: String,
      required: true,
      enum: [
        'ONE_WEEK',
        'TWO_WEEKS',
        'THREE_WEEKS',
        'ONE_MONTH',
        'TWO_MONTHS',
        'THREE_MONTHS',
        'SIX_MONTHS',
        'ONE_YEAR',
        'TWO_YEARS',
      ],
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Goal = mongoose.model('Goal', goalSchema)

module.exports = { Goal }
