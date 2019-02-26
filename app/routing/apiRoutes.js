// Link in Friends array
var friends = require('../data/friends');


// Includes Two Routes
function apiRoutes(app) {

  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post('/api/friends', function (req, res) {

    // Parse new friend input to get integers (AJAX post seemed to make the numbers strings)
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArr = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArr.push( parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scoresArr;

    // Cross check the new friend entry with the existing ones
    var scoreComparisionArr = [];
    for(var i=0; i < friends.length; i++){

      // Check each friend's scores and sum difference in points
      var currentComparison = 0;
      for(var j=0; j < newFriend.scores.length; j++){
        currentComparison += Math.abs( newFriend.scores[j] - friends[i].scores[j] );
      }

      // Push each comparison between friends to array
      scoreComparisionArr.push(currentComparison);
    }

    // Determine the best match using the postion of best match in the friendsData array
    var bestMatchPosition = 0; // assume its the first person to start
    for(var i=1; i < scoreComparisionArr.length; i++){
      
      // Lower number in comparison difference means better match
      if(scoreComparisionArr[i] <= scoreComparisionArr[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }

    // ***NOTE*** If the 2 friends have the same comparison, then the NEWEST entry in the friendsData array is chosen
    var friendMatch = friends[bestMatchPosition];

    // Reply with a JSON object of the best match
    res.json(friendMatch);

    // Push the new friend to the friends data array for storage
    friends.push(newFriend);

  });

}


// Export for use in main server.js file
module.exports = apiRoutes;

