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
      "Discription": "Short for Science Fiction, Sci-Fi, is a genre that usually depicts futuristic settings or ideas."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAvatar-14X20-Original-Poster-Cameron%2Fdp%2FB00BLRFZ2E&psig=AOvVaw0qG52VxcbrykG26_nB_NMD&ust=1668880363758000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLiZgPyluPsCFQAAAAAdAAAAABAE",
    "Features": False
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
      "Discription": "Short for Science Fiction, Sci-Fi, is a genre that usually depicts futuristic settings or ideas."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.movieposters.com%2Fproducts%2Fstar-wars-episode-v-the-empire-strikes-back-mpw-91057&psig=AOvVaw0GSFvTHO-R-u_gEYrBoEnF&ust=1668880446653000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKDbyKOmuPsCFQAAAAAdAAAAABAF",
    "Features": False
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
      "Discription": "A comedy is designed to be funny."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FKnights-Tale-POSTER-Movie-Inches%2Fdp%2FB00KK6JCAI&psig=AOvVaw2_eOQXL0YBK3l8rhxURUJx&ust=1668880477112000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJD2-LGmuPsCFQAAAAAdAAAAABAE",
    "Features": False
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
      "Discription": "A comedy is designed to be funny."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FWaynes-World-Movie-Poster-11x17%2Fdp%2FB00K0JPZ6K&psig=AOvVaw2kPZ7UysZN9LxZhPeeqsDC&ust=1668880493968000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLj_nrqmuPsCFQAAAAAdAAAAABAE",
    "Features": False
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
      "Discription": "Thrillers invoke feelings of suspense, anticiation, and anxiety."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FAliens-Movie-Poster-24-x36%2Fdp%2FB011D4O4H6&psig=AOvVaw1llmCPfjNUSzmk6mjlNkVq&ust=1668880506969000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjVmsCmuPsCFQAAAAAdAAAAABAE",
    "Features": False
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
      "Discription": "Action usually has events that include violence and distruction."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FPrince-Thieves-Poster-Costner-Freeman%2Fdp%2FB000KA5YAQ&psig=AOvVaw13arFsQOETd_dlHffzCmYL&ust=1668880525726000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKCYlsmmuPsCFQAAAAAdAAAAABAE",
    "Features": False
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
      "Discription": "A comedy is designed to be funny."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.allposters.com%2F-sp%2FYes-Man-Posters_i8031466_.htm&psig=AOvVaw3WXOOdxIGCoVkoGHSAqEbO&ust=1668880541149000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLC7udCmuPsCFQAAAAAdAAAAABAE",
    "Features": False
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
      "Discription": "Fantasy usually depicts mythology and folklore with magic."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FLord-Rings-Movie-Poster-24x36%2Fdp%2FB07D96K2QK&psig=AOvVaw1Qb5ubswai_RF4Lb2rMnOY&ust=1668880564660000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCODH4tumuPsCFQAAAAAdAAAAABAE",
    "Features": False
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
      "Discription": "A comedy is designed to be funny."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2F27-Major-Payne-Movie-Poster%2Fdp%2FB002CT75WS&psig=AOvVaw2Sc9R2DJP5tCR0qzuSlmM-&ust=1668880581576000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPDQ4eOmuPsCFQAAAAAdAAAAABAE",
    "Features": False
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
      "Discription": "Action usually has events that include violence and distruction."
    },
    "imageURL":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FBATMAN-BEGINS-ORIGINAL-Version-CHRISTIAN%2Fdp%2FB00B65USAK&psig=AOvVaw3EfTGbYrW3ph8F_3t6DB36&ust=1668880597854000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCIjnv-umuPsCFQAAAAAdAAAAABAE",
    "Features": False
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