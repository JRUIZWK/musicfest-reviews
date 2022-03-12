import { Router } from 'express'
import * as festivalsCtrl from '../controllers/festivals.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', festivalsCtrl.index)
router.get('/new', isLoggedIn, festivalsCtrl.new)
router.get('/:id', festivalsCtrl.show)
router.get('/:id/edit', isLoggedIn, festivalsCtrl.edit)
router.post('/', isLoggedIn, festivalsCtrl.create)
router.post('/:id/reviews', isLoggedIn, festivalsCtrl.createReview)
router.put('/:id', isLoggedIn, festivalsCtrl.update)
router.delete('/:id', isLoggedIn, festivalsCtrl.delete)
router.delete('/:id/reviews/:reviewId', isLoggedIn, festivalsCtrl.deleteReview)

export {
  router
}