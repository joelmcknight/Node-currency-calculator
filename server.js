var http = require('http');
var fs = require('fs');
var csv = require('node-csv');
var querystring = require('querystring');

var options = 'http://api.fixer.io/latest?base=USD';


// express.js and mongodb or msql??

var parser = csv.createParser();
var server = http.createServer();

var re = /^\/currencies\/(\w+)/;


server.on('request', function(request, response){

  http.get(options, function(res) {
    
    var bodyChunks = [];
      res.on('data', function(chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
      }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        console.log('BODY: ' + body);
        // ...and/or process the entire body here.
      
    })
  })

  // console.log(request.url);
  request.on('error', function(error){
    console.error(error);
  })

  response.on('error', function(error){
    console.error(error);
  })

  var match = request.url.match(re);


  // console.log(match);
  // var apiKey = 'http://api.fixer.io/latest?base=USD';


  if (match) {
    // var value = currencies[match[1]];

    

    // parser.mapFile('rates.csv', function(error,rows){
    //   console.log(match)
    //   var output = rows.find(function(row) {
    //     return row.currency === match[1];
    //
    //   });
    //   var query = request.url.split('?')[1];
    //
    //   if (query) {
    //     var amount = querystring.parse(query);
    //     // console.log(amount);
    //     output.amount = parseFloat(amount.value) * output.value
    //   }
    //
    //   if (output){
    //       response.setHeader('Content-Type', 'application/json')
    //       response.write(JSON.stringify(output), 'utf8');
    //       response.end();
    //
    //   } else {
    //     response.statusCode = 400;
    //     response.write('not a valid response');
    //     response.end();
    //   }
    // })


  } else if (request.url == '/home') {
    fs.readFile('index.html', function(error, contents){
      response.write(contents);
      response.end();
    })
  } else {
    response.statusCode = 404;
    response.write('404 site not found');
    response.end();
  }


});

server.listen(8080, function() {
  console.log('server is listening on 8080')
})
