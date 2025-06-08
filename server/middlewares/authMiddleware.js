const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // get the token
    // verify the token
    // get the user out of the token 
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verfiedtoken = jwt.verify(token, "Scaler_BMS");
        req.body.userId = verfiedtoken.userId;
        next();
    } catch (error) {
        res.status(401).send({ success: false, message: "Token Invalid" });
    }
}