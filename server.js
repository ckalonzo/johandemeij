const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static('johan-app/build'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'johan-app', 'build', 'index.html'));
});

const port = process.env.PORT || 5021;

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});