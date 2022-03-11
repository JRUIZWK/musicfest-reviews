import { Router } from 'express'
import * as festivalCtrl from "../controllers/festivals.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, festivalCtrl.index)
router.get('/new', isLoggedIn, festivalCtrl.new)
router.post('/', isLoggedIn, festivalCtrl.create)
router.get('/:id', isLoggedIn, festivalCtrl.show)
router.post('/:id/reviews', isLoggedIn, festivalCtrl.createReview)
router.get('/:id/edit', isLoggedIn, festivalCtrl.edit)
router.put('/:id', isLoggedIn, festivalCtrl.update)
router.delete('/:id', isLoggedIn, festivalCtrl.delete)

export {
  router
}