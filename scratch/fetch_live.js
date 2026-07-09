const https = require('https');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log('HTTP Status:', res.statusCode);
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const ogImageMatch = data.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) ||
                             data.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
        const ogTitleMatch = data.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
        console.log('og:image:', ogImageMatch ? ogImageMatch[1] : 'NOT FOUND');
        console.log('og:title:', ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND');
        resolve();
      });
    }).on('error', (err) => {
      console.error('Error fetching live page:', err);
      resolve();
    });
  });
}

fetchPage('https://www.leandrovenegas.cl/video/dental-gran-avenida');
