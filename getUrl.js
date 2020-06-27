const {fetchData} = require('./fetchData');

const path = '/HPImageArchive.aspx';

const getUrl = async (isItl) => {
    let urlText = path;
    const params = {
        format: 'js',
        idx: 0,
        n: 1,
        pid: 'hp'
    };
    if (isItl) params.ensearch = 1;
    let startFlag = true;
    for (const key in params) {
        urlText += startFlag ? '?' : '&';
        if (startFlag) startFlag = false;
        urlText += `${key}=${params[key]}`;
    }
    const res = await fetchData(urlText);
    let result = '', imageInfo = '';
    if (res && res.images && res.images[0]) imageInfo = res.images[0];
    if (imageInfo && imageInfo.url) result = imageInfo.url;
    return result;
}

exports.getUrl = getUrl;
