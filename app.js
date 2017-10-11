var restify = require('restify');
var botbuilder = require('botbuilder');

// setup restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3987, function(){
	console.log('%s bot started at %s', server.name, server.url);
});


// create chat connector
var connector = new botbuilder.ChatConnector({
	appId: process.env.APP_ID,
	appPassword: process.env.APP_SECRET
});


// listening for user inputs
server.post('/api/messages', connector.listen());

var bot = new botbuilder.UniversalBot(connector, [
	function (session) {
        // session.beginDialog('hotel', session.userData);
        session.beginDialog('reservation:hotel');
    }
]);

// bot.dialog('hotel', require('./resa.js'));
bot.library(require('./resa'));