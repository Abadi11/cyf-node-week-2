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
    console.log(newObj)
    albumsData.push(newObj)
    res.sendStatus(201).send("Created")
})
app.delete("/albums/:id", (req, res) => {
  // find album and make sure it's there => use findIndex method to get the index
  // if not there (index === -1) => 404 not found
  // if is there => use splice(index, 1) to remove the element at index
  // response.sendStatus(204)
});
app.put("/albums/:id", (req, res) => {
  // find album (and make sure it's there) => use findIndex method to get the index
  // if not there (index === -1) => 404 not found
  // updatedAlbum = req.body
  // (optionally) check that the albumId of updatedAlbum is correct
  // albumsData[index] = updatedAlbum
  // reponse.sendStatus(204)
});
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
