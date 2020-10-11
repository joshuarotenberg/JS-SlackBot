module.exports = (bot) => {
    bot.hear(/Hello!/, (response) => {
      return response.send("Hey back!");
    });
  
      bot.respond(/Hey! My name is ([A-z]+)/, (response) => {
        // Pull out name from the above REGEX match group
        const name = response.match;

        console.log(name[1]);
    
        // Reply using the name from the REGEX match
        return response.reply(`Hello ${name[1]}! Nice to meet you`);
      });


    bot.hear(/(W|w)hat time is it/, (response) => {
      const time = () => {

        const d = new Date();
        let hours = d.getHours();
        let mins = d.getMinutes();

        let ampm = "AM";
        if(hours >= 12) {
          ampm = "PM"
        }

        return(`${hours}:${mins} ${ampm}`);

      }
    

      return response.send(`It's always Wine O'Clock somewhere!!
      But it looks like it's really ${time()} wherever you are...`);
    });

    bot.respond(/Tell me about the movie ([\w ]+[^\W_]+)/, (response) => {
      const movie = response.match;

      response.http("http://www.omdbapi.com/?i=tt3896198&apikey=58a43c4f&t=" + movie[1])
        .get()(function(err, res, body) {
          json = JSON.parse(body);    
          
          const rottenScore = () => {
            const preferredRater = "Rotten Tomatoes"
            const ratings = json.Ratings
            const data = ratings.find( function(rater) { 
                return rater.Source === preferredRater;
            });

            if(data) {
              console.log( 'found' );
              console.log(data.Value); // This is entire object i.e. `item` not boolean
            } else {
              "Might have been too old for RT"
            }

            return(data.Value);
          }
          

          if (err) {
            return (`Error: ${err}`)
          } 
          
          return response.reply(`Great Choice!! ${json.Title} has a Rotten Tomatoes score of ${rottenScore()} and is about ${json.Plot} This movie was so good that it ${json.Awards}`); 
      });
    });



  }