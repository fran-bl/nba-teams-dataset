const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/downloads', express.static(path.join(__dirname, 'downloads')))

app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
