const express = require('express');
const { schoolRouter } = require('./routes/school_route');
const { connect_db } = require('./db');
const app = express();

connect_db();
app.use(express.json());

app.use('/api/v1/schoolRoute', schoolRouter);

app.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Server is working'
    })
})

app.listen(80, () => {
    console.log('server is runing', 80);
})