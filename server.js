// Front end dependencies
const path = require('path');
// Backend required dependencies
const express = require('express');
// adding express-session and sequelize store
const session = require('express-session');
// added to use handlebars for html
const exphbs = require('express-handlebars');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Express
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// middleware for sessions
app.use(session(sess));

const helpers = require('./utils/helpers');
// set up handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// inform express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware for backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// adding middleware for public folder to send front end files
app.use(express.static(path.join(__dirname, 'public')));

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});