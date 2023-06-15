var request = new XMLHttpRequest();
request.onreadystatechange = e => {
    if (request.readyState !== 4) {
        return;
    }

    if (request.status === 200) {
        console.log('success', request.responseText);
    } else {
        console.warn('error');
    }
};

request.open('GET', 'https://mywebsite.com/endpoint/');
request.send();