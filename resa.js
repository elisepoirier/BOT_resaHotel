var botbuilder = require('botbuilder');

const library = new botbuilder.Library('reservation');

library.dialog('hotel', [
	function (session) {
        botbuilder.Prompts.text(session, "Nom ?");
    },
	function (session,results) {
		session.dialogData.name = results.response;
        botbuilder.Prompts.text(session, "Email ?");
    },
    function (session, results) {
        session.dialogData.email = results.response;
        botbuilder.Prompts.number(session, "Age ?");
    },
	function (session, results) {
		session.dialogData.age = results.response;
		session.send(`Bonjour ${session.dialogData.profile.name}, procédons maintenant à la réservation.`);
        botbuilder.Prompts.text(session, "Ou souhaitez vous aller ?");
	},
	function (session, results) {
        session.dialogData.destination = results.response;
        botbuilder.Prompts.time(session, "A quelle date voulez-vous partir ? (ex: June 6th at 2pm)");
	},
	function (session, results) {
        session.dialogData.date = builder.EntityRecognizer.resolveTime([results.response]);
        botbuilder.Prompts.number(session, "Pour combien de nuit ?");
	},
	function (session, results) {
        session.dialogData.night = results.response;

        // Process request and display reservation details
		session.send(`
			Reservation confirmée.<br/>
			Destination: ${session.dialogData.resa.destination} <br/>
			Date de départ: ${session.dialogData.resa.date} <br/>
			Nombre de nuits: ${session.dialogData.resa.night} <br/>
		`);
        session.endDialog();
	},
])
.endConversationAction(
    "endResaHotel", "Ok, aurevoir",
    {
        matches: /^cancel$|^goodbye$|^annuler$|^stop$/i,
        confirmPrompt: "Vous allez annuler votre réservation d'hotel. Etes vous sur ?"
    }
)
.reloadAction('startOver', 'Ok, reprenons depuis le début !.', {
    matches: /^start over$|^recommence$/i
});
;

module.exports = library;