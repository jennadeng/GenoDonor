const express = require('express');
const session = require('express-session');
const genomeLink = require('genomelink-node');
var Promise = require("bluebird");
var fs = require("fs");
var _ = require('lodash');
cacheData();

cachedData = JSON.parse(fs.readFileSync('data.json'))

var num_returned = 0

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(session({
  secret: 'YOURSECRET',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

app.get('/', async (req, res) => {
  const scope = 'report:eye-color report:beard-thickness report:morning-person';
  const authorizeUrl = genomeLink.OAuth.authorizeUrl({ scope: scope });
  // Fetching a protected resource using an OAuth2 token if exists.
  var reports = [];
  if (req.session.oauthToken) {
    const scopes = scope.split(' ');
    reports = await Promise.all(scopes.map( async (name) => {
      return await genomeLink.Report.fetch({
        name: name.replace(/report:/g, ''),
        population: 'european',
        token: req.session.oauthToken
      });
    }));
  }

  res.render('index', {
    authorize_url: authorizeUrl,
    reports: reports,
  });
});

function getUserData(userName){

    var report_types = ['agreeableness','height','alcohol-drinking-behavior','alpha-linolenic-acid','anger','beard-thickness','beta-carotene','bitter-taste','black-hair','bmi','breast-cancer','caffeine-consumption','caffeine-metabolite-ratio','calcium','carbohydrate-intake','childhood-intelligence','colorectal-cancer','conscientiousness','depression','egg-allergy','endurance-performance','extraversion','eye-color','folate','freckles','gambling','gastric-cancer','handedness','harm-avoidance','hearing-function','iron','liver-cancer','lobe-size','longevity','lung-cancer','magnesium','male-pattern-baldness-aga','milk-allergy','morning-person','motion-sickness','myocardial-infarction','neuroticism','nicotine-dependence','novelty-seeking','openness','pancreatic-cancer','peanuts-allergy','phosphorus','prostate-cancer','protein-intake','reading-and-spelling-ability','red-hair','red-wine-liking','response-to-vitamin-e-supplementation','reward-dependence','skin-pigmentation','smell-sensitivity-for-malt','smoking-behavior','type-2-diabetes','vitamin-a','vitamin-b12','vitamin-d','vitamin-e','weight','white-wine-liking','word-reading-ability'];

    var user_promise = _.map(report_types, makePromise);

    function makePromise(n) {
        return genomeLink.Report.fetch({
            name: n,
            population: 'european',
            token: userName
        })
    }

    function parseData (object1, data) {
        var name = _.get(data,'_data.phenotype.url_name');
        if (name != null) {
            object1[name] = data._data.summary.score || 0;
        }
        return object1
    }

    return Promise.all(user_promise)
        .then((data) => {
          var result1 = {};
          num_returned +=1;
          _.reduce(data, parseData, result1);
          result1['name'] = userName;
          return result1
        })
        .catch((err)=>{console.log(err)});

}

results2 = [];

function cacheData() {
    const users = ['GENOMELINKTEST001','GENOMELINKTEST002','GENOMELINKTEST003','GENOMELINKTEST004','GENOMELINKTEST005','GENOMELINKTEST006','GENOMELINKTEST007','GENOMELINKTEST008','GENOMELINKTEST009','GENOMELINKTEST010'];
    for (var i = 0; i < users.length; i++) {
        console.log(users[i])
        Promise.resolve(getUserData(users[i]))
            .then((data) => {
              results2.push(data);
            })
            .catch((err) => {console.log(err);});
    }
}

app.get('/users', async (req, res) => {
    console.log(num_returned);
    if (num_returned != 10){
      res.json(cachedData);
    } else {
        res.json(results2);
        var json = JSON.stringify(results2);
        fs.writeFile('data.json', json, 'utf8');
    }
});




app.get('/callback', async (req, res) => {
  // The user has been redirected back from the provider to your registered
  // callback URL. With this redirection comes an authorization code included
  // in the request URL. We will use that to obtain an access token.
  req.session.oauthToken = await genomeLink.OAuth.token({ requestUrl: req.url });
  console.log(req.session);
  // At this point you can fetch protected resources but lets save
  // the token and show how this is done from a persisted token in index page.
  res.redirect('/');
});

// Run local server on port 3000.
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
