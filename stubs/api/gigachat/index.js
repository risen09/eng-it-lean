const router = require('express').Router();
const gigachatProvider = require('../../../packages/gigachat')
const ai = require('ai')

module.exports = router;

const path = require('path')
process.env.NODE_EXTRA_CA_CERTS= path.resolve(__dirname, 'certs')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const gigachat = gigachatProvider.createGigachat( { 
  apiKey: '<api-key>',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

router.post('/chat', async (req, res) => {
  const { messages } = req.body;

  console.log(messages);

  const result = ai.streamText({
    model: gigachat('GigaChat'),
    system: 'You are a helpful assistant.',
    messages,
    stream: true,
  });

  result.pipeDataStreamToResponse(res);
})