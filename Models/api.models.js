
const fsp = require('fs/promises')
// const endpointsData = require()

exports.fetchApi=(()=>{
    const contentOfFiles = fsp.readFile('./ncNewsEndpoints.json','utf-8');
    return contentOfFiles;
})