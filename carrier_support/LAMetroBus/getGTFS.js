// getGTFS.js url path
//import fetch from 'node-fetch';

const fetch = require('node-fetch');  // uses version 2 of node-fetch!!!
const fs = require('fs');
const { exec } = require('child_process');
const unzipper = require('unzipper');

const downloadFile = (async (url, path) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
      console.log(res.headers);
    });
});

const unzipFile = (async (path) => {
    /*
  await new Promise((resolve, reject) => {
     fs.createReadStream(path)
          .pipe(unzipper.Extract({ path: 'data' }))
          .on('close', ()=>{
              resolve();
          });
     });
  */
  exec('unzip ' + path + " -d data", (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
});

// main

var url = process.argv[2];
var path = process.argv[3];
console.log("getGTFS.js " + url + " " + path);
downloadFile(url, path); 
//unzipFile(path);
console.log("  complete");
