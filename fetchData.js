const https = require('https');

const domain = 'www.bing.com';

const fetchData = (urlText) => {
    const options = {
        hostname: domain,
        port: 443,
        path: urlText
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            // res.setEncoding('utf8');
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    data = JSON.parse(data);
                } catch (e) {}
                resolve(data)
            });
        });
        req.on('error', (e) => {
            reject(e);
        });
        req.end();
    });
}

exports.domain = domain;
exports.fetchData = fetchData;
