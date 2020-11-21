var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var doc_functions = require('./utils/google');

var googleRouter = require('./routes/google');
var authRouter = require('./routes/auth');
var participantsRouter = require('./routes/participant');
var positionsRouter = require('./routes/positions');
var projectsRouter = require('./routes/projects');
var curatorsRouter = require('./routes/curators');
var firmsRouter = require('./routes/firms');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function loadGoogle() {
    await doc_functions.loadDoc();
    await doc_functions.loadParticipantsWithDays();
}

loadGoogle();

app.use('/google', googleRouter);
app.use('/positions', positionsRouter);
app.use('/projects', projectsRouter);
app.use('/participants', participantsRouter);
app.use('/auth', authRouter);
app.use('/firms', firmsRouter);
app.use('/curators', curatorsRouter);

module.exports = app;
