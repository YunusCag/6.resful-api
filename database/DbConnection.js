const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/restful_api',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false}
    )
.then(()=>console.log('Veritabanı(database) bağlantısı sağlandı.'))
.catch((err)=>console.log("Veritabanı(database) bağlantısında bir hata çıktı:"+err));

