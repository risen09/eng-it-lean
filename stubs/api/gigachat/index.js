const https = require('follow-redirects').https;
const fs = require('fs');
const qs = require('querystring');
const uuid = require('uuid');

const router = require('express').Router();
const gigachatProvider = require('./gigachat')
const ai = require('ai')

module.exports = router;

const path = require('path')
process.env.NODE_EXTRA_CA_CERTS= path.resolve(__dirname, 'certs')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

process.env.CLIENT_ID = '<id>'
process.env.CLIENT_SECRET = '<secret>'

const gigachat = gigachatProvider.createGigachat( { 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

router.use((req, res, next) => {
  const hasToken = process.env.GIGACHAT_ACCESS_TOKEN && process.env.GIGACHAT_EXPIRES_AT != null;
  const hasExpired = new Date(process.env.GIGACHAT_EXPIRES_AT) <= new Date();
  if (!hasToken || hasExpired) {
    let auth = btoa(Buffer.from((process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString('base64')));
    let rquid = uuid.v4();
    let options = {
      'method': 'POST',
      'hostname': 'ngw.devices.sberbank.ru',
      'port': 9443,
      'path': '/api/v2/oauth',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'RqUID': rquid,
        'Authorization': 'Basic ' + auth
      },
      'maxRedirects': 20
    };
    
    const req = https.request(options, (response) => {
      let chunks = [];
    
      response.on("data", (chunk) => {
        chunks.push(chunk);
      });
    
      response.on("end", (chunk) => {
        let body = Buffer.concat(chunks);
        console.log(body.toString());
        let json = JSON.parse(body.toString());
        process.env.GIGACHAT_ACCESS_TOKEN = json.access_token;
        process.env.GIGACHAT_EXPIRES_AT = json.expires_at;
      });
    
      response.on("error", (error) => {
        console.error(error);
        res.status(500).send(error);
      });
    });
    
    let postData = qs.stringify({
      'scope': 'GIGACHAT_API_PERS'
    });
    
    req.write(postData);
    req.end();
  }
  next()
});

router.post('/chat', async (req, res) => {
  const { messages } = req.body;

  const result = ai.streamText({
    model: gigachat('GigaChat'),
    system: 'You are a helpful assistant.',
    messages,
    stream: true,
    update_interval: 0.2,
  });

  result.pipeDataStreamToResponse(res);
})