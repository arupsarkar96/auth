import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import configuration from './config/config';
import v1Route from './routes/v1';

const app = express();

app.set('trust proxy', 1);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use('/v1', v1Route);

app.listen(configuration.PORT, '0.0.0.0', () => {
    console.log('App is running on PORT', configuration.PORT);
});
