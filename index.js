'use strict'

/**
 * Module dependencies.
 */

var assert = require('assert')


/**
 * Expose the middleware.
 */

module.exports = function(req, res, next) {

  assert(req.session, 'req.session is required!')

  if (!req.session.flash) {

    req.session.flash = {}

  }

  res.locals.flash = pull(req.session)

  res.flash = push

  next()

}

/**
 * Return the flash object from the session and delete the old state. 
 *
 * @param {Object} the session object
 * @api public
 */

function pull(session) {

  var flash = session.flash

  delete session.flash

  return flash
}

/**
 * Push the notification details to the current flash object. 
 *
 * @param {Object} the session object
 * @api public
 */

function push(message, details) {

  var flash = this.req.session.flash || {}

  if (message instanceof Error) {

    flash.err = message.toString()

  } else {

    flash[message] = details || {}

  }

  this.req.session.flash = flash

}