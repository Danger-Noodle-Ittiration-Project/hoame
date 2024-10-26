import React, { useState, useEffect } from 'react';

const VotingCard = (props) => {

  function helper(event){
    props.func(event.target.value, props.id)
  }

  const adminView = <div>
    <p>Yes: {props.yesVotes}</p> 
    <p>No: {props.noVotes}</p>
  </div>
  

  return (
    <div>
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