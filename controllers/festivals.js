import { Festival } from "../models/festival.js"

function index(req, res) {
  Festival.find({}, function(err, festivals) {
    res.render('festivals/index', {
      festivals,
      err,
      title: 'All Festivals'
    })
  })
}

function newFestival(req, res) {
  res.render('festivals/new', {
    title: 'Add a Review',
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Festival.create(req.body)
  .then(festival => {
    res.redirect('/festivals')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/festivals/new')
  })
}

function show(req, res) {
  Festival.findById(req.params.id)
  .populate('owner')
  .then(festival => {
    res.render('festivals/show', {
      festival,
      title: 'Details'
    })
  })
}

function createReview(req, res) {
  Festival.findById(req.params.id)
  .then(festival => {
    festival.reviews.push(req.body)
    festival.save()
    .then(()=>{
      res.redirect(`/festivals/${festival._id}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
}

function edit(req, res) {
  Festival.findById(req.params.id)
  .then(festival => {
    res.render('festivals/edit', {
      festival,
      title: 'Edit'
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
      festival.updateOne(req.body, {new: true})
      .then(()=> {
        res.redirect(`/festivals/${festival._id}`)
      })
    } else {
      throw new Error ('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/festivals')
  })
}

function deleteFestival(req, res) {
  Festival.findById(req.params.id)
  .then(festival => {
    if(festival.owner.equals(req.user.profile._id)) {
      festival.delete()
      .then(() => {
        res.redirect('/festivals')
      })
    } else {
      throw new Error ('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/festivals')
  })
}

export {
  newFestival as new,
  create,
  index,
  show,
  createReview,
  deleteFestival as delete,
  edit,
  update,
}