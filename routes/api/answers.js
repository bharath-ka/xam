const router = require('express').Router();
const Answer = require('../../models/Answer');
const AnswerKey = require('../../models/AnswerKey');
const Question = require('../../models/Question');
const Test = require('../../models/Test');
const TestSubject = require('../../models/TestSubject');
const User = require('../../models/User');
const TestCompletion = require('../../models/TestCompletion');
router.post('/add', async (req, res) => {
  const { user_id, qanswers } = req.body;

  try {
    // const answerKey = Answer.find({
    //     question,
    //     user
    // });
    // if (answerKey) {
    //     return res.status(500).send('Already answered');
    // }
    const ans = new AnswerKey({
      user_id,
      qanswers,
    });
    const as = await ans.save();
    res.status(200).send(as);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/answerKey/add', async (req, res) => {
  const { question_id, answerKey } = req.body;
  try {
    let akey = new AnswerKey({
      question_id,
      answerKey,
    });
    akey = await akey.save();
    res.status(200).json(akey);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/basequestion/evaluate', async (req, res) => {
  const { user_id, qanswers, test_id, base_id, module_ids } = req.body;
  const eval = {
    easy: 0,
    medium: 0,
    hard: 0,
  };
  let answer;
  let questionRound = 1;
  const rankArray = [];
  try {
    for (const question_id in qanswers) {
      answer = qanswers[question_id];
      const ans = new Answer({
        user_id,
        question_id,
        answer,
        test_id,
        questionRound,
      });
      await ans.save();
      let anskey = await AnswerKey.findOne({ question_id });

      let question = await Question.findOne({ _id: question_id });
      question = question.toObject();
      let answerLength = answer.length;
      console.log('answerLength', answerLength, 'anskey', anskey.answerKey);
      if (anskey.answerKey == answerLength) {
        console.log('true', 'rank', question.rank);
        if (question.rank === 'easy') eval['easy']++;
        else if (question.rank === 'medium') eval['medium']++;
        else if (question.rank === 'hard') eval['hard']++;
      }
    }
    const max = Math.max(eval['easy'], eval['medium'], eval['hard']);
    console.log('eval', eval, 'max', max);
    if (max === 0) {
      return res.status(200).json({ rank: 'easy' });
    }
    for (const prop in eval) {
      if (eval[prop] === max) {
        rankArray.push(prop);
      }
    }
    // const rank = rankArray[Math.floor(Math.random() * rankArray.length)];
    function decideRank(rankArray) {
      let ra = rankArray.find((rank) => rank === 'hard');
      if (ra !== undefined) {
        return 'hard';
      } else {
        let ra = rankArray.find((rank) => rank === 'medium');
        if (ra !== undefined) {
          return 'medium';
        } else {
          return 'easy';
        }
      }
    }

    const rank = decideRank(rankArray);
    console.log(rank);

    const filter = { user_id, test_id, base_id };
    const update = { submitted: true };
    const testcompletion = await TestCompletion.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
      }
    );

    // // const chapter_ids = await Chapter.find({ module_id: { $in: module_ids } });
    // if(answer)
    let nextQuestion;
    if (rank === 'easy') {
      nextQuestion = await Question.findById({
        _id: '5e1db4ab865fd33331d9d250',
      });
    } else if (rank === 'medium') {
      nextQuestion = await Question.findById({
        _id: '5e1db4b1865fd33331d9d251',
      });
    } else if (rank === 'hard') {
      nextQuestion = await Question.findById({
        _id: '5e1db4bd865fd33331d9d252',
      });
    }

    // const nextQuestion =
    //   questions[Math.floor(Math.random() * questions.length)];
    // let { questionround } = await TestCompletion.find({ test_id, user_id }).limit(1).sort({ 'createdon': -1 });
    const question_id = nextQuestion._id;
    const { branch_id, section_id } = await User.findOne({ _id: user_id });
    const { totalrounds } = await TestSubject.findOne({
      test_id,
      branch_id,
      section_id,
    });
    questionround = {
      currentRound: Number(questionRound) + 1,
      totalRound: totalrounds,
    };
    const testCompletion = new TestCompletion({
      test_id,
      user_id,
      question_id,
      questionround: questionround.currentRound,
      rank,
    });
    await testCompletion.save();
    console.log(nextQuestion);
    res.status(200).json({ nextQuestion, questionround });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send('Server error');
  }
});

router.post('/question/evaluate', async (req, res) => {
  const { test_id, user_id, qanswers, questionRound, module_ids } = req.body;
  const eval = {
    easy: 0,
    medium: 0,
    hard: 0,
  };
  try {
    let question_id = Object.keys(qanswers)[0];

    let answer = qanswers[question_id];
    const ans = new Answer({
      user_id,
      question_id,
      answer,
      test_id,
      questionRound,
    });
    await ans.save();
    let anskey = await AnswerKey.findOne({ question_id });
    let question = await Question.findOne({ _id: question_id });
    question = question.toObject();
    console.log(
      'answer',
      answer.length,
      'anskey',
      anskey.answerKey,
      'question',
      question.rank
    );

    answerLength = answer.length;
    if (answerLength == anskey.answerKey) {
      if (question.rank === 'easy') eval['easy'] = 1;
      else if (question.rank === 'medium') eval['medium'] = 1;
      else eval['hard'] = 1;
    }
    let rank;
    console.log('eval', eval);
    if (eval.easy == 1) {
      rank = 'medium';
    } else if (eval.medium == 1) {
      rank = 'hard';
    } else if (eval.hard == 1) {
      rank = 'hard';
    } else {
      if (question.rank === 'hard') {
        rank = 'medium';
      } else if (question.rank === 'medium') {
        rank = 'easy';
      } else {
        rank = 'easy';
      }
    }
    const filter = { user_id, test_id, question_id };
    const update = { submitted: true };
    const testcompletion = await TestCompletion.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
        useFindAndModify: false,
      }
    );
    const { branch_id, section_id } = await User.findOne({ _id: user_id });
    const { totalrounds } = await TestSubject.findOne({
      test_id,
      branch_id,
      section_id,
    });
    questionround = {
      currentRound: Number(questionRound) + 1,
      totalRound: totalrounds,
    };
    let nextQuestion = {};
    if (questionround.currentRound > totalrounds) {
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
        .json({ nextQuestion, questionround, completed: true });
    }
    // const chapter_ids = await Chapter.find({ module_id: { $in: module_ids } });
    // const questions = await Question.find({
    //   chapter_id: { $in: chapter_ids },
    //   rank,
    // });
    // nextQuestion = questions[Math.floor(Math.random() * questions.length)];

    if (rank === 'easy') {
      nextQuestion = await Question.findById({
        _id: '5f103da5d9f5ec21ccfb9f8a',
      });
    } else if (rank === 'medium') {
      nextQuestion = await Question.findById({
        _id: '5e1db4b1865fd33331d9d251',
      });
    } else if (rank === 'hard') {
      console.log(rank);
      nextQuestion = await Question.findById({
        _id: '5f10330863f5620d483dc93d',
      });
    }

    question_id = nextQuestion._id;

    const testCompletion = new TestCompletion({
      test_id,
      user_id,
      question_id,
      questionround: questionround.currentRound,
      rank,
    });
    await testCompletion.save();
    res.status(200).json({ nextQuestion, questionround, completed: false });
  } catch (error) {
    console.error(error.stack);
    res.status(500).send('Server error');
  }
});

router.post('/basetestcompletion/list', async (req, res) => {
  const { base_id, user_id, question_id, test_id } = req.body;
  try {
    let basetestcompletion = await TestCompletion.findOne({
      $and: [{ base_id }, { user_id }, { test_id }],
    });
    return res.status(200).json(basetestcompletion);
    // }
    // else {
    //     let testcompletion = await TestCompletion.findOne({
    //         $and: [
    //             { question_id },
    //             { user_id },
    //             { test_id }
    //         ]
    //     });
    //     return res.status(200).json(testcompletion);
    // }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/list', async (req, res) => {
  const { user } = req.body;
  try {
    const answers = await Answer.find({
      user_id: user,
    }).populate({
      path: 'question_id',
    });
    res.status(200).json(answers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
