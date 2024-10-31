import React, { useState, useEffect } from 'react';

const VotingCard = (props) => {

  function helper(event){
    props.func(event.target.value, props.id)
  }

  const adminView = 
  <div>
    <p >Yes: {(props.yesVotes*100/(props.totalVotes > 0 ? props.totalVotes: 1)).toFixed(1)}%</p> 
    <div className='progressBar'>
      <div style={{ width: `${(props.yesVotes*100/(props.totalVotes > 0 ? props.totalVotes: 1))}px`}}></div>
    </div>
    <p>No: {(props.noVotes*100/(props.totalVotes > 0 ? props.totalVotes: 1)).toFixed(1)}%</p>
    <div className='progressBar'>
      <div style={{ width: `${(props.noVotes*100/(props.totalVotes > 0 ? props.totalVotes: 1))}px`}}></div>
    </div>
  </div>
  

  return (
    <div className='questionCard'>
      <h2>{props.title}</h2>
      {props.description}

      <div>
        <p>Total Votes: {props.totalVotes}</p>
        {adminView}
        <div>
          You {props.voted ? 'have': 'have not'} voted on this proposal
        </div>
      </div>

      {!props.voted 
      ? <div>
          <button onClick={helper} value={'y'}>Yes</button>
          <button onClick={helper} value={'n'}>No</button>
        </div>
        : <div></div>
      }
      
    </div>
  );
};

export default VotingCard;