import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, userName, userType, password } = req.body;
  try {
    const user = new User({ name, userName, userType, password });
    await user.save();

    //jwt

    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    let user = await User.findOne({ userName });
    if(!user) return res.status(403).json({ error: "Usuario o contraseña incorrectas" });

    let answerPass = await user.comparePassword(password)
    if(!answerPass) return res.status(403).json({ error: "Usuario o contraseña incorrectas" });

    //Generar toke JWT

    const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET);
    return res.json({token});


  } catch (error) {
    console.log(error);
  }
};
