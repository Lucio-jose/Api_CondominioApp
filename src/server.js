import app from './app';
import 'dotenv/config';

const port = process.env.PORT||4400;
app.listen(port, () => {
  console.log('server running on port:', port);
});
