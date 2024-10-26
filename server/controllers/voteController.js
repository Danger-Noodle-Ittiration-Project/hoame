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

voteController.answerQuestions = async (req, res, next) =>{
  try{
    const body = [
      req.params.id,
      req.body.answer
    ]
    const column = body[1] == 'Yes' ?  'yes_count': 'no_count';
    const query = `UPDATE questions SET ${column} = ${column} + 1 WHERE id = ($1)` ;
    const allQuestions = await db.query(query);
    const questions = allQuestions.rows;
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