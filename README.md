Usage
-------

```console
$ npm install
$ npm run build
$ npm start
```

Then go to [http://localhost:3000](http://localhost:3000).


NPM scripts:
```
"start": "node server.js",
"dev": "npm run build && npm run watch",
"build": "npm run build:schema && npm run build:browser",
"build:schema": "node ./utils/updateSchema.js",
"build:browser": "browserify browser.js -o public/bundle.js",
"watch": "parallelshell 'npm run watch:schema' 'npm run watch:browser' 'npm run watch:server'",
"watch:schema": "onchange schema/schema.js -- npm run build:schema",
"watch:browser": "onchange browser.js App.js schema/schema.json -- npm run build:browser",
"watch:server": "nodemon --watch server.js --watch 'schema/*.js' server.js"
```


For development you can use:

```console
$ npm run dev
```
