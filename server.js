const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static('cocomatl-app/build'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'cocomatl-app', 'build', 'index.html'));
});

const port = process.env.PORT || 5020;

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});