module.exports = (bot) => {

  const BRAIN_KEY = 'title';

  //////////////
  // 1. Responds to "What time is it"...

    bot.hear(/(W|w)hat time is it/, (response) => {
      const time = () => {

        const d = new Date();
        let hours = d.getHours();
        let h = hours;
        const mins = d.getMinutes();


        let ampm = "AM";

        if(hours >= 12) {
          ampm = "PM"
        } 

        if(hours > 12) {
          h = hours - 12;
        } 

        return(`${h}:${mins} ${ampm}`);

      }

      return response.send(`It's always Wine O'Clock somewhere!! \n But it looks like it's really ${time()} wherever you are...`);
    });

    ///////////
    // 2. Is there class today? 

    bot.hear(/(I|i)s there class today/, (response) => {

      const weekDay = new Date().toLocaleString('en-us', {weekday:'long'})

      const classToday = () => {
        if (weekDay == "Friday" || weekDay == "Saturday" || weekDay == "Sunday" ||weekDay ==  "Monday") {
          return(`Not today!. Your next class is Tuesday.`);
        } else if (weekDay == "Wednesday") {
          return(`Nope. The next class is Tomorrow.`);
        } else {
          return(`Hell yeah!!`);
        }

      }

      return response.send(classToday());
    });

    //////////////
    // 3. reponds with movie details if you ask "Tell me about the movie ..."

    bot.respond(/Tell me about the movie ([\w ]+[^\W_]+)/, (response) => {
      const movie = response.match;
      const lastMovie = bot.brain.set(BRAIN_KEY, movie[1]);
      
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
            if (rottenScore() != "" && typeof rottenScore != "undefined" ) {
              return (`scored a ${rottenScore()}% on Rotten Tomatoes and it's about`)
            } else {
              return(`is about`);
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
        
      
        return response.reply(`${greeting()} ${json.Title} ${rottenText()} ${json.Plot} ${awards()} ${json.Poster}`); 

      });

      
  
    });

    bot.hear(/(T|t)ell me more/, (response) => {
      const movie = response.match;
      const grabMovie = bot.brain.get(BRAIN_KEY, movie[1]);

      response.http("http://www.omdbapi.com/?i=tt3896198&apikey=58a43c4f&t=" + grabMovie)

      .get()(function(err, res, body) {
        json = JSON.parse(body); 
        
        if (err) {
          return (`Error: ${err}`)
        } else {
        }
      });

      return response.send(`Sure thing! ${json.Title} was released in ${json.Year}, was written by ${json.Writer}, directed by ${json.Director}, and starred ${json.Actors}.`);

    });
    

   

  }