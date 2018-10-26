import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyDb4JtZo_Gz1isBi2ekVpks_Ke-9k31z9Y",
    authDomain: "yatis-project.firebaseapp.com",
    databaseURL: "https://yatis-project.firebaseio.com",
    projectId: "yatis-project",
    storageBucket: "yatis-project.appspot.com",
    messagingSenderId: "10921245639"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
