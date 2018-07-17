const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //extract token
    const token = req.headers.authorization.split(" ")[1]; // token in header is after "Bearer token" as seen in many APIS
    //verify extracted token
    jwt.verify(token, "secret_zxcl[aienzssdoa032n21@@#$(lmklhbhjbosddeuzxlw");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
