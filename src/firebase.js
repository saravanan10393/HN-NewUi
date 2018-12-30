import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAtaALTovABrZsBi5HxN9J9M7pApVsJ8lk",
  projectId: "myself-1606b",
  databaseURL: "https://hacker-news.firebaseio.com",
};
firebase.initializeApp(config);

export default new firebase.database().ref("/v0/");