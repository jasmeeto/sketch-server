# Sketch Server

A real time multi-user sketch applicaion, implemented in node.js along with Omni.js framework.

Check out a demo at [http://sketch-server.herokuapp.com/](http://sketch-server.herokuapp.com/). 

Now with room support. To use, click 'New Room' to open up your own private canvas. The redirected unique URL will point to your own personal room that can be accessed by anyone who knows it. Just open two tabs for that URL and draw in realtime.

## Installation

Just run the following to install and run the app locally:

```bash
$ git clone https://github.com/jasmeeto/sketch-server.git
$ cd sketch-server
$ npm install
$ node app.js
```

Note: node-canvas requires Cairo to build. Refer to [this link](https://github.com/LearnBoost/node-canvas/wiki/_pages) for system-specific installation instructions.
