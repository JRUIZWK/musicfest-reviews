import mongoose from "mongoose";

const Schema = mongoose.Schema

const festivalSchema = new Schema({
  title: String,
  location: String,
  year: Number,
  wouldYouAttenedAgain: Boolean,
  comments: String
})

const Festival = mongoose.model('Festival', festivalSchema)

export {
  Festival
}
