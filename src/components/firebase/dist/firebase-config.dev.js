"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.db = exports.provider = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _storage = require("firebase/storage");

var firebaseConfig = {
  apiKey: "AIzaSyAe2R6dTvTrOxj7EByrWQS1ECXntcqMOho",
  authDomain: "mesenger-69e05.firebaseapp.com",
  projectId: "mesenger-69e05",
  storageBucket: "mesenger-69e05.appspot.com",
  messagingSenderId: "1064522694000",
  appId: "1:1064522694000:web:023a8991e5eb797662e3b5",
  measurementId: "G-SF2H042MF3"
};
var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;
var provider = new _auth.GoogleAuthProvider();
exports.provider = provider;
var db = (0, _firestore.getFirestore)(app);
exports.db = db;
var storage = (0, _storage.getStorage)(app);
exports.storage = storage;