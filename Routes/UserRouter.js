import express from 'express'
import { changeUserPassword, deleteUser, deleteUserProfile, getUsers, loginUser,
     registerUser, updateUser, updateUserProfile ,getUsersCount} from '../Controllers/UserController.js';
import { protect,admin } from '../Midllewares/Auth.js';

const router = express.Router();

router.post("/",registerUser);
router.post("/login",loginUser);

router.put("/",protect,updateUserProfile);
router.delete("/",protect,deleteUserProfile);

router.put("/password",protect,changeUserPassword);
router.put("/:id", updateUser);
router.get("/count", getUsersCount);
router.get("/",protect,admin, getUsers);
router.delete("/:id",protect,admin, deleteUser);

export default router;