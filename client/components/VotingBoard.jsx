import React, { useState, useEffect } from 'react';
import VotingCard from './VotingCard'

const VotingBoard = ()=>{

    

    fetch(`http://localhost:3000/api/vote`)
        .then(res => res.json())
        .then((data) => {
            const votingCards = [];
            console.log(data);
            for(let i = 0; i < data.length; i ++){
                votingCards.push(<VotingCard id={data[i].id} title ={data[i].title} description={data[i].description} totalVotes={data[i].totalVotes} yesCount={data[i].yesCount} noCount={data[i].noCount}/>)
            }

            return(
                <div id='votingBoard'>
                    {votingCards}
                </div>
            )


        })

    
}

export default VotingBoard;