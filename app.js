var express = require('express');
var app = express();


// var tours = [
//     {id:0,name:'1号'},
//     {id:1,name:'2号'}
// ];

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port',3000);
// static中间件给静态文件创建了路由
app.use(express.static(__dirname + '/public'));
app.get('/',function(req, res){
    var mongoose = require('mongoose');
    // var Test = require('./models/test.js');
    mongoose.connect('mongodb://localhost:27017/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      // yay!
        var kittySchema = mongoose.Schema({
            name: String
        });
        var Kitten = mongoose.model('Kitten', kittySchema);
        var silence = new Kitten({ name: 'Silence' });
        console.log(silence.name); // 'Silence'
        silence.save(function (err, silence) {
          if (err) return console.error(err);
          // fluffy.speak();
        });

        Kitten.find(function (err, kittens) {
          if (err) return console.error(err);
            console.log(kittens);
            var context = {
                kittens: kittens.map(function(kittens){
                    return {
                        name: kittens.name
                    }
                })
            }
            res.render('home', context);

        })

    });



})



// // GET,返回json数据
// // app.get('/api/tours',function(req, res){
// //     res.json(tours);
// // });
// // 更新并返回
// // app.get('/api/tours/:id', function(req, res){
// //     var p = tours.some(function(p){
// //         return p.id == req.params.id;
// //     })
// //     if(p){
// //         console.log('1');
// //         if (req.query.name) {
// //             p.name = req.query.name;
// //             res.json({success: true});
// //         };
// //     }else{
// //         console.log('2');

// //     }
// // });
// app.get('/api/process', function(req, res){
//     // if(req.xhr )
//     var query = req.query;
//     if(query.id){
//         res.json(tours[id=query.id]);
//     }else{
//         res.json(tours);
//     }
//     // res.send({success:true})
// });
// 定制404页面
app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404- Not Found');
});

app.listen(app.get('port'),function(){
    console.log('express start on http://localhost:' +
        app.get('port')
    );
})


