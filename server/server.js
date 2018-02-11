const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

var app = express();

const publicPath = express.static(path.join(__dirname, '../public'));

app.use(publicPath);
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});