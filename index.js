//express
const express = require("express");
const app = express();

//morgan to log all requests
const morgan = require("morgan");

app.use(morgan("common"));


// array of 10 favorite movies
let topMovies = [
  {
    title: "Avatar",
    director: "James Cameron"
  },
  {
    title: "Star Wars: Episode V",
    director: "Irvin Kershner"
  },
  {
    title: "A Knight's Tale",
    director: "Brian Helgeland"
  },
  {
    title: "Wayne's World",
    director: "Penelope Spheeris"
  },
  {
    title: "Aliens",
    director: "James Cameron"
  },
  {
    title: "Robin Hood: Prince of Thieves",
    director: "Kevin Reynolds"
  },
  {
    title: "Yes Man",
    director: "Peyton Reed"
  },
  {
    title: "The Lord of the Rings",
    director: "Peter Jackson"
  },
  {
    title: "Major Payne",
    director: "Nick Castle"
  },
  {
    title: "Batman: The Dark Knight",
    director: "Christopher Nolan"
  }
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to MyFlix!");
});

app.use(express.static("public"));

app.get("/movies", (req, res) => {
  res.json(topMovies);
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