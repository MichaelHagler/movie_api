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
    "Director": "James Cameron",
    "Genre": {
      "Name": "Sci-Fi"
    }
  },
  {
    "Title": "Star Wars: Episode V",
    "Director": "Irvin Kershner",
    "Genre": {
      "Name": "Sci-Fi"
    }
  },
  {
    "Title": "A Knight's Tale",
    "Director": "Brian Helgeland",
    "Genre": {
      "Name": "Comdey"
    }
  },
  {
    "Title": "Wayne's World",
    "Director": "Penelope Spheeris",
    "Genre": {
      "Name": "Comedy"
    }
  },
  {
    "Title": "Aliens",
    "Director": "James Cameron",
    "Genre": {
      "Name": "Thriller"
    }
  },
  {
    "Title": "Robin Hood: Prince of Thieves",
    "Director": "Kevin Reynolds",
    "Genre": {
      "Name": "Action"
    }
  },
  {
    "Title": "Yes Man",
    "Director": "Peyton Reed",
    "Genre": {
      "Name": "Comedy"
    }
  },
  {
    "Title": "The Lord of the Rings",
    "Director": "Peter Jackson",
    "Genre": {
      "Name": "Fantasy"
    }
  },
  {
    "Title": "Major Payne",
    "Director": "Nick Castle",
    "Genre": {
      "Name": "Comedy"
    }
  },
  {
    "Title": "Batman: The Dark Knight",
    "Director": "Christopher Nolan",
    "Genre": {
      "Name": "Action"
    }
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
app.get("/movies/Director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director === directorName ).Director;

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