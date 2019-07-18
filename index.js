var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs')
cookieParser = require('cookie-parser');
var cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "secretkey23456";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// serving angular files
app.use(express.static('build'));
app.get('/', (req, response) => {
  fs.readFile("build/index.html", (err, data) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end(data);
  });
});

const PORT = process.env.PORT || 4000;
var MongoClient = require('mongodb').MongoClient;

// API end points
app.post('/login', (req, res) => {
  connectMongoDB(req, res);
});

app.post('/refresh', (req, res) => {
  refresh(req, res);
});

app.post('/signup', (req, res) => {
  connectMongoDB(req, res);
});

app.get('/get-data', (req, res) => {
  connectMongoDB(req, res);
});

app.post('/send-data', (req, res) => {
  connectMongoDB(req, res);
});

// ******end ******

function connectMongoDB(req, res) {
  var url = "mongodb://localhost:27017/data";
  if (process.env.PASSWORD) {
    // need to double encode username and password
    const password = encodeURIComponent(encodeURIComponent(process.env.PASSWORD));
    url = 'mongodb+srv://gulfam:' + password + '@cluster0-eqhd9.mongodb.net/test?retryWrites=true';
  }
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    if (req.url == '/login') {
      fetchDatabaseResults(req, res, db)
    } else if (req.url == '/signup') {
      writeIntoDabase(req, res, db)
    } else if (req.url == '/get-data') {
      getData(req, res, db)
    } else if (req.url == '/send-data') {
      sendData(req, res, db)
    }
    else if (req.url == '/test-paper') {
      fetchTests(req, res, db)
    }
  });
}

function fetchDatabaseResults(req, res, db) {
  var dbo = db.db("amtica");
  dbo.collection("login").find({}).toArray(function (err, dbResult) {
    if (err) throw err;
    authenticateUser(req, dbResult, res)
    db.close();
  });
}

function authenticateUser(req, dbResult, res) {
  var data = '';
  for (var i = 0; i < dbResult.length; i++) {
    if (dbResult[i].email == req.body.email && bcrypt.compareSync(req.body.password, dbResult[i].password)) {
      data = dbResult[i];
    }
  }
  if (data) {
    var userInfo = userInformation(data)
    console.log('successfully login');

    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign(userInfo, SECRET_KEY, {
      expiresIn: expiresIn
    });

    res.cookie('token', accessToken, { maxAge: expiresIn * 1000 })
    res.end(JSON.stringify({ "user": userInfo, "access_token": accessToken, "expires_in": expiresIn }));
  } else {
    res.end(null);
    console.log('please check your email and password')
  }
}

function userInformation(userData) {
  var userInfo = {
    'name': userData.name,
    'email': userData.email,
    'id': userData._id,
    'usertype': userData['usertype'],
    'loginData': Date()
  }

  currectUser = userInfo;
  return userInfo;
}


// sign up
function writeIntoDabase(req, res, db) {
  var dbo = db.db("amtica");
  dbo.collection("login").find({}).toArray((err, dbResult) => {
    if (err) throw err;
    var user = false;
    for (var i = 0; i < dbResult.length; i++) {
      if (dbResult[i].email == req.body.email) {
        console.log('user already exists');
        user = true;
        break;
      }
    }
    if (user) {
      res.end(null);
    } else {
      var user = {
        name: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        usertype: req.body.usertype
      }
      dbo.collection("login").insertOne(user, (err, response) => {
        if (err) throw err;

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign(user, SECRET_KEY, {
          expiresIn: expiresIn
        });

        res.cookie('token', accessToken, { maxAge: expiresIn * 1000 });

        res.end(JSON.stringify({
          "user": user, "access_token": accessToken, "expires_in": expiresIn
        }));
        console.log("1 record inserted");
        db.close();
      });
    }
    db.close();
  });
}

function sendData(req, res, db) {
  var dbo = db.db("amtica");
  dbo.collection("login").find({}).toArray((err, dbResult) => {
    if (err) throw err;
    var user = false;
    for (var i = 0; i < dbResult.length; i++) {
      if (dbResult[i].email == req.body.email) {
        console.log('user already exists');
        user = true;
        break;
      }
    }
    if (user) {
      res.end(null);
    } else {
      var user = {
        name: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        usertype: req.body.usertype,
        tasks: req.body.tasks
      }
      dbo.collection("login").insertOne(user, (err, response) => {
        if (err) throw err;
        res.end(JSON.stringify({
          "user": user
        }));
        console.log("1 record inserted");
        db.close();
      });
    }
    db.close();
  });
}

function getData(req, res, db) {
  var dbo = db.db("amtica");
  dbo.collection("login").find({}).toArray((err, dbResult) => {
    if (err) throw err;
    let data = {};
    for (var i = 0; i < dbResult.length; i++) {
      console.log(dbResult[i], req.body.email)
      if (dbResult[i].email == req.body.email) {
        data = dbResult[i];
        break;
      }
    }
    res.end(JSON.stringify(data));
    console.log("fetcing data....");
    db.close();
  });
}

//adding paper test
function addPaper(req, res, db) {
  var dbo = db.db("amtica");
  dbo.collection("test").insertOne({ 'test': req.body }, (err, response) => {
    if (err) throw err;
    res.end(JSON.stringify(req.body));
    console.log("1 record inserted");
    db.close();
  });
}


function refresh(req, res) {
  // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
  const token = req.cookies.token

  if (!token) {
    return res.status(401).end()
  }

  var payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return res.status(400).end()
  }
  // (END) The code uptil this point is the same as the first part of the `welcome` route

  // We ensure that a new token is not issued until enough time has elapsed
  // In this case, a new token will only be issued if the old token is within
  // 30 seconds of expiry. Otherwise, return a bad request status
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  if (payload.exp - nowUnixSeconds > 30) {
    return res.status(400).end()
  }

  // Now, create a new token for the current user, with a renewed expiration time
  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })

  // Set the new token as the users `token` cookie
  res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
  res.end()
}


// start the server
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
console.log('Server started! At post' + PORT);