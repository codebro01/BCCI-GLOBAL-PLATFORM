import { Schema, model, Types } from 'mongoose';
const bcryptjs = require('bcryptjs');
const {nanoid} = require('nanoid');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(8), // override ObjectId
    },
    firstName: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    otherNames: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true },
    phone: String,
    password: {
      type: String, 
      required: true
    },
    roles: {
      type: Array,
      required: true,
    },
    location: {
      country: String,
      state: String,
      city: String,
    },
    clusterId: { type: Types.ObjectId, ref: 'Cluster' },
    cellId: { type: Types.ObjectId, ref: 'Cell' },
    spiritualGoals: [
      {
        goalName: String,
        status: String,
        progress: Number,
      },
    ],
    ministryInterests: [String],
    bookmarks: [Schema.Types.ObjectId],
    contributionHistory: [
      {
        type: String,
        date: Date,
        value: Number,
      },
    ],
    growthPoints: Number,
    badges: [String],
    serviceCV: { type: Types.ObjectId, ref: 'SpiritualCV' },
    refreshToken: {
      type: String, 
    }
  },
  { timestamps: true }
)


userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
  }
  if(this.isModified('refreshToken')) {
    const salt = await bcryptjs.genSalt(10)
    this.refreshToken = await bcryptjs.hash(this.refreshToken, salt)
  }
})

userSchema.methods.comparePwd = async function (userPwd: string) {
  const compare = bcryptjs.compare(userPwd, this.password)
  return compare
}
userSchema.methods.compareRefreshToken = async function (refreshToken: string) {
  const compare = bcryptjs.compare(refreshToken, this.refreshToken);
  return compare
}

const User =  model('User', userSchema);

module.exports = {User}