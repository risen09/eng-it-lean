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

router.post('/chat', (req, res) => {
  const { messages } = req.body;

  const result = ai.streamText({
    model: gigachat('GigaChat'),
    system: 'You are a helpful assistant.',
    messages,
    maxTokens: 5,
    stream: true
  });

  return result.toDataStreamResponse();
})