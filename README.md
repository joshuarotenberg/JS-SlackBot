
# Homework 2: Slackbot
A super fun slackbot that can do various things. It can respond to a question about time,  let you know if today is a class day, and even call a movie API and respond with facts about movies.

*by: Josh Rotenberg*  

## 1. What time is it?

 - **Uses**: `bot.hear`
 - **Description**: Listens for `"What time is it"` and then responds with `Wine O'clock statement` and the `actual time`.
 - **Logic**: 
	 - pulls `hours` and `minutes` from `new  Date()`
	 - `if/else` to determine AM/PM

## 2. Do we have class?

 - **Uses**: `bot.hear`
 - **Description**: Listens for `"Is there class today"`, and responds.
 - **Logic**: 
	 - pulls `weekday` from `new  Date()`
	 - `if/else` checks against today's weekday and responds in kind
	 

## 3. Movie Responder

### Tell me about the movie [insert title]

 - **Uses**: `bot.respond`
 - **Description**: Listens for `"Tell me about the movie"`, extracts `title`,  and then responds with movie details.
 - **Logic**: 
	 - calls omdbapi using extracted title
	 - stores movie title => `bot.brain.set(BRAIN_KEY, movie[1]);`
	 - responds with: 
		 - sets `greeting` based on Rotten Tomatoes score
			 - used `parseInt` to convert score string to integer
		 - plot
		 - rotten tomatoes score
		 - lists awards 
		 - lists poster

### Tell me more

 - **Uses**: `bot.hear`
 - **Description**: Listens for `"Tell me more"`, uses stored `title` from previous question,  and then responds wit more movie details.
 - **Logic**: 
	 - grabs stored movie title => `bot.brain.get(BRAIN_KEY, movie[1]);`
	 - calls omdbapi using stored title
	 - responds with: 
		 - title, year, writer, director, actors...

### Unsolved Issues

- Regex for title needs work. apostrophes will break it, maybe on the API side?
- need to add logic if reviews don't exist