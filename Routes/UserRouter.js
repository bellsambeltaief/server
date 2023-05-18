import express from 'express'
import { changeUserPassword, deleteUser, deleteUserProfile,logoutUser, getUsers, loginUser, registerUser, updateUserProfile } from '../Controllers/UserController.js';
import { protect,admin } from '../Midllewares/Auth.js';

const router = express.Router();

router.post("/signup",registerUser);
router.post("/login",loginUser);
router.post('/logout',protect, logoutUser);

router.put("/",protect,updateUserProfile);
router.delete("/",protect,deleteUserProfile);

router.put("/password",protect,changeUserPassword);

router.get("/",protect,admin, getUsers);
router.delete("/:id",protect,admin, deleteUser);

export default router;