/* eslint-disable max-len */
// Função auxiliar de geração de configurações de solicitação
// Todas as APIs que construímos no Node.js acabarão interagindo com uma API do Gmail para buscar algumas informações. Instalamos o axios anteriormente para nos ajudar a fazer essas solicitações HTTP de nosso aplicativo Node.

// Cada uma dessas solicitações terá algumas configurações, como método de solicitação, URL e cabeçalhos. Criaremos um arquivo utils.js comum dentro do diretório raiz com a seguinte função auxiliar:

const generateConfig = (url, accessToken) => ({
  method: 'get',
  url,
  headers: {
    Authorization: `Bearer ${accessToken} `,
    'Content-type': 'application/json',
  },
});

export default { generateConfig };
