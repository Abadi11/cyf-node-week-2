const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");

// get the full list of albums
const albumsData = require("./albums");

const app = express();

app.use(express.json());
app.use(cors());

// Get an ID number that hasn't already been used in albums
function newID() {
  // Get list of IDs
  let ids = albumsData.map((el) => el.albumId).sort();
  let nextId = 1;
  // check if id string is taken
  while (ids.includes(`${nextId}`)) {
    nextId++;
  }
  return String(nextId);
}

app.get("/albums", (request, response) => {
  response.status(200).send(albumsData);
});
app.get("/albums/:id", (req, res) => {
  const id = Number(req.params.id);
  const idAlbum = albumsData[id];
  res.status(200).send(idAlbum);
});
app.post("/albums", (req, res) => {
  console.log(req.body);
  const newObj = {
    albumId: newID(),
    artistName: req.body.artistName,
    collectionName: req.body.collectionName,
    artworkUrl100: req.body.artworkUrl100,
    releaseDate: req.body.releaseDate,
    primaryGenreName: req.body.primaryGenreName,
    url: req.body.url,
  };
  console.log(newObj);
  albumsData.push(newObj);
  res.sendStatus(201).send("Created");
});
app.delete("/albums/:id", (req, res) => {
  let idUpdate = req.params.id;
  // find album and make sure it's there => use findIndex method to get the index
  let idIndex = albumsData.findIndex((album) => album.albumId === idUpdate);
  // if not there (index === -1) => 404 not found
  if (idIndex > -1) {
    albumsData.splice(idIndex, 1);
    res.send(albumsData).sendStatus(204);
  } else {
    res.status(404).send("Not Found");
  }
  // if is there => use splice(index, 1) to remove the element at index
  // response.sendStatus(204)
});
app.put("/albums/:id", (req, res) => {
  let idUpdate = req.params.id;
  let updatedAlbum = req.body;
  // find album (and make sure it's there) => use findIndex method to get the index
  let idIndex = albumsData.findIndex((album) => album.albumId === idUpdate);
  // if not there (index === -1) => 404 not found
  // updatedAlbum = req.body
  // (optionally) check that the albumId of updatedAlbum is correct
  // albumsData[index] = updatedAlbum
  // reponse.sendStatus(204)
  if (idUpdate != Number(updatedAlbum.albumId)){
    res.sendStatus(400).send("Please id in URL should match id you want to update")
  }else if (idIndex > -1 ) {
    console.log("djfvh");
    albumsData[idIndex] = updatedAlbum;
    res.send(albumsData).sendStatus(204);
  } else {
    res.status(404).send("Not Found");
  }
});
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
