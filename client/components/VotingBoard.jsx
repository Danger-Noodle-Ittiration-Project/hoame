import React, { useState, useEffect } from 'react';

const VotingBoard = ()=>{

    const votingCards = [];

    fetch(`http://localhost:3000/api/vote`)
    .then(res => res.json())
    .then(data =>{
        for(let i = 0; i < data.length; i ++){
            <VotingCard id={data.id} title ={data.title} description={data.description} totalVotes={data.totalVotes} yesCount={data.yesCount} noCount={data.noCount}/>
        }
    })

    return(
        <div id='votingBoard'>
            {votingCards}
        </div>
    )
}