/* eslint-disable no-console */

var express = require('express');
var graphqlHttp = require('express-graphql');
var schema = require('./schema/schema');
var app = express();

app.use('/graphql', graphqlHttp({schema: schema}));
app.use('/relay', express.static('./node_modules/react-relay/dist'));
app.use('/', express.static('./public'));
app.listen(3000, function() { console.log('Listening on 3000...'); });
