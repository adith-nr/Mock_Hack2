import express from 'express'
import { cropQueryController,diseaseQueryController,schemeQueryController } from '../controllers/prompt.controllers.js'
import { protectRoute } from '../middleware/protect.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post("/cropQuery",protectRoute,cropQueryController)
router.post("/schemeQuery",protectRoute,schemeQueryController)
router.post("/diseaseQuery",protectRoute,upload.single("image"),diseaseQueryController)

export default router