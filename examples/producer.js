var scribely = require('../lib/scribely/scribely.js');

var producer = new scribely.Producer('localhost', 1463);
producer.send('default', 'hello world from scribely');
