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

voteController.getVotes = async (req, res, next) =>{
  try{
    const query = 'SELECT questions_id, yes_vote, no_vote FROM users_questions';
    const allVotes = await db.query(query);
    const votes = allVotes.rows;
    res.locals.votes = votes;
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
      res.locals.userId.rows[0].user_id,
      req.body.questionId,
      req.body.yes,
      req.body.no,
    ];
    console.log('body:', body);
    const query = 'INSERT INTO users_questions(users_id, questions_id, yes_vote, no_vote) VALUES ($1,$2,$3,$4)'
    //const query = `UPDATE questions SET ${req.body.answer} = ${req.body.answer} + 1 WHERE id = ($1) RETURNING *` ;
    console.log('query String:', query);
    const allQuestions = await db.query(query, body);
    const questions = allQuestions.rows;
    res.locals.questions = questions;
    return next();

}catch(err){
    console.log('voteController.answerQuestions catch:', err);
    next({
        log: 'getQuestions',
        message: {
          err: 'voteController.getQuestions ERROR: Check server logs for details',
        },
      });
  }
}

module.exports = voteController;