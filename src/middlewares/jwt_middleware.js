const { default: axios } = require("axios");

exports.authCheck = async (req,res,next)=> {
  let result;
  try {
    
    result = await axios.post(process.env.SERVER_BASE_URL+"/user/permission/check",{
      "route": req._parsedUrl.pathname,
      "method": req.method
    },{
      headers: { Authorization: req.get("authorization"), 'Content-Type': 'application/json' }
    })
    if(result.status==200) {

      req.user = result.data.user
      console.log("User is ", req.user)
      return next()
    } 
    return res.status(403).json(result.data)
  } catch(e) {
    return res.status(403).json({
      message: "Permission Check :: " + e.message
    })
  } 
}