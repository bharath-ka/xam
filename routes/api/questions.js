const router = require('express').Router();
const Question = require('../../models/Question');
const BaseTest = require('../../models/BaseTest');
const Chapter = require('../../models/Chapter');
const TestSubject = require('../../models/TestSubject');
const Answer = require('../../models/Answer');
const { route } = require('./answers');
const AnswerKey = require('../../models/AnswerKey');

router.post('/add', async (req, res) => {
  const { chapter_id, question, rank } = req.body;

  try {
    const qs = new Question({
      chapter_id,
      question,
      rank,
    });
    const q = await qs.save();
    res.status(200).json(q);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/list', async (req, res) => {
  const { chapter_id } = req.body;
  try {
    const questions = await Question.find({ chapter_id });
    res.status(200).json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/nextQuestion', async (req, res) => {
  const { test_id, user_id } = req.body;
  try {
    const tc = await TestCompletion.findOne({
      test_id,
      user_id,
      submitted: false,
    }).sort({ createdon: -1 });
    const { branch_id, section_id } = await User.findOne({ _id: user_id });
    const { totalrounds } = await TestSubject.findOne({
      test_id,
      branch_id,
      section_id,
    });
    questionRound = {
      currentRound: tc.questionround,
      totalRound: totalrounds,
    };
    let nextQuestion = {};
    if (questionRound.currentRound > totalrounds) {
      const filter = { branch_id, section_id, test_id };
      const update = { completed: true };
      const testsubjectcompletion = await TestSubject.findOneAndUpdate(
        filter,
        update,
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({ nextQuestion, questionround: questionRound, completed: true });
    }
    nextQuestion = await Question.findOne({ _id: tc.question_id });
    res
      .status(200)
      .json({ nextQuestion, questionround: questionRound, completed: false });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/baseQuestions/list', async (req, res) => {
  const { base_id, user_id, test_id } = req.body;
  try {
    let base_question_ids = await BaseTest.find({ _id: base_id }).select(
      'question_ids -_id'
    );
    if (base_question_ids.length > 0)
      base_question_ids = base_question_ids[0]['question_ids'];
    const base_questions = await Question.find({
      _id: { $in: base_question_ids },
    });
    const questionround = 1;
    let testcompletion = await TestCompletion.findOne({
      $and: [{ base_id }, { user_id }, { test_id }],
    });
    if (
      testcompletion === undefined ||
      testcompletion === null ||
      testcompletion.length === 0
    ) {
      testcompletion = new TestCompletion({
        test_id,
        user_id,
        base_id,
        questionround,
      });
      await testcompletion.save();
    }
    res.status(200).json(base_questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/all', async (req, res) => {
  try {
    let questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {}
});

router.post('/answerKey/:id', async (req, res) => {
  try {
    const { answerKey } = req.body;
    console.log(answerKey.length);

    let answer = await AnswerKey.findOneAndUpdate(
      {
        question_id: req.params.id,
      },
      {
        answerKey: answerKey.length,
      },
      {
        new: true,
      }
    );
    res.status(200).json(answer);
  } catch (error) {}
});

module.exports = router;
