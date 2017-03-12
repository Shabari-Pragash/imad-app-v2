var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=require('crypto');
var bodyparser=require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());

var Pool=require('pg').Pool;
var config={
  user:'shabari-pragash',
  database:'shabari-pragash',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password: 'db-shabari-pragash-9604'
};
var pool=new Pool(config);

/*var articles= {
'article-one': {
    title:'Article-One',
    heading:'Article-One',
    date:'18 Feb 2017',
    content:'This is my first article'
    },
'article-two': {
    title:'Article-Two',
    heading:'Article-Two',
    date:'19 Feb 2017',
    content:'This is my second article'
    },   
'article-three': {
    title:'Article-Three',
    heading:'Article-Three',
    date:'20 Feb 2017',
    content:'This is my third article'
    }
}; */   

function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate=`
    <html>
        <head>
            <title>
                ${title} | Shabari Pragash
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>    
        <body>
            <div class="container">
                <div>
                <a href="/">Home</a>
                </div>
                
                <hr/>
                
                <div>
                <h1>
                    ${heading}
                </h1>
                </div>
                
                <div>
                    ${date.toDateString()}
                </div>
                
                <div>Shabari Pragash</div>
                
                <div>
                    <p>
                    ${content}
                    </p>
                </div>
                </div>
        </body>
        </html>
    `;
    return htmlTemplate;
}

function hash(input,salt)
{
    var hashdb=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashdb.toString('hex');
}

/*app.get('/:name',function(req,res){
   var name=req.params.name;
   var hashdb=hash(name,'this-is-my-first-webapp');
   res.send(hashdb);
});*/

app.post('/createuser',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var hashdb=hash(password,salt);
    pool.query("INSERT INTO user (username,password) VALUES($1,$2)",[username,hashdb],function(err,result){
       if(err)
            res.status(500).send(err.toString());
        else
            res.send('User created');
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

/*app.get('/test',function(req,res){
   pool.query('SELECT * FROM ARTICLES',function(err,result){
      if(err)
        res.status(500).send(err.toString());
      else
        res.send(JSON.stringify(result.rows));
   }); 
});*/

app.get('/articles/:articleName',function(req,res){
   //pool.query("SELECT * FROM ARTICLES WHERE TITLE='" + req.params.articleName + "'",function(err,result){
   pool.query("SELECT * FROM ARTICLES WHERE TITLE=$1",[req.params.articleName],function(err,result){
      if(err)
        res.status(500).send(err.toString());
      else{
          if(result.rows.length===0)
            res.status(404).send(err.toString());
          else
          {
              var articleData=result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
   }); 
});


//write this code here in order to overwrite next segment
var count=0;
app.get('/counter', function (req,res) {
    count=count+1;
    res.send(count.toString());
});

var list=[];
//app.get('/SUBMIT/:name',function(req,res){
app.get('/submit',function(req,res){
    var name=req.query.name;
    list.push(name);
    res.send(JSON.stringify(list));
});

app.get('/:articleName',function(req,res) {
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
   //res.sendFile(path.join(__dirname,'ui','article-one.html'));
   //res.send('Article-one is served here');
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

/*var list=[];
app.get('/SUBMIT/:name',function(req,res){
    var name=req.params.name;
    list.push(name);
    res.send(JSON.stringify(list));
});*/


/*var count=0;
app.get('/counter', function (req,res) {
    count=count+1;
    res.send(count.toString());
});*/

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
