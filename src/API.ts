// // import { shuffleArray } from "./utils";

// // export type Question = {
// //   category: string;
// //   correct_answer: string;
// //   difficulty: string;
// //   incorrect_answers: string[];
// //   question: string;
// //   type: string;
// // };

// // //to get all answers, correct and incorrect, into one array
// // //will use the types from Question while also adding the answer:string property to it
// // export type QuestionsState = Question & { answers: string[] };

// // export enum Difficulty {
// //   EASY = "easy",
// //   MEDIUM = "medium",
// //   HARD = "hard",
// // }

// // export const fetchQuizQuestions = async (
// //   amount: number,
// //   difficulty: Difficulty
// //   // ): Promise<QuestionsState[]> => {
// // ) => {
// //   try {
// //     console.log('working')
// //     const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
// //     // const data = await (await fetch(endpoint)).json();
// //     const response = await fetch(endpoint);
// //     const data = await response.json();
// //     console.log("data", data, 'response', response);
// //     return data.results.map((question: Question) => ({
// //       ...question, //we want to use all the properties that we get from the question
// //       answers: shuffleArray([
// //         //add the new info from answers object and making an array with the answers that then gets shuffled
// //         ...question.incorrect_answers,
// //         question.correct_answer,
// //       ]),
// //     }));
// //   } catch (err) {
// //     console.log("err", err);
// //   }
// // };


import { shuffleArray } from './utils';

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

export type QuestionsState = Question & { answers: string[] };

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }))
};