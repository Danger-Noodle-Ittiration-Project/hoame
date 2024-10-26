import React, { useState, useEffect } from 'react';
import VotingCard from './VotingCard'

const VotingBoard = ()=>{

    const [getQuestions, setQuestions] = useState([]);
    const [getVotes, setVotes] = useState(0);

    function answer(e, question) {
        fetch(`http://localhost:3000/api/vote/answer`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            userId: '1',
            questionId: question,
            yes: e === 'y',
            no: e === 'n',
            }),
        }).then(res => res.json())
          .then(data => {
            console.log('answerData:', data);
            setVotes(data);
          })
    }

    const countingVotes = (votes, id) => {
        let yes = 0;
        let no = 0;
        for(let i = 0; i < votes.length; i++){
            if(votes[i].questions_id == id) {
                if(votes[i].yes_vote == true) yes++;
                if(votes[i].no_vote == true) no++;
            };
        }
        return {yea: yes, nay: no};
    }

    const loadQuestions = async () =>{
        try{
            const votingCards = [];
            const response = await fetch(`http://localhost:3000/api/vote`);
            const rawData = await response.json();
            const data = rawData.questions;
            console.log('votes:', rawData.votes);

            for(let i = 0; i < data.length; i ++){
                const votingTotals = countingVotes(rawData.votes,data[i].id);
                votingCards.push(<VotingCard id={data[i].id} title ={data[i].title} description={data[i].description} yesVotes={votingTotals.yea} noVotes={votingTotals.nay} totalVotes={votingTotals.yea+votingTotals.nay} func={answer} />)
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
      }, [getVotes]);

    return(
        <div id='votingBoard'>
            {getQuestions}
        </div>
    )

    
}

export default VotingBoard;