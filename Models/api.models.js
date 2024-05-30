
const fsp = require('fs/promises')

exports.fetchApi=(()=>{
    const contentOfFiles = fsp.readFile('./ncNewsEndpoints.json','utf-8');
    return contentOfFiles;
})