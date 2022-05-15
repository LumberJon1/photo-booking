const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;
const expiration = "2h";

// Expects a user object to destructure and sign
module.exports = {
    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
      
        // separate "Bearer" from the rest of the token value
        if (req.headers.authorization) {
            token = token
                .split(" ")
                .pop()
                .trim();
        }
      
        if (!token) {
            return req;
        }
      
        try {
            // decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid Token");
        }
      
        // return updated request object
        return req;
    },
    signToken: function({username, password, _id}) {
        const payload = {username, password, _id};

        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    }
};