import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, userName, userType, password } = req.body;
  try {
    const user = new User({ name, userName, userType, password });
    await user.save();

    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    let user = await User.findOne({ userName });
    if (!user)
      return res
        .status(403)
        .json({ error: "Usuario o contraseña incorrectas" });

    let answerPass = await user.comparePassword(password);
    if (!answerPass)
      return res
        .status(403)
        .json({ error: "Usuario o contraseña incorrectas" });

    //Generar toke JWT
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user._id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
  }
};
export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    res.json({ userName: user.userName });
  } catch (error) {
    return res.status(500).json({ error: "error del del servidor" });
  }
};
export const refreshToken = (req, res) => {
 try {
    console.log(req.cookies);
    const refreshTokenCookie = req.cookies.refreshToken
    if( !refreshTokenCookie ) throw new Error("No existe token");

    const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    const { token, expiresIn } = generateToken(uid);

    return res.json( { token, expiresIn});
 } catch (error) {
    return res.send( { error: error});
 }
 
}

