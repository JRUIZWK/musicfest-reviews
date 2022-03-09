import mongoose from "mongoose";

const Schema = mongoose.Schema

const festivalSchema = new Schema({
  title: String,
  location: String,
  year: Number,
  wouldYouAttenedAgain: Boolean,
  comments: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Festival = mongoose.model('Festival', festivalSchema)

export {
  Festival
}
