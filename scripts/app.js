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


  }