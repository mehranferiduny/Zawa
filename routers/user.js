const {Router}=require('express');


const {home,sabtnobat,secsesnobat,getdashboard,rezerv,logindash,getlogin,deleteN,showcansel,canseln,homefilter,deleteNo}=require('../controllers/userController')

const router= new Router();

//!home
router.get("/home",home);
router.post("/home/date",homefilter);
router.get("/sabtnobat/:id",sabtnobat)
router.post("/sabtnobat/secsses/:id",secsesnobat);
router.get("/home/getcode",secsesnobat);




router.get("/nobat/delete/:id",deleteN);
router.get("/delete/nob/:id",deleteNo);



router.get("/nobat/cansel",showcansel);
router.post("/nobat/cansel",canseln);

//!dashbord





//*dashbord
router.get('/dashbord/zawa',getdashboard);
router.post('/dashbord/zawa',rezerv);



router.post('/login/admin',logindash);
router.get('/login/admin',getlogin);
// router.post('/zawa', sabtNobat ,secsesnobat)



module.exports = router;