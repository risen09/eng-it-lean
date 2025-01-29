const https = require('follow-redirects').https;
const fs = require('fs');
const qs = require('querystring');
const uuid = require('uuid');

const router = require('express').Router();

// vercel/ai package
const ai = require('./ai')
// gigachat provider for vercel/ai
const gigachatProvider = require('./gigachat')

module.exports = router;

const path = require('path')
process.env.NODE_EXTRA_CA_CERTS= path.resolve(__dirname, 'certs')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

process.env.GIGACHAT_AUTH = 'NWVjYTczYjctNWRkYi00NzExLTg0YTEtMjhlOWVmODM2MjI4OjlmMTBkMGVkLWZjZjktNGZhOS1hNDZjLTc5ZWU1YzExOGExMw=='

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
    let auth = process.env.GIGACHAT_AUTH;
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

router.post('/new-unit', async (req, res) => {
  const { prompt } = req.body;

  const result =  ai.streamText({
    model: gigachat('GigaChat'),
    system:`
    Я хочу, чтобы вы выступали в роли помощника для создания продвинутых текстовых уроков английского языка. Я буду указывать тему и уровень сложности (начинающий, средний, продвинутый), а вы будете предоставлять структурированный план урока в формате Markdown. Урок должен включать только текстовые элементы (без видео, картинок, аудио) и содержать следующие разделы:
    -Цель урока — конкретный навык или знание, которое освоят студенты.
    -Лексика
      -Базовые термины: 5-7 слов/фраз с примерами употребления.
      -Расширенная лексика: 3-5 идиом, фразовых глаголов или сложных выражений (для среднего/продвинутого уровня).
    -Грамматический фокус
      -Правило с пояснением и 3-5 примерами.
      -Типичные ошибки и как их избежать.
    -Контекстуализация
      -Короткий текст (диалог, статья, описание) для анализа с использованием лексики и грамматики урока.
    -Упражнения
      -Письменное задание: например, составить предложения/эссе по теме.
      -Устная практика: ролевые диалоги (текстовые сценарии), описание ситуаций.
      -Аналитическое задание: исправление ошибок в предложениях, перевод сложных конструкций.
    -Домашнее задание
      Текстовые задачи: написание текста, грамматические тесты, поиск синонимов/антонимов.
    Ответ должен быть оформлен в Markdown, лаконичным, без лишних комментариев, если пишешь блок кода, начинай его с новой строки.
    `,
    prompt,
    stream: true,
    update_interval: 0.3,
  });

  result.pipeDataStreamToResponse(res);
});
