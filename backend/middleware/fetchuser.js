const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mysecret';

const fetchuser=(req, res, next)=>{
//get the user from the token and add id too req object
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error: "invalid user"})
}
try {
    const data = jwt.verify(token, JWT_SECRET)
req.user = data.user;
 next();
} catch (error) {
    res.status(401).send({error: "invalid user"})
}

}



module.exports = fetchuser;