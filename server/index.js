const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require("../utils/MerkleTree")

const port = 1225;

const app = express();
app.use(express.json());

const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { proof, nameToVerify } = req.body;

  // prove that a name is in the list 
  const isInTheList = verifyProof(proof,nameToVerify,MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
