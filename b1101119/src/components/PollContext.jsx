import React, {createContext, useState} from 'react';

export const PollContext = createContext();

export const PollProvider = ({children}) => {
  const [question, setQuestion] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState([
    {option: '', votes: 0},
    {option: '', votes: 0},
    {option: '', votes: 0},
    {option: '', votes: 0},
  ]);

  return (
    <PollContext.PollProvider
      value={{
        question,
        setQuestion,
        answers,
        setAnswers,
        isModalOpen,
        setIsModalOpen,
      }}>
      {children}
    </PollContext.PollProvider>
  );
};

export default PollProvider;
