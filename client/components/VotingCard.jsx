import React, { useState, useEffect } from 'react';

const VotingCard = (props) => {

  function answer(e) {
    fetch(`http://localhost:3000/api/vote/${props.id}`, {
      method: 'PATCH',
      body: { answer: e.innerHTML },
    });
  }

  return (
    <div>
      <h2>{props.title}</h2>
      {props.description}
      {props.totalVotes}
      <div>
        <button onClick={answer}>Yes</button>
        <button onClick={answer}>No</button>
      </div>
      
    </div>
  );
};

export default VotingCard;