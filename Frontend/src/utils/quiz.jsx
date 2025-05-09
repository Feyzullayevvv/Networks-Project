export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const calculateScore = (questions, userAnswers) => {
  return Object.entries(userAnswers).filter(
    ([index, answer]) => questions[parseInt(index)].answer === answer
  ).length;
};
