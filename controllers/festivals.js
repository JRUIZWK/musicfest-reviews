import { Festival } from '../models/festival.js'
import { Profile } from '../models/profile.js'

function index(req, res) {
  Festival.find({})
  .then(festivals => {
    res.render('festivals/index', {
      festivals,
      title: "Festivals"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/festivals")
  })
}

function newFestival(req, res){
  res.render('festivals/new', {
    title: "Add Festival"
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
	req.body.wouldYouAttendAgain = !!req.body.wouldYouAttendAgain
  Festival.create(req.body)
  .then(festival => {
    Profile.findById(req.user.profile._id)
    .then( profile => {
      profile.festival.push(festival._id)
      profile.save()
      res.redirect(`/festivals/${festival._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/festivals')
  })
}

function show(req, res) {
  Festival.findById(req.params.id)
  .populate("owner")
  .populate({path: "reviews.owner"})
  .then(festival => {
    res.render('festivals/show', {
      festival,
      title: "All Festival"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/festivals')
  })
}

function edit(req, res) {
  Festival.findById(req.params.id)
  .then(festival => {
    res.render('festivals/edit', {
      festival,
      title: "Edit Festival"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/festivals')
  })
}

function update(req, res) {
  Festival.findById(req.params.id)
  .then(festival => {
    if (festival.owner.equals(req.user.profile._id)) {
      req.body.wouldYouAttendAgain = !!req.body.wouldYouAttendAgain
      festival.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/festivals/${festival._id}`)
      })
    } else {
      throw new Error ('Access Denied')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/festivals`)
  })
}

function deleteFestival(req, res) {
  Festival.findById(req.params.id)
  .then(festival => {
    if (festival.owner.equals(req.user.profile._id)) {
      festival.delete()
      .then(() => {
        res.redirect('/festivals')
      })
    } else {
      throw new Error ('Access Denied')
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect('/festivals')
  })
}

function createReview(req, res) {
  req.body.owner = req.user.profile._id
  Festival.findById(req.params.id, function(err, festival) {
    festival.reviews.push(req.body)
    festival.save(function(err) {
      res.redirect(`/festivals/${festival._id}`)
    })
  })
}

function deleteReview(req, res) {
  Festival.findById(req.params.id)
  .then(festival => {
    if (festival.owner.equals(req.user.profile._id)) {
      festival.reviews.id(req.params.reviewId).remove()
      festival.save(function(err){
        res.redirect(`/festivals/${festival._id}`)
      })
      console.log(festival.reviews);
    } else {
      throw new Error ('Access Denied')
    }   
  })
  
  
}

export {
  index,
  newFestival as new,
  create,
  show,
  edit,
  update,
  deleteFestival as delete,
  createReview,
  deleteReview
}