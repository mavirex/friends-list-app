const express = require('express')
const router = express.Router()
const { db, Friend } = require('../db')

router.get('/friends', async (req, res, next) => {
  try {
    const friends = await Friend.findAll()
    res.send(friends)
} catch (err) {next(err)}
})

router.put('/friends/:id', async(req, res, next)=> {
  try {
    const friend = await Friend.findByPk(req.params.id)
    await friend.update(req.body)
    res.send(friend)
  }catch(err) {next(err)}
  });

router.post('/api/friends', async (req, res, next)=> {
  try {
    res.send(await Friend.create(req.body));
  } catch(err) {next(err)}
  });

router.delete('/api/friends/:id', async (req, res, next)=> {
  try {
    const friend = await Friend.findByPk(req.params.id);
    await friend.destroy();
  } catch(err) {next(err)}
  });

module.exports = router