import express from 'express'
const router = express.Router()
import {
 
  getPartners,
  addFPartner,
  updatePartner,
  deletePartner,
  getPartnerById,
} from '../Controllers/partnerController.js'

// get my Film
router.get("/", getPartners)
router.get("/:id", getPartnerById);
// add Film
router.post("/", addFPartner)
//update Film
router.put("/:id", updatePartner)
//delete Film
router.delete("/:id", deletePartner)

export default router;