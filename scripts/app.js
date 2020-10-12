module.exports = (bot) => {

  //////////////
  // 1. Responds to "What time is it"...

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

    //////////////
    // 2. reponds with movie details if you ask "Tell me about the movie ..."

    bot.respond(/Tell me about the movie ([\w ]+[^\W_]+)/, (response) => {
      const movie = response.match;

      response.http("http://www.omdbapi.com/?i=tt3896198&apikey=58a43c4f&t=" + movie[1])
      
      .get()(function(err, res, body) {
          json = JSON.parse(body);    

          // Grab rotten tomatoes score
          
          const rottenScore = () => {
            const preferredRater = "Rotten Tomatoes"
            const ratings = json.Ratings
            const data = ratings.find( function(rater) { 
                return rater.Source === preferredRater;
            });

            // turn score into integer

            if(data) {
              const score = parseInt(data.Value, 10);
              return(score)
            } else {
              return(``);
            }
          }


          const rottenText = () => {
            if (rottenScore() != "" ) {
              return (`scored a ${rottenScore()}% on Rotten Tomatoes and`)
            } else {
              
            }

          }

          //uses logic to switch greeting based on the Rotten Tomatoes Score.

          const greeting = () => {
            if (rottenScore() < 50) {
              return ("Meh.");
            } else {
              return("Great Choice!!");
            }
          }

          // if the movie has adwards it's added to response.

          const awards = () => {
            let movieAwards = json.Awards;
            if (typeof movieAwards != "undefined") {
              return(`This movie was so good that some of it's accolades included: ${json.Awards}`);
            } else {
              return (``);
            }
          }
          

          if (err) {
            return (`Error: ${err}`)
          } 
        
      
        return response.reply(`${greeting()} ${json.Title} ${rottenText()} it's about: ${json.Plot} ${awards()} ${json.Poster}`); 

      });
    });

    ///////////
    // 3. Is there class today? 

    bot.hear(/(I|i)s there class today/, (response) => {

      const weekDay = new Date().toLocaleString('en-us', {weekday:'long'})

      const classToday = () => {
        if (weekDay == "Friday" || "Saturday" || "Sunday" || "Monday") {
          return(`Not today!. Your next class is Tuesday.`);
        } else if (weekDay == "Wednesday") {
          return(`Nope. The next class is Tomorrow.`);
        } else {
          return(`Hell yeah!!`);
        }
      }

      return response.send(classToday());
    });

  }