var express = require('express');
var router = express.Router();

var queries = require('../db/queries');


// GET all todos
router.get('/', function(req, res, next) {
  queries.getAll()
  .then(function(todos) {
    res.status(200).json(todos);
  })
  .catch(function(error) {
    next(error);
  });
});

// GET single todo
router.get('/:id', function(req, res, next) {
  queries.getSingle(req.params.id)
  .then(function(todo) {
    res.status(200).json(todo);
  })
  .catch(function(error) {
    next(error);
  });
});

// add todo
router.post('/', function(req, res, next) {
  queries.add(req.body)
  .then(function(todoID) {
    queries.getSingle(todoID)
    .then(function(todo) {
      res.status(200).json(todo);
    })
    .catch(function(error) {
      next(error);
    });
  })
  .catch(function(error) {
    next(error);
  });
});

// update todo
router.put('/:id', function(req, res, next) {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }
  queries.update(req.params.id, req.body)
  .then(function() {
    queries.getSingle(req.params.id)
    .then(function(todo) {
      res.status(200).json(todo);
    })
    .catch(function(error) {
      next(error);
    });
  }).catch(function(error) {
    next(error);
  });
});

// delete todo
router.delete('/:id', function(req, res, next) {
  queries.getSingle(req.params.id)
  .then(function(todo) {
    queries.deleteItem(req.params.id)
    .then(function() {
      res.status(200).json(todo);
    })
    .catch(function(error) {
      next(error);
    });
  }).catch(function(error) {
    next(error);
  });
});


module.exports = router;