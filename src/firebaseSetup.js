import firebase from 'firebase';
import config from './config';

const isProd = process.env.npm_lifecycle_event === 'build';

const connection = firebase.initializeApp(config);
const db = connection.database();
export const cartRef = isProd ? db.ref('cart') :  db.ref('cart-test');

// export default cartRef;
