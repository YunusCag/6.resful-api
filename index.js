const express=require('express');
require('./database/DbConnection');
const errorMidlleware=require('./middleware/errorMiddleware');

//ROUTES
const userRouter=require('./router/UserRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api/users',userRouter);

app.get('/',(req, res) =>{
    res.json({message:'Hoşgeldiniz.'})
});

app.use(errorMidlleware);

// function test() {
//     const token=jwt.sign({
//         _userID:'yeni kullanıcı ID si',
//         isAdmin:true,
//         active:true
//     },'123456',{expiresIn:'2h'});

//     console.log(token);

//     const result=jwt.verify(token,'123456');
//     console.log(result);
// }
// test();

app.listen(3000,()=>{
    console.log('3000 portunda server ayaklandırıldı.');
});