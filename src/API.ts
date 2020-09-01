import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

//to get all answers, correct and incorrect, into one array
//will use the types from Question while also adding the answer:string property to it
export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
  // ): Promise<QuestionsState[]> => {
) => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log("data", data, "response", response);
    return data.results.map((question: Question) => ({
      ...question, //we want to use all the properties that we get from the question
      answers: shuffleArray([
        //add the new info from answers object and making an array with the answers that then gets shuffled
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (err) {
    console.log("err", err);
  }
};
