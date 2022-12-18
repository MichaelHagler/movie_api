//express
const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect("mongodb://127.0.0.1:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("common"));

let auth = require("./auth")(app);

const passport = require("passport");
require("./passport");

// array of 10 favorite movies
let movies = [
  {
    Title: "Avatar",
    Director: {
      Name: "James Cameron",
      Birth: "1954-present",
      Bio: "James Cameron is a filmmaker from Canada. He has made many popular Sci-Fi films",
    },
    Genre: {
      Name: "Sci-Fi",
      Description:
        "Short for Science Fiction, Sci-Fi, is a genre that usually depicts futuristic settings or ideas.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0499549/mediaviewer/rm371527425/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "Star Wars: Episode V",
    Director: {
      Name: "Irvin Kershner",
      Birth: "1923-2010",
      Bio: "Irvin was a director, actor, producer, and an instructor at USC.",
    },
    Genre: {
      Name: "Sci-Fi",
      Description:
        "Short for Science Fiction, Sci-Fi, is a genre that usually depicts futuristic settings or ideas.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0080684/mediaviewer/rm3114097664/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "A Knight's Tale",
    Director: {
      Name: "Brian Helgeland",
      Birth: "1961-present",
      Bio: "Brian recieve an Academy Award and Razzie in the same year. He directed popular horror films like Freddy Krueger and A nightmare of Elm Street 4: The Dream Master.",
    },
    Genre: {
      Name: "Comdey",
      Description: "A comedy is designed to be funny.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0183790/mediaviewer/rm3970210048/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "Wayne's World",
    Director: {
      Name: "Penelope Spheeris",
      Birth: "1945-present",
      Bio: "Spheeris earn a Grammy Award nomination for her work in Wayn's World which was also her highest grossing film.",
    },
    Genre: {
      Name: "Comedy",
      Description: "A comedy is designed to be funny.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0105793/mediaviewer/rm3693806848/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "Aliens",
    Director: {
      Name: "James Cameron",
      Birth: "1954-present",
      Bio: "James Cameron is a filmmaker from Canada. He has made many popular Sci-Fi films",
    },
    Genre: {
      Name: "Thriller",
      Description:
        "Thrillers invoke feelings of suspense, anticiation, and anxiety.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0090605/mediaviewer/rm490960896/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "Robin Hood: Prince of Thieves",
    Director: {
      Name: "Kevin Reynolds",
      Birth: "1952-present",
      Bio: "Reynolds started his career by co-writing Red Dawn in 1984, and gave Samuel L. Jackson his first role in One Eight Seven.",
    },
    Genre: {
      Name: "Action",
      Description:
        "Action usually has events that include violence and distruction.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0102798/mediaviewer/rm1060182529/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "Yes Man",
    Director: {
      Name: "Peyton Reed",
      Birth: "1964-present",
      Bio: "Reed's first director roll was for Bring it on and more recently directed Ant-Man and the Wasp.",
    },
    Genre: {
      Name: "Comedy",
      Description: "A comedy is designed to be funny.",
    },
    imageURL:
      "https://www.imdb.com/title/tt1068680/mediaviewer/rm359602176/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "The Lord of the Rings",
    Director: {
      Name: "Sir Peter Jackson",
      Birth: "1961-present",
      Bio: "Sir Peter Jackson best known work is The Lord of the Rings. He was knighted in 2002 by Sir Anand Satyanand.",
    },
    Genre: {
      Name: "Fantasy",
      Description: "Fantasy usually depicts mythology and folklore with magic.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "Major Payne",
    Director: {
      Name: "Nick Castle",
      Birth: "1947-present",
      Bio: "Castle is known for playing as Michael Myers in the 1978 Halloween movie.",
    },
    Genre: {
      Name: "Comedy",
      Description: "A comedy is designed to be funny.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0110443/mediaviewer/rm991907584/?ref_=tt_ov_i",
    Features: true,
  },
  {
    Title: "Batman: the Dark Knight Trilogy",
    Director: {
      Name: "Christopher Nolan",
      Birth: "1970-present",
      Bio: "Nolan is a well known director that was won many awards. Some of his recent works is Dunkirk, Intersteller, and Inception.",
    },
    Genre: {
      Name: "Action",
      Description:
        "Action usually has events that include violence and distruction.",
    },
    imageURL:
      "https://www.imdb.com/title/tt0372784/mediaviewer/rm2827249920/?ref_=tt_ov_i",
    Features: true,
  },
];

let users = [
  {
    id: 1,
    name: "Mary",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "John",
    favoriteMovies: ["The Fountain"],
  },
];

// GET requests
app.get("/", (req, res) => {
  res.status(200).send("Welcome to MyFlix!");
});

//--------MOVIES---------

// READ get all movies
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// READ get movie by title
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).send("Error: " + err);
    });
});

//READ get movie by genre
app.get("/movies/genre/:Name", (req, res) => {
  Movies.findOne({ "genre.Name": req.params.Name })
    .then((genre) => {
      res.json(genre.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ get director by name
app.get("/movies/director/:Name", (req, res) => {
  Movies.findOne({ "director.Name": req.params.Name })
    .then((director) => {
      res.json(director.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//--------USERS---------

//CREATE user
app.post("/users", (req, res) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + "already exists");
      } else {
        Users.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birth_date: req.body.birth_date,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//CREATE add movies to users list
app.post("/users/:username/movies/:Title", (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    { $push: { FavoriteMovies: req.params.Title } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//GET all users
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET user by username
app.get("/users/:username", (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((User) => {
      res.status(200).json(User);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//UPDATE user info
app.put("/users/:username", (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birth_date: req.body.birth_date,
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE users account
app.delete("/users/:username", (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + " was not found");
      } else {
        res.status(200).send(req.params.username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//DELETE movie from users list
app.delete("/users/:username/movies/:Title", (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    { $pull: { FavoriteMovies: req.params.Title } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
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
