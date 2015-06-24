var express = require('express');
var app = express();
// 设置handlebars视图引擎
var handlebars = require('express3-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port',3000);
// static中间件给静态文件创建了路由
app.use(express.static(__dirname + '/public'));
app.get('/',function(req, res){
    res.render('home');

})
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


