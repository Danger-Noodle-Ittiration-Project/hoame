const db = require('../models/hoameModels');

const voteController = {};

voteController.getQuestions = async (req,res,next)=>{
    try{
        const query = 'SELECT * FROM questions';
        const allQuestions = await db.query(query);

        const questions = allQuestions.rows;
        res.locals.questions = questions;
        return next();

    }catch(err){
        console.log('voteController.getQuestions catch:', err);
        next({
            log: 'getQuestions',
            message: {
              err: 'voteController.getQuestions ERROR: Check server logs for details',
            },
          });
    }
}

module.exports = voteController;