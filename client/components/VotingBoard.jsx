import React, { useState, useEffect } from 'react';
import VotingCard from './VotingCard'

const VotingBoard = ()=>{

    const [getQuestions, setQuestions] = useState([]);

    const loadQuestions = async () =>{
        try{
            const votingCards = [];
            const response = await fetch(`http://localhost:3000/api/vote`);
            const data = await response.json();
            for(let i = 0; i < data.length; i ++){
                votingCards.push(<VotingCard id={data[i].id} title ={data[i].title} description={data[i].description} totalVotes={data[i].totalVotes} yesCount={data[i].yesCount} noCount={data[i].noCount}/>)
            }
            setQuestions(votingCards);

        }catch(err){
            console.log(err);
        }
    }
    

    // fetch(`http://localhost:3000/api/vote`)
    //     .then(res => res.json())
    //     .then((data) => {
    //         const votingCards = [];
    //         console.log(data);
    //         for(let i = 0; i < data.length; i ++){
    //             votingCards.push(<VotingCard id={data[i].id} title ={data[i].title} description={data[i].description} totalVotes={data[i].totalVotes} yesCount={data[i].yesCount} noCount={data[i].noCount}/>)
    //         }

    //         return(
    //             <div id='votingBoard'>
    //                 {votingCards}
    //             </div>
    //         )


    //     })

    useEffect(() => {
        loadQuestions();
      }, []);

    return(
        <div id='votingBoard'>
            {getQuestions}
        </div>
    )

    
}

export default VotingBoard;