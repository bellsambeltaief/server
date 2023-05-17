import asyncHandler from "express-async-handler"
import Partner from '../Models/partnerModel.js'


const getPartners =async (req, res) => {
 try {
  const partners = await Partner.find()
 return res.status(200).json(partners)
 } catch (error) {
  return res.status(500).json(error)
 }
}

const getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: "¨Partner not found" });
    }
    return res.status(200).json(partner);
  } catch (error) {
    return res.status(500).json(error);
  }
};


const addFPartner = asyncHandler(async (req, res) => {
  const {firstName, lastName,email } = req.body;

  // Check if any required fields are missing
  if (!firstName || !lastName) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }


 

  // Create the film object
  const partner = await Partner.create({
   firstName,
   lastName,
   email,
  });

  res.status(201).json({
    success: true,
    data: partner
  });
});


const updatePartner = asyncHandler(async (req, res) => {
const partner = await Partner.findById(req.params.id)
if (!partner) {
   res.status(400)
  throw new Error("Tache not found")
  }
 const updatedpartner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
 })
 res.status(200).json(updatedpartner)
 })

const deletePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id)
  if (!partner) {
    res.status(400)
    throw new Error("Tache not found")
  }
  await partner.remove()
  res.status(200).json({ id: req.params.id })
})
export  {
  getPartners,
  addFPartner,
  updatePartner,
  deletePartner,
  getPartnerById,
}