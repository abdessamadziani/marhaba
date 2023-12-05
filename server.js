

require('dotenv').config();
const express = require('express');

const app = express();
const swagger = require('./swagger');

swagger(app)
const connectDB = require('./server/config/db');
const clientRoutes = require('./routes/clients');
const expressValidator = require('express-validator');
const cors=require('cors')
const cookieParser = require('cookie-parser');
const port = 4000;

connectDB();

app.use(express.json());

app.use(expressValidator());
app.use(cors())



app.use(cookieParser());

// Routes middleware
app.use('/api/users', clientRoutes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
