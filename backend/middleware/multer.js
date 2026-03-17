import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });
export default upload;
9. middleware/auth.js (Verifies standard user tokens)
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized login again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Automatically attach the user ID
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export default authUser;