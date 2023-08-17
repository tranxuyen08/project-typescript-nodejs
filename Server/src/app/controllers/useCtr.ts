import User from "../models/user.model";
import jwt from "jsonwebtoken";
// import path from "path";
import bcrypt from "bcryptjs";
import sendRegistrationEmail from "../utils/mailler.utils";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { upload } from "../middlewares/upload.middleware";
import { AnyCnameRecord } from "dns";
import sceret from "../../configs/jwtConfigs";

// type DestinationCallback = (error: Error | null, destination: string) => void;
// type FileNameCallback = (error: Error | null, filename: string) => void;

// export const fileStorage = multer.diskStorage({
//   destination: (
//     request: Request,
//     file: Express.Multer.File,
//     cb: DestinationCallback
//   ): void => {
//     cb(null, "./public/images");
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: FileNameCallback
//   ): void => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// export const fileFilter = (
//   request: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ): void => {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: fileStorage,
//   fileFilter: fileFilter,
// }).single("avatar");
interface RefreshTokenData {
  userId: string;
  refreshToken: string;
}
let refreshTokenArr: any[] = [];

class UserController {
  async handleUploadImage(req: Request, res: Response) {

    try {
      if (req.file) {
        const user = await User.findById(req.params.id);
        console.log(111, user);
        if (user) {
          user.avatar =
            "http://localhost:8000/images/" + req.file.filename!;

          await user.save();
          res.status(200).json({ data: user });
        } else {
          res.status(404).json({ msg: "User not found" });
        }
      } else {
        res.status(400).json({ msg: "No image selected" });
      }
    } catch (err) {
      console.log(11111111, req.params);

      console.error("Error handling upload image:", err);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  async handleRegister(req: Request, res: Response): Promise<any> {
    const { firstName, lastName, email, password } = req.body;
    try {
      // Kiểm tra email đã tồn tại chưa
      const user = await User.findOne({ email });
      // Nếu email đã tồn tại, báo lỗi
      if (user) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      // Trường hợp email chưa tồn tại
      const saltRounds = 10; // Độ an toàn mã hóa của password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa password
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await newUser.save(); // Lưu dữ liệu
      await sendRegistrationEmail(newUser);

      return res.status(200).json({ msg: "Register Successfully" });
    } catch (error) {
      // Lỗi server
      console.error("Error handling register:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async handleLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched) {
          const accessToken = jwt.sign({ userId: user._id }, sceret.secretKey, {
            expiresIn: "1d",
          });
          const refreshToken = jwt.sign(
            { userId: user._id },
            sceret.sceretKeyRefresh,
            { expiresIn: "365d" }
          );
          // Thêm refreshToken vào mảng refreshTokenArr
          refreshTokenArr.push(refreshToken);
          const { password: _, ...userData } = user.toObject();
          // Đặt cookie refreshToken
          console.log("first",refreshToken)
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none", // Hoặc sameSite: "strict" hoặc không sử dụng sameSite
            secure: true
          });

          res.status(200).json({
            data: userData,
            accessToken,
          });
        } else {
          res.status(401).json({ msg: "Incorrect password" });
        }
      } else {
        res.status(401).json({ msg: "Email does not exist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  async handleUpdateUser(req: Request, res: Response) {
    // upload(req, res, async (err): Promise<any> => {
    //   if (err instanceof multer.MulterError) {
    //     console.log(err);
    //      res.status(500).json({ msg: "Error uploading image" });
    //   } else if (err) {
    //     console.log(err);
    //      res.status(500).json({ msg: err.message });
    //   }
    // });
    const {
      firstName,
      lastName,
      email,
      password,
      role_admin,
      role_active,
      role_subscription,
      avatar
    } = req.body;
    try {
      const updatedUser: any = await User.findByIdAndUpdate(
        req.params.id,
        {
          firstName,
          lastName,
          email,
          password,
          role_admin,
          role_subscription,
          role_active,
          avatar,
        },
        { new: true }
      );
      return updatedUser
        ? res.status(200).json({ data: updatedUser })
        : res.status(404).json({ msg: "Không tìm thấy người dùng" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Lỗi server" });
    }
  }
  // [GET] /create
  create(_req: Request, res: Response, next: NextFunction) {
    User.find({})
      .lean()
      .then((users) => res.json({ users }))
      .catch(next);
  }
  async handleGetUserId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await User.findById(id as any);
      if (user) {
        res.json({ user });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      console.error("Error handling get user by ID:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken");
    refreshTokenArr = refreshTokenArr.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logout successfully");
  }
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken; // Lưu ý nhớ cài đặt cookie-parser
    console.log("refreshToken",refreshToken)
    if (!refreshToken) res.status(401).json("Unauthenticated");
    if (!refreshTokenArr.includes(refreshToken)) {
      return res.status(401).json("Unauthenticated");
    }
    jwt.verify(refreshToken, sceret.sceretKeyRefresh, (err: any, user: any) => {
      if (err) {
        return res.status(400).json("refreshToken is not valid");
      }
      const { iat, exp, ...userOther } = user as { [key: string]: any }; // Type assertion for userOther
      console.log(user);
      refreshTokenArr = refreshTokenArr.filter(
        (token) => token !== refreshToken
      ); // Lọc ra những thằng cũ
      // Nếu đúng thì nó sẽ tạo accessToken mới và cả refreshToken mới
      const newAccessToken = jwt.sign(userOther, sceret.secretKey, {
        expiresIn: "1d",
      });
      const newRefreshToken: any = jwt.sign(
        userOther,
        sceret.sceretKeyRefresh,
        { expiresIn: "365d" }
      );
      refreshTokenArr.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none", // hoặc sameSite: "strict"
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
    return
  }
}
export const userControllerInstance = new UserController();
