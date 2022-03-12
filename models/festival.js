import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 1},
  wouldYouAttendAgain: Boolean,
  reviewer: String,
  owner: {
    type: Schema.Types.ObjectId, ref: "Profile"
  },
}, {
  timestamps: true
})

const festivalSchema = new Schema({
  name: String,
  location: String,
  year: Number,
  owner: {
    type: Schema.Types.ObjectId, ref: "Profile"
  },
  reviews: [reviewSchema],
})

const Festival = mongoose.model('Festival', festivalSchema)

export {
  Festival
}