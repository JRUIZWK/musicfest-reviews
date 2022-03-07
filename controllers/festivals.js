import { Festival } from "../models/festival.js"

function newFestival (req, res) {
  res.render('festival/new')
}

export {
  newFestival as new

}