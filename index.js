const express = require('express');
const {getUrl} = require('./getUrl');
const {getFileName} = require('./getImage');

const PORT = process.env.PORT || 5000

const app = express();

// app.use(express.static(path.join(__dirname, 'images')));

app.get('/', async (req, res) => {
    let isItl;
    if (req.query && req.query.isItl === '1') isItl = true;
    const url = await getUrl(isItl);
    const name = getFileName(url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/json;charset=utf-8');
    res.send(JSON.stringify({url, name}));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
