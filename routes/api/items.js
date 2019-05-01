const express = require('express');
const router = express.Router();

const item = require('../../models/item.js');

router.get('/', (req, res) => {
  item.find()
    .sort({date: -1})
    .then(items => res.json(items))
    .catch(err => res.send(err))
});

router.post('/', (req, res) => {
  const newItem = new item({
    name: req.body.name
  });
  newItem.save()
    .then(item => res.json(item))
    .catch(err => res.send(err))
})

router.delete('/:id', (req, res) => {
  item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
})

// router.patch - update todo as completed
router.patch('/:id', (req, res) => {
  item.updateOne(
    {'_id': req.params.id},
    {'completed': true}
  )
    .then(() => res.json({success: true}))
    .catch(() => res.send('object not found with ID'))
})

module.exports = router;
