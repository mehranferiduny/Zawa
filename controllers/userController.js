
const Nobat=require('../models/nobat');

const R=require('../models/rezerv');



exports.home= async(req,res)=>{
  try {



    let today = new Date().toLocaleDateString('fa-IR');
    const day=today.split('/')[2];
    const math=today.split('/')[1];
    const yaer=today.split('/')[0];
    const time=new Date().getHours();
    const mint=new Date().getMinutes();


    const nobats=await Nobat.find({status:1}).sort({date : 'ascending',saat:'ascending'})




    // console.log(nob);
    const message=req.flash('msgsecss');
    const error=req.flash('error');
    const datef='';
   
   
   
    res.render('home',{
      pageTitle:"دریافت نوبت",
      day,
      math,
      yaer,
      nobats,
      message,
      error,
      today,
      datef,
      time,
      mint,
   
    });

  } catch (err) {
    console.log(err);
  }
}

exports.homefilter= async(req,res)=>{
  try {



    const {datef}=req.body;
    let today = new Date().toLocaleDateString('fa-IR');
    const day=today.split('/')[2];
    const math=today.split('/')[1];
    const yaer=today.split('/')[0];
    const time=new Date().getHours();



    const nobats=await Nobat.find({date:datef,status:1}).sort({saat:'ascending',date:'ascending'});
    const message=req.flash('msgsecss');
    const error=req.flash('error');
   
    res.render('home',{
      pageTitle:"دریافت نوبت",
      day,
      math,
      yaer,
      nobats,
      message,
      error,
      today,
      datef,
   time,
    });

  } catch (err) {
    console.log(err);
  }
}

exports.sabtnobat=async(req,res,)=>{
  const nobat=await Nobat.findOne({_id:req.params.id });
  const errors=req.flash('error')
  res.render('register',{
     pageTitle:"ثبت نوبت",
     nobat,
     errors
  })
 
}

exports.rezerv=async(req,res)=>{
  const errors=[];

  try {
    const {saatstart,saatend,date,nummin}=req.body;
    let saats=saatstart.split(":")[0]*1;
    let mins=saatstart.split(":")[1]*1;
    let saate=saatend.split(":")[0]*1;
    let mine=saatend.split(":")[1]*1;
   


     const num= parseInt(nummin);


    do{


 

       if(saats.toString().length == 1){


        if(mins.toString().length == 1){
          let saat=`0${saats}:0${mins}`;
          await Nobat.create({saat,date,status:1});
        }else{
          let saat=`0${saats}:${mins}`;
          await Nobat.create({saat,date,status:1});
        }

       }else{

           
                    if(mins.toString().length == 1){
                      let saat=`${saats}:0${mins}`;
                      await Nobat.create({saat,date,status:1});
                    }else{
                      let saat=`${saats}:${mins}`;
                      await Nobat.create({saat,date,status:1});
                    }
          }          
                    let mm= mins*1;
                      mins+=num;
                      if(mins > 59){
                        saats+=1;
                        mm=60 - mm;
                        let m=num-mm;
                        mins=m;
                    
                  }
                
      }while(saats <= saate );
  


     
     res.redirect("/dashbord/zawa")
           
    
  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
        errors.push({
            name: e.path,
            message: e.message,
        });
    });

    return res.render('register.ejs',{
      pageTitle:"دریافت نوبت",
      // errors,
    });

  
  }
}


exports.dashbord=(req,res)=>{
  res.render("dashbord-add",{
    pageTitle:"داشبورد || مدیریت",
  })
}

exports.showcansel=(req,res)=>{
  res.render('canselpage',{
    pageTitle:"لغو نوبت"
  })
}

exports.canseln=async(req,res)=>{
  const errors=[];
    try {
      
             const {number,nump}=req.body;
          const user=await R.findOne({number,nump});
          // const saat=user.saat;
          // const date=user.date || "1";
          console.log(user);
          
          
          if(!user){
            req.flash("error","شما دارای نوبت در سامانه نمیباشید");
            return res.redirect("/home")
          }
          if(user.status==3){
            req.flash("error","شما دارای نوبت در سامانه نمیباشید");
            return res.redirect("/home")

          };
          const n=await Nobat.findOne({saat:user.saat,date:user.date});
          n.status=1;
          await n.save();

          user.status=3;
          await user.save();
          
          req.flash("msgsecss","نوبت شما با موفقیت لغو شد");
          res.redirect("/home")
      
    } catch (err) {
      console.log(err);
      err.inner.forEach((e) => {
        errors.push({
            name: e.path,
            message: e.message,
        });
    });
  }
}



exports.secsesnobat=async(req,res)=>{
  const errors=[];
  const {fname,lname,number}=req.body;
  const nobat=await Nobat.findOne({_id:req.params.id});
  const {saat,date}=nobat;
  const status=2;
   const nump= parseInt(Math.random() * 9000 + 1000);
   
  try {

    await R.userValidation(req.body);
    
    await R.create({fname,lname,number,saat,date,status,nump});
 
    nobat.status = status || 2;
    
    await nobat.save();
    req.flash("msgsecss", `
    جناب آقای ${fname} ${lname} 
    نوبت شما با شماره پیگیری  <<   ${nump}  >>  در سامانه رزرو شد
    -تاریخ رزرو شده : ${date} 
    -ساعت : ${saat}


         -----شماره پیگیری جهت مراجعه یا در صورت درخواست لغو نوبت حفظ شود ------
    `);
    return res.redirect('/home')



  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
      errors.push({
          name: e.path,
          message: e.message,
      });
  });
  const nobat=await Nobat.findOne({_id:req.params.id });
  res.render('register',{
     pageTitle:"ثبت نوبت",
     nobat,
     errors,
  })



  }
}




exports.getdashboard=async(req,res)=>{

  
  let today = new Date().toLocaleDateString('fa-IR');
  const day=today.split('/')[2];
  const math=today.split('/')[1];
  const yaer=today.split('/')[0];

  try {
    const nobats=await Nobat.find({status:1});
    const nobatr= await R.find({});

    res.render("dashbord-add",{
      pageTitle:"ثبت نوبت",
      nobats,
      nobatr,
      day,
      math,
      yaer,

    })
  } catch (err) {
    console.log(err);
  }
}

exports.getlogin=(req,res)=>{
  res.render("login",{
    pageTitle : "ورود"
  })
}

exports.logindash=(req,res)=>{
  const {username,password}=req.body;
  if(username== "mohammadM" && password == "13747474"){
    return res.redirect('/dashbord/zawa');
  }
  res.redirect('/login/admin')
}

exports.deleteN= async(req,res)=>{

  try {

    await Nobat.findByIdAndRemove(req.params.id);
    return res.redirect('/dashbord/zawa');
    
  } catch (err) {
    console.log(err);
  }

}


exports.deleteNo= async(req,res)=>{

  try {

    await R.findByIdAndRemove(req.params.id);
    return res.redirect('/dashbord/zawa');
    
  } catch (err) {
    console.log(err);
  }

}