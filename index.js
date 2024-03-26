const express = require('express')
const app = express();
const port = 5006
const handlebars = require('express-handlebars')
const helper = require('./helpers/helpers')
const session = require('express-session') 
const mySQLStore = require('express-mysql-session')(session);  // MYSQL SESSION 
const config = require('./connection/db_config')
const methodOverride = require('method-override')  // USED TO OVERRIDE THE METHOD (In this case, to ovveride POST method to DELETE method)
const sessionStore = new mySQLStore(config)  // consfiguring session-mysql
const flash = require('express-flash') // USED TO SHOW A FLASH MESSAGE
const passport = require('passport') // USED FOR AUTHENTICATION

app.use(express.urlencoded({extended: true}))       // middleware to decode (FOR FORM)
app.use(express.json())                             // middleware to decode (FOR JSON)


app.use(session({                               
    secret:"secret key",
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))


app.use(flash()); // Middleware to check error
app.use(methodOverride('_method')); // Middleware to override the method

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session for authentication

let hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutDir: 'views/layouts/',
    helpers: helper,
});

app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);


app.use('/static', express.static(__dirname + '/public'))


//---------------------------------------------------Routes

const Adminroutes = require("./routes/Admin/index");
const userRoute = require('./routes/User/index');



app.use('/admin', Adminroutes);
app.use('/user', userRoute)



//----------------------------------------USING SESSION AND FLASH




app.listen(port ,()=>{
    console.log(`App Listening On ${port} Port `)
})



