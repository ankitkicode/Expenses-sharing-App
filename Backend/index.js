const express  =  require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const dbConnection = require('./database/dbConnetion');
const expenseRoutes = require('./routes/expenses');
const cors = require('cors');


dbConnection();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', expenseRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
