const Interview = require('../models/interview');

// GET all interview questions
// const getAllQuestions = async (req, res) => {
//   try {
//     const questions = await Interview.find();
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const getAllQuestions=async(req,res)=>{
  try {
    const search=req.query.search;
  let query={};
  if(search){
   query={
    $or:[
      {question:{$regex:search,$options:"i"}},
      {category:{$regex:search,$options:"i"}}
    ]
   };
  }
  const allques=await Interview.find(query);
  res.json(allques);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question" });
  }

  
}





// GET a single question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Interview.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST a new interview question
const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Interview(req.body);
    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
};
