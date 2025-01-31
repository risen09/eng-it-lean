const axios = require('axios');
const https = require('https');
const fs = require('fs');
const qs = require('querystring');
const uuid = require('uuid');

const router = require('express').Router();

// vercel/ai package
const ai = require('./ai');
// gigachat provider for vercel/ai
const gigachatProvider = require('./gigachat');

module.exports = router;

const path = require('path');
//process.env.NODE_EXTRA_CA_CERTS= path.resolve(__dirname, 'certs')
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

process.env.GIGACHAT_AUTH =
  'NWVjYTczYjctNWRkYi00NzExLTg0YTEtMjhlOWVmODM2MjI4OjlmMTBkMGVkLWZjZjktNGZhOS1hNDZjLTc5ZWU1YzExOGExMw==';

const agent = new https.Agent({
  rejectUnauthorized: false
});

const gigachat = gigachatProvider.createGigachat({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'text/event-stream'
  },
  fetch: (url, options) => {
    return axios({
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: options.headers,
      httpsAgent: agent,
      data: options.body
    }).then((response) => {
      return new Response(response.data, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: response.data
      });
    }).catch((error) => {
      return new Response(error.message, {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        body: error.response.data
      });
    });
  }
});

router.use(async (req, res, next) => {
  const hasToken = process.env.GIGACHAT_ACCESS_TOKEN && process.env.GIGACHAT_EXPIRES_AT != null;
  const hasExpired = new Date(process.env.GIGACHAT_EXPIRES_AT) <= new Date();
  if (!hasToken || hasExpired) {
    let auth = process.env.GIGACHAT_AUTH;
    let rquid = uuid.v4();

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        RqUID: rquid,
        Authorization: 'Basic ' + auth
      },
      httpsAgent: agent,
      data: qs.stringify({
        scope: 'GIGACHAT_API_PERS'
      })
    };

    try {
      const response = await axios(config);
      const json = response.data;
      process.env.GIGACHAT_ACCESS_TOKEN = json.access_token;
      process.env.GIGACHAT_EXPIRES_AT = json.expires_at;
      console.log(JSON.stringify(response.data));
    } catch {
      console.log(error);
    }
  }
  next();
});

router.post('/chat', async (req, res) => {
  const { messages } = req.body;

  const result = ai.streamText({
    model: gigachat('GigaChat'),
    system: 'You are a helpful assistant.',
    messages,
    stream: true,
    update_interval: 0.2
  });

  result.pipeDataStreamToResponse(res);
});

router.post('/new-unit', async (req, res) => {
  const { prompt } = req.body;

  const systemMessage = `
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
    `;

  try {
    const result = ai.streamText({
      model: gigachat('GigaChat'),
      system: systemMessage,
      prompt,
      stream: true,
      update_interval: 0.3
    });

    result.pipeTextStreamToResponse(res);
  } catch (e) {
    console.log(e);
  }
});
