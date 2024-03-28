const reqFilter=(req,res,next)=>{
    if(req.query.age<18){
        res.send("you cannot access this page because your age is less then 18")
    }
    else{
        next()
    }
    
    
}



module.exports=reqFilter