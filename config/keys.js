if (process.env.NODE_ENV === 'production') {
	// use production host's config variables
  module.exports = require('./prod');
} else {
	// use config variables declared in dev.js –– be sure dev.js is not tracked by git
  module.exports = require('./dev');
};