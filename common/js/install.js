
/***
 * 1: Check if table "GAME" is exist
 * 2a: if no : create that and install all game
 * 2b: if yes : Check update.json
 * 3a: If not up-to-date : get the xml games.xml
 * 4: drop and remove all table for this game and re-install the game
 * 5: Load Game list
 */

/* Create table if not exist */
console.log("start step 1");
console.log("create DB Transaction")
db.transaction(function(tx){
	tx.executeSql('SELECT COUNT(*) FROM games', [], null, function(tx, err){
		CreateAndUpdateGameTable();
	});
}, function(err){
	console.log("[first] ops db : ", err.message);
});

function CreateAndUpdateGameTable(){
	console.log("Start - CreateAndUpdateGameTable");

	$.getJSON('datas/update.json', function(data) {
		var games = [];

		$.each(data, function(key, val) {
			if(key == "update"){
				$.each(val, function(key,val){
					games.push("INSERT INTO games (id, version) VALUES ('"+key+"',"+val+")");
				})
			}
		});

		db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS games (id unique, version)")
			for(i=0; i<games.length; i++){
				tx.executeSql(games[i]);
			}
		}, function(err){console.log("[populate DB] ops :", err.message)});

		console.log("Create and Insert datas")
	});

	console.log("End - CreateAndUpdateGameTable");
}