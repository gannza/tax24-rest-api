/**
 * it should return success and error reponse
 */
 module.exports = {

     error:(res, msg, status)=> {
      return res.status(status).json({
        status,
        error: msg,
      });
    },
  
     success:(res, msg, status, data) =>{
      return res.status(status).json({
        status,
        message: msg,
        data,
      });
    }
  }