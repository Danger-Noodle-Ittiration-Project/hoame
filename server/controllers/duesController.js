const db = require('../models/hoameModels.js');

const duesController = {};

// r
duesController.checkStatus = async (req, res, next) => {
  try {
    console.log('userId from duesController', res.locals.userId)
    const { userId } = res.locals;

    const duesStatusString = 'SELECT dues_paid FROM users WHERE id = $1';
    // const result = await db.query(duesStatusString, [userId]);

    // const
    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'checkStatus',
      message: {
        err: 'duesController.checkStatus ERROR: Check server logs for details',
      },
    });
  }
}

module.exports = duesController;