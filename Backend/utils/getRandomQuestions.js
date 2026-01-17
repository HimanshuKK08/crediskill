const Question = require("../Models/Questions");

async function getRandomQuestions(skill) {
  const easyCount = Math.floor(Math.random() * 4) + 1;
  const mediumCount = Math.floor(Math.random() * 4) + 1;
  let hardCount = 10 - (easyCount + mediumCount);

  if (hardCount < 0) hardCount = 0;

  let questions = [];

  const easyQs = await Question.aggregate([
    { $match: { skill, difficulty: "easy" } },
    { $sample: { size: easyCount } },
    {
      $project: {
        _id: 1,
        question: "$questionText",  // ← Rename questionText to question
        options: {
          $map: {                    // ← Transform options array
            input: "$options",
            as: "opt",
            in: "$$opt.text"         // ← Extract just the text string
          }
        },
        difficulty: 1
        // correctOptionIndex excluded (hidden from user)
      }
    }
  ]);

  const mediumQs = await Question.aggregate([
    { $match: { skill, difficulty: "medium" } },
    { $sample: { size: mediumCount } },
    {
      $project: {
        _id: 1,
        question: "$questionText",
        options: {
          $map: {
            input: "$options",
            as: "opt",
            in: "$$opt.text"
          }
        },
        difficulty: 1
      }
    }
  ]);

  const hardQs = await Question.aggregate([
    { $match: { skill, difficulty: "hard" } },
    { $sample: { size: hardCount } },
    {
      $project: {
        _id: 1,
        question: "$questionText",
        options: {
          $map: {
            input: "$options",
            as: "opt",
            in: "$$opt.text"
          }
        },
        difficulty: 1
      }
    }
  ]);

  questions = [...easyQs, ...mediumQs, ...hardQs];

  // Shuffle
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
}

module.exports = getRandomQuestions;