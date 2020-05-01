

class ctrlResponse{

  constructor(){
  }
    sendResponse(err,result,res)
    { if(err)
        {
            console.log(err)
            return res.status(500).json({
                sucess:0,
                message:"DB error!"
            });
        }
        if(result===null || result==0){
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
            console.log(err)
            res.status(500).render('./UI/error/error')
        }
        if(result===null || result==0){
          res.status(400).render('./UI/error/error')
        }
        res.render(viewPage,{result,pageData})
        
    }
}

module.exports=new ctrlResponse;