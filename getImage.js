const {fetchData, domain} = require('./fetchData');
const fs = require('fs');
const util = require('util');

const access = util.promisify(fs.access);

const getFileName = (urlText) => {
    const urlObj = new URL(`https://qinshixixing-bing-image.herokuapp.com${urlText}`);
    return urlObj.searchParams.get('id');
};

const getImage = async (urlText) => {
    const name = getFileName(urlText);
    const path = `./images/${name}`;
    let data;
    try {
        await access(path, fs.constants.F_OK | fs.constants.R_OK);
        console.log(`${path} exists, and it is writable`);
    } catch (err) {
        console.log(`${path} doesn't exist`);
        data = await fetchData(urlText);
    }
    return data;
}

exports.getFileName = getFileName;
exports.getImage = getImage;
