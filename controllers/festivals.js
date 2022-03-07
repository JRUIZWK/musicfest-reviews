import { Festival } from "../models/festival.js"

function newFestival(req, res) {
  res.render('festivals/new')
}

function create(req, res) {
  req.body.wouldYouAttenedAgain = !!req.body.wouldYouAttenedAgain
  Festival.create(req.body, function(err, festival) {
    if (err) return res.redirect('/festivals/new')
    res.redirect('/festivals/new')
  })
}

export {
  newFestival as new,
  create
}