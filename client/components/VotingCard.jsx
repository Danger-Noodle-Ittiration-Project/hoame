import React, { useState, useEffect } from 'react';

const VotingCard = (props) => {
  function answer(bool) {
    fetch(`http://localhost:3000/api/vote/${props.id}`, {
      method: 'PATCH',
      body: { answer: bool },
    });
  }

  return (
    <div>
      {props.title}
      {props.description}
      {props.totalVotes}
      <button onClick={answer(true)}>Yes</button>
      <button onClick={answer(false)}>No</button>
    </div>
  );
};
