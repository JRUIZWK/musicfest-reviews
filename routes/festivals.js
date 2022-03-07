import { Router } from 'express'
import * as festivalCtrl from "../controllers/festivals.js"

const router = Router()

/* GET users listing. */
router.get('/new', festivalCtrl.new)

export {
  router
}