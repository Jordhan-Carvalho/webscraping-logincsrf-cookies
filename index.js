/* eslint-disable prettier/prettier */
const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {

    console.log('Initial request to get the token value');
  const initialRequest = await request({
    uri: 'http://quotes.toscrape.com/login',
    method: 'GET',
    gzip: true,
    resolveWithFullResponse: true,
  });

  // Parsing the cookies
 let cookie = initialRequest.headers['set-cookie'].map(value => value.split(';')[0]).join(' ');

  const $ = cheerio.load(initialRequest.body);

  const csrfToken = $('input[name="csrf_token"]').val();

  console.log('POST request to login on the form');

  try {
    const loginRequest = await request({
        uri:'http://quotes.toscrape.com/login',
        method: 'POST',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'quotes.toscrape.com',
            'Origin': 'http://quotes.toscrape.com',
            'Referer': 'http://quotes.toscrape.com/login',
            'Cookie': cookie,
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
        },
        formData: {
            csrf_token: csrfToken,
            username: 'admin',
            password: 'admin'
        },
        resolveWithFullResponse: true,
        gzip: true,
      });
  } catch (error) {
        // Parsing the cookies
    cookie = error.response.headers['set-cookie'].map(value => value.split(';')[0]).join(' ');
  }

  console.log('Logged in request');
  const loggedInResponse = await request({
    uri:'http://quotes.toscrape.com/',
    method: 'GET',
    gzip: true,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'quotes.toscrape.com',
        'Origin': 'http://quotes.toscrape.com',
        'Referer': 'http://quotes.toscrape.com/login',
        'Cookie': cookie,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
    },
  })
 

})();
