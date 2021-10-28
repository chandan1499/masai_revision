const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "helloworld", (err, user) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(user);
            }
        })
    })
}

const authentication = async (req, res, next) => {
    let token = req?.headers?.authorization;

    if (!token) {
        return res.status(401).json({ status: "failed", message: "Bearer Token is missing" });
    }

    if (token.split(" ")[0] !== "Bearer") {
        return res.status(401).json({ status: "failed", message: "Bearer Token is missing" });
    }

    let user;
    try {
        user = await verifyToken(token.split(" ")[1]);
        req.body = {...req.body, ...user};
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: "Invalid Token" });
    }

    next();
}

module.exports = authentication;