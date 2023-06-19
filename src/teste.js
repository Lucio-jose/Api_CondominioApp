const express = require('express');

const app = express();
const routes = app;
// eslint-disable-next-line no-multi-assign

routes.post('/', async (req, res) => {
  const { nome } = req.body;
  res.status(200).json({ message: `ola mundo do:${nome}` });
});
app.use(routes)
app.listen(444, () => {
  console.log('servidor rodando');
});
