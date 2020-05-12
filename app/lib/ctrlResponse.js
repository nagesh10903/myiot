var {logger}= require("../config/logger")

class ctrlResponse{

  constructor(){
  }
    sendResponse(err,result,res)
    { if(err)
        {
          //  console.log(err)
            logger.error(err)
            return res.status(500).json({
                sucess:0,
                message:"DB error!"
            });
        }
        if(result===null || result==0){
            logger.info("Record not Found!")
            return res.status(400).json({
                sucess:0,
                message:"Record not Found!"
            });
        }
        return res.status(200).json({
            sucess:1,
           data:result
        });
    }
    pageResponse(err,result,res,viewPage,pageData)
    { if(err)
        {
           // console.log(err)
            logger.error(err)
           return res.status(500).render('./UI/error/error')
        }       
        res.render(viewPage,{result,pageData})        
    }
    pageRedirect(err,result,res,url)
    { if(err)
        {
           // console.log(err)
            logger.error(err)
           return res.status(500).render('./UI/error/error')
        }
        if(result===null || result===0){
         return res.status(400).render('./UI/error/error')
        }
        res.redirect(url)        
    }
    checkerror(err,res,url)
    {
        //console.log(err)
        logger.error(err)
        res.status(500).render('./UI/error/error')
    }
}

module.exports=new ctrlResponse;