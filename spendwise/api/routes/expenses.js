const router = require('express').Router();
let Expense = require('../models/expense.model');

router.route('/').get((req, res) => {
  Expense.find()
    .then(expenses => res.json(expenses))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const type = req.body.type;
  const month = req.body.month;
  const year = req.body.year;

  const newExpense = new Expense({
    title,
    type,
    month,
    year,
  });

  newExpense.save()
    .then(() => res.json('Expense added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then(expense => res.json('Expense deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Expense.findById(req.params.id)
    .then(expense => {
      expense.title = req.body.title;
      expense.type = req.body.type;
      expense.month = req.body.month;
      expense.year = req.body.year;

      expense.save()
        .then(() => res.json('Expense updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
