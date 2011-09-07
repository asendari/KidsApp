console.log("start step 1");
console.log("create DB Transaction")
db.transaction(function(tx){
	tx.executeSql('DROP TABLE games');
}, function(err){
	console.log("[first] ops db : ", err.message);
});
