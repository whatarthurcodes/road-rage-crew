exports.addUser = function(db) {
    return function(req, res) {
         console.log(db)
         var data = req.body;
         console.log(data.username);
         console.log(data.longitude);
         console.log(data.latitude);
         console.log(data.studying);

         res.send('thnx :)')

        var collection = db.get('user');
        collection.insert({
            "username" : data.username,
            "location" : {"long":data.longitude, "lat":data.latitude},
            "studying" : data.studying
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.send("Data successfully entered");
            }
        });

    }
}