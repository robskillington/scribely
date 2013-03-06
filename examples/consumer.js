var scribely = require('../lib/scribely/scribely.js');

var port = 1463;

var consumer = new scribely.Consumer(function (messages) {
    console.log(messages);
}).listen(port);

console.log('consumer running on port ' + port);
