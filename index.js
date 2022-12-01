//express
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");


app.use(bodyParser.json());
app.use(express.static("public"));

//morgan to log all requests
const morgan = require("morgan");

app.use(morgan("common"));


// array of 10 favorite movies
let movies = [
  {
    "Title": "Avatar",
    "Director": {
      "Name": "James Cameron",
      "Birth": "1954-present",
      "Bio": "James Cameron is a filmmaker from Canada. He has made many popular Sci-Fi films"
    },
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "Short for Science Fiction, Sci-Fi, is a genre that usually depicts futuristic settings or ideas."
    },
    "imageURL":"https://www.imdb.com/title/tt0499549/mediaviewer/rm371527425/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "Star Wars: Episode V",
    "Director": {
      "Name": "Irvin Kershner",
      "Birth": "1923-2010",
      "Bio": "Irvin was a director, actor, producer, and an instructor at USC."
    },
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "Short for Science Fiction, Sci-Fi, is a genre that usually depicts futuristic settings or ideas."
    },
    "imageURL":"https://www.imdb.com/title/tt0080684/mediaviewer/rm3114097664/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "A Knight's Tale",
    "Director": {
      "Name": "Brian Helgeland",
      "Birth": "1961-present",
      "Bio": "Brian recieve an Academy Award and Razzie in the same year. He directed popular horror films like Freddy Krueger and A nightmare of Elm Street 4: The Dream Master."
    },
    "Genre": {
      "Name": "Comdey",
      "Description": "A comedy is designed to be funny."
    },
    "imageURL":"https://www.imdb.com/title/tt0183790/mediaviewer/rm3970210048/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "Wayne's World",
    "Director": {
      "Name": "Penelope Spheeris",
      "Birth": "1945-present",
      "Bio":"Spheeris earn a Grammy Award nomination for her work in Wayn's World which was also her highest grossing film.",
    },
    "Genre": {
      "Name": "Comedy",
      "Description": "A comedy is designed to be funny."
    },
    "imageURL":"https://www.imdb.com/title/tt0105793/mediaviewer/rm3693806848/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "Aliens",
    "Director": {
      "Name": "James Cameron",
      "Birth": "1954-present",
      "Bio": "James Cameron is a filmmaker from Canada. He has made many popular Sci-Fi films"
    },
    "Genre": {
      "Name": "Thriller",
      "Description": "Thrillers invoke feelings of suspense, anticiation, and anxiety."
    },
    "imageURL":"https://www.imdb.com/title/tt0090605/mediaviewer/rm490960896/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "Robin Hood: Prince of Thieves",
    "Director": {
      "Name": "Kevin Reynolds",
      "Birth": "1952-present",
      "Bio": "Reynolds started his career by co-writing Red Dawn in 1984, and gave Samuel L. Jackson his first role in One Eight Seven."
    },
    "Genre": {
      "Name": "Action",
      "Description": "Action usually has events that include violence and distruction."
    },
    "imageURL":"https://www.imdb.com/title/tt0102798/mediaviewer/rm1060182529/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "Yes Man",
    "Director": {
      "Name": "Peyton Reed",
      "Birth": "1964-present",
      "Bio": "Reed's first director roll was for Bring it on and more recently directed Ant-Man and the Wasp."
    },
    "Genre": {
      "Name": "Comedy",
      "Description": "A comedy is designed to be funny."
    },
    "imageURL":"https://www.imdb.com/title/tt1068680/mediaviewer/rm359602176/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "The Lord of the Rings",
    "Director": {
      "Name": "Sir Peter Jackson",
      "Birth": "1961-present",
      "Bio": "Sir Peter Jackson best known work is The Lord of the Rings. He was knighted in 2002 by Sir Anand Satyanand."
    },
    "Genre": {
      "Name": "Fantasy",
      "Description": "Fantasy usually depicts mythology and folklore with magic."
    },
    "imageURL":"https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "Major Payne",
    "Director": {
      "Name": "Nick Castle",
      "Birth": "1947-present",
      "Bio": "Castle is known for playing as Michael Myers in the 1978 Halloween movie."
    },
    "Genre": {
      "Name": "Comedy",
      "Description": "A comedy is designed to be funny."
    },
    "imageURL":"https://www.imdb.com/title/tt0110443/mediaviewer/rm991907584/?ref_=tt_ov_i",
    "Features": true
  },
  {
    "Title": "Batman: the Dark Knight Trilogy",
    "Director": {
      "Name": "Christopher Nolan",
      "Birth": "1970-present",
      "Bio": "Nolan is a well known director that was won many awards. Some of his recent works is Dunkirk, Intersteller, and Inception."
    },
    "Genre": {
      "Name": "Action",
      "Description": "Action usually has events that include violence and distruction."
    },
    "imageURL":"https://www.imdb.com/title/tt0372784/mediaviewer/rm2827249920/?ref_=tt_ov_i",
    "Features": true
  }
];

let users =[
  {
    id: 1,
    name: "Mary",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "John",
    favoriteMovies: [
      "The Fountain"
    ]
  }

];

//CREATE user
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

//CREATE add movies to users list
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
  } else {
    res.status(400).send("no such user");
  }
});

//UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

// GET requests
app.get("/", (req, res) => {
  res.status(200).send("Welcome to MyFlix!");
});

// READ get all movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// READ get movie by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie.");
  }
});

//READ get movie by genre
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre.");
  }
});

//READ get director by name
app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such director.");
  }
});

//DELETE movies from user's list
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array.`);
  } else {
    res.status(400).send("no such user");
  }
});

//DELETE user accounts
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted.`);
  } else {
    res.status(400).send("no such user");
  }
});

//error handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});