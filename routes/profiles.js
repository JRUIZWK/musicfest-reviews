import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

import { isLoggedIn } from '../middleware/middleware.js'

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)

export {
  router
}