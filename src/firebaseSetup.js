import firebase from 'firebase';
import config from './config';

export const connection = firebase.initializeApp(config);
export const db = connection.database();