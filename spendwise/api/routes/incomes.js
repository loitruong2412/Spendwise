const router = require('express').Router();
let Income = require('../models/income.model');

router.route('/').get((req, res) => {
  Income.find()
    .then(incomes => res.json(incomes))
    .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const type = req.body.type;
  const month = req.body.month;
  const year = req.body.year;

  const newIncome = new Income({
    title,
    type,
    month,
    year,
  });

  newIncome.save()
    .then(() => res.json('Income added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Income.findById(req.params.id)
    .then(income => res.json(income))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Income.findByIdAndDelete(req.params.id)
    .then(income => res.json('Income deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Income.findById(req.params.id)
    .then(income => {
      income.title = req.body.title;
      income.type = req.body.type;
      income.month = req.body.month;
      income.year = req.body.year;

      income.save()
        .then(() => res.json('Income updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
