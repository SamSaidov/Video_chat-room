import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-modal';
import {Line} from 'rc-progress';
import {PollContext} from './PollContext';
import styles from './pollStyles';
import ChatContext, {controlMessageEnum} from './ChatContext';
//
const Poll = () => {
  const {
    question,
    setQuestion,
    answers: voteData,
    setAnswers,
    isModalOpen,
    setIsModalOpen,
  } = useContext(PollContext);
  const {sendControlMessage} = useContext(ChatContext);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voted, setVoted] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setTotalVotes(0);
    setVoted(false);
    setQuestion('');
    setAnswers([
      {option: '', votes: 0},
      {option: '', votes: 0},
      {option: '', votes: 0},
    ]);
  };

  useEffect(() => {
    setTotalVotes(
      voteData.map((item) => item.votes).reduce((prev, next) => prev + next),
    );
  });

  const submitVote = (e, chosenAnswer) => {
    if (!voted) {
      const newAnswers = voteData.map((answer) => {
        if (chosenAnswer.option === answer.option) {
          return {...answer, votes: answer.votes + 1};
        } else {
          return answer;
        }
      });
      setAnswers(newAnswers);
      sendControlMessage(controlMessageEnum.initiatePoll, {
        question,
        answers: newAnswers,
      });
      setTotalVotes((prevTotalVotes) => prevTotalVotes + 1);
      setVoted((prevVoted) => !prevVoted);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      content="Poll Modal"
      style={styles.customStyles}>
      <div>
        <h1>{question}</h1>
        <div style={styles.flexColumn}>
          {voteData &&
            voteData.map((answers, i) =>
              !voted ? (
                <button
                  style={styles.button}
                  key={i}
                  onClick={(e) => submitVote(e, answers)}>
                  {answers.option}
                </button>
              ) : (
                <div style={styles.flexCenter} key={i}>
                  <h2 style={styles.mr20}>{answers.option}</h2>
                  <Line
                    percent={(answers.votes / totalVotes) * 100}
                    strokeWidth="5"
                    trailWidth="3"
                  />
                  <p style={styles.ml20}>{answers.votes}</p>
                </div>
              ),
            )}
        </div>
        <h3>Totel votes: {totalVotes}</h3>
      </div>
    </Modal>
  );
};

export default Poll;
