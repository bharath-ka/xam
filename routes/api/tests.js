const express = require('express');
const router = express.Router();
const Test = require('../../models/Test');
const TestSubject = require('../../models/TestSubject');
const TestCompletion = require('../../models/TestCompletion');
const Answer = require('../../models/Answer');
const BaseTest = require('../../models/BaseTest');
const Branch = require('../../models/Branch');

router.post('/add', async (req, res) => {
  const { name, college_id } = req.body;

  try {
    let test = new Test({
      name,
      college_id,
    });
    test = await test.save();
    res.status(200).json(test);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/remove', async (req, res) => {
  try {
    await TestCompletion.deleteMany();
    await Answer.deleteMany();
    await TestSubject.updateMany({}, { $set: { completed: false } });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/list', async (req, res) => {
  const { branch_id } = req.body;
  try {
    const { college_id } = await Branch.findOne({ _id: branch_id });
    const tests = await Test.find({ college_id });
    res.status(200).json(tests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/testsubjects/add', async (req, res) => {
  const {
    subject,
    branch_id,
    section_id,
    base_id,
    test_id,
    module_ids,
    totalrounds,
  } = req.body;

  try {
    let testSubject = new TestSubject({
      subject,
      branch_id,
      section_id,
      base_id,
      test_id,
      module_ids,
      totalrounds,
    });
    testSubject = await testSubject.save();
    res.status(200).json(testSubject);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.post('/testsubjects/list', async (req, res) => {
  const { test_id, branch_id, section_id } = req.body;
  try {
    const testsubjects = await TestSubject.find({
      $and: [{ test_id, branch_id, section_id }],
    }).populate('subject', ['name']);
    res.status(200).json(testsubjects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/base/add', async (req, res) => {
  const { question_ids, priority } = req.body;

  try {
    let basetest = new BaseTest({
      question_ids,
      priority,
    });
    basetest = await basetest.save();
    res.status(200).json(basetest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
