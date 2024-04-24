const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // prove to the server we're on the nice list
  const nameToVerify = "Ross Schinner"
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === nameToVerify);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    nameToVerify,
  });

  console.log({ gift });
}

main();