# Ember Tile Blog

It's an Ember blog, with a cool tiling interface..

Neat.

I got the idea from [this](http://www.programwitherik.com/blog-tutorial-with-ember-js/) tutorial and decided to run with it.  In the end, it bears almost zero resemblance to the original blog, so... yeah...


## Prerequisites

You will need the following things installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

```bash
$ git clone https://github.com/Fuiste/ember-tile-blog.git
$ cd ember-tile-blog
$ npm install
$ bower install
```

## Running / Development

This app expects to be able to communicate with [this](https://github.com/Fuiste/tile-blog-backend) backend server somehow.  The simplest way is to run it locally for testing.  See the linked repo for instructions there.

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building

* `ember build` (development)
* `ember build --environment production` (production)

