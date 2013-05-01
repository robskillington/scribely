var scribely = require('../lib/scribely/scribely.js');

var producer = new scribely.Producer('localhost', 1463);
producer.send('default', JSON.stringify({
    UtcCreated: new Date().getTime(),
    LogContent: { 
        Message: 'Word to your browser',
        SomeField: 'I came to get logged, jump around, jump up, jump up and get down'
    },
    LogHost: 'me',
    LogFrom: 'meme',
    LogTag: 'info'
}));
