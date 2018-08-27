import firebase from 'firebase';
import config from '../config';

export const isProd = process.env.NODE_ENV === 'production';
const connection = firebase.initializeApp(config);
const db = connection.database();
export const cartRef = isProd ? db.ref('cart') :  db.ref('cart-test');
