import firebase from 'firebase';
import config from './config';

const connection = firebase.initializeApp(config);
export const db = connection.database();