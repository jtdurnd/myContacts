const errorhandler = (err,req,res,next)=>{
  const status = err.status || 500 ;
  // err.status가 true이면 status를 넣어라
  // err.status가 false이면 500(서버오류)을 넣어라

  switch(status){
    case 400:
      res.status(status).json({
        title:"Bad Request",
        message:err.message
      });  
      break;

    case 401:
      res.status(status).json({
        title:"Unauthorized",
        message:err.message
      });
      break;

    case 403:
      res.status(status).json({
        title:"Forbbiden",
        message:err.message
      });
      break;

    case 404:
      res.status(status).json({
        title:"Not Found",
        message:err.message
      });
      break;

    case 500:
      res.status(status).json({
        title:"Internal Server Error",
        message:err.message
      });
      break;

    default:
      res.status(status).json({
        title:"No error!!!"
      });
      break;
  }
}

//외부로 내보내기
module.exports = errorhandler