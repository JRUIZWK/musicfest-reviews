import mongoose from "mongoose";

const Schema = mongoose.Schema

const festivalSchema = new Schema({
  title: String,
  location: String,
  year: Number,
  wouldYouAttenedAgain: Boolean,
  comments: String,
  rating: {
    type: String,
    enum: ["1", "2", "3", "4", "5"]
  },
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Festival = mongoose.model('Festival', festivalSchema)

export {
  Festival
}