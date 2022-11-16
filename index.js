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
    Title: "Avatar",
    Director: "James Cameron",
    Genre: "Sci-Fi"
  },
  {
    Title: "Star Wars: Episode V",
    Director: "Irvin Kershner",
    Genre: "Sci-Fi"
  },
  {
    Title: "A Knight's Tale",
    Director: "Brian Helgeland",
    Genre: "Action-Comedy"
  },
  {
    Title: "Wayne's World",
    Director: "Penelope Spheeris",
    Genre: "Comedy"
  },
  {
    Title: "Aliens",
    Director: "James Cameron",
    Genre: "Thriller"
  },
  {
    Title: "Robin Hood: Prince of Thieves",
    Director: "Kevin Reynolds",
    Genre: "Action"
  },
  {
    Title: "Yes Man",
    Director: "Peyton Reed",
    Genre: "Comedy"
  },
  {
    Title: "The Lord of the Rings",
    Director: "Peter Jackson",
    Genre: "Fantasy"
  },
  {
    Title: "Major Payne",
    Director: "Nick Castle",
    Genre: "Comedy"
  },
  {
    Title: "Batman: The Dark Knight",
    Director: "Christopher Nolan",
    Genre: "Action"
  }
];

let users =[

];

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
app.get("/movies/:title/:name", (req, res) => {
  const { genre } = req.params;
  const movie = movies.find( movie => movie.Genra === genre );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie.");
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