const db = require('../models/hoameModels.js');

const duesController = {};

// r
duesController.checkStatus = async (req, res, next) => {
  try {
    console.log('userId from duesController', res.locals.userId)

    const duesStatusString = 'SELECT * FROM users';
    // const usersResult = await db.query(getUsersString);

    // const users = usersResult.rows;
    // res.locals.users = users;
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