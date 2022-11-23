require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./src/api/routes/users');
const errorHandler = require('./src/api/helpers/error');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ message: "server is running.." })
});

app.use('/api/user', userRoute);
// Error handling
app.use(function (req, res, next) {
    let err = new Error("Not found");
    err.status = 404;
    next(err);
});
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is listening on port ${process.env.PORT}...`);
})