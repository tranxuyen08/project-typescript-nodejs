import express from 'express';
const routerUser = express.Router();
import { userControllerInstance } from '../controllers/useCtr'
import checkAuth from '../middlewares/checkAuth'
import { upload } from '../middlewares/upload.middleware';
import checkAuthentication from '../middlewares/checkAuth';

//drop collection
// router.get("/drop-collection", async (req, res, next) => {
//   try {
//     await dropCollection();
//     res.send("Đã drop collection thành công");
//   } catch (error) {
//     next(error);
//   }
// });


routerUser.post("/register", userControllerInstance.handleRegister);
routerUser.post("/login", userControllerInstance.handleLogin);
routerUser.post("/logout",checkAuthentication, userControllerInstance.logout);
routerUser.get("/", userControllerInstance.create);
routerUser.post("/refresh-token", userControllerInstance.refreshToken)

routerUser.get("/:id", userControllerInstance.handleGetUserId);
routerUser.patch('/update/:id', checkAuthentication ,userControllerInstance.handleUpdateUser)

routerUser.post('/upload-one/:id', upload.single("avatar"), userControllerInstance.handleUploadImage);


//upload image
// routerUser.post('/upload-one')
// routerUser.post('/upload-many')

export default routerUser;
