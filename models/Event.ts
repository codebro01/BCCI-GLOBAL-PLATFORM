const { Schema, model } = require('mongoose');
const { nanoid:nanoidID } = require('nanoid')


const eventSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoidID(8), // override ObjectId
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Event name is required!'],
    },
    date: {
      type: String,
      required: [true, 'Event day is required!'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required!'],
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED'],
      default: 'PENDING',
    },
    // location: String,
    // region: String,
    // description: String,
    // type: String,
    // endTime: Date,
    // attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

const EventSchema = model('event', eventSchema);

module.exports = { EventSchema }