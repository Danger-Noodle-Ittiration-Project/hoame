const db = require('../models/hoameModels.js');

const duesController = {};

// r
duesController.checkStatus = async (req, res, next) => {
  try {
    const userId = res.locals.userId.rows[0].user_id
    // console.log('userId from duesController', userId)

    const duesStatusString = 'SELECT dues_paid FROM users WHERE id = $1';
    const result = await db.query(duesStatusString, [userId]);
    console.log('query from duesController.checkStatus', result.rows[0].dues_paid);
    
    res.locals.status = result.rows[0].dues_paid;

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