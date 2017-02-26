var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles= {
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
};    

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
                    ${date}
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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

var count=0;
app.get('/counter', function (req,res) {
    count=count+1;
    res.send(count.toString());
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
