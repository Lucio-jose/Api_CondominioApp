/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

async function sendMail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        ...CONSTANTS.auth,
        accessToken,
      },
    });

    const mailOptions = {
      ...CONSTANTS.mailoptions,
      text: 'The Gmail API with NodeJS works',
    };

    const result = await transport.sendMail(mailOptions);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
