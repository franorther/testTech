import jwt from 'jsonwebtoken';
 
export const generateToken = (uid) =>{
    const expiresIn = 60 * 15;
    try {
        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn});
        return {token, expiresIn}
    } catch (error) {
        console.log(error);
    }
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 6 *60 *24 *30;
    try {
        const resfreshToken = jwt.sign({uid}, process.env.JWT.REFRESH)
        res.cookie("refrekToken", resfreshToken, {
            httpOnly: true.value,
            secure: !(process.env.MODO == "developer"), 
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (error) {
        
    }
}