const io = require('../socket')
const Session = require('../models/session')

exports.getSessions = async (req, res) => {
  try {
    if (req.role === 'client') {
      return res.status(401).json({msg: 'Unauthorized.'})
    }
    const sessions = await Session.find()
    res.status(200).json(sessions)
  } catch (err) {
    console.log(err)
  }
}

exports.getSession = async (req, res) => {
  const userId = req.params.userId
  try {
    const session = await Session.findOne({ userId: userId })
    if (!session) return res.sendStatus(404)
    res.status(200).json(session)
  } catch (err) {
    console.log(err)
  }
}

exports.postMessage = async (req, res) => {
  const mess = req.body.message
  const role = req.body.role

  try {
    if (mess === '/end') {
      await Session.findOneAndRemove({userId: req.userId})
      io.getIO().emit('session', {
        action: 'remove',
        userId: req.userId,
        messages: []
      })
      return res.status(204).json({msg: 'Success'})
    }

    let session = await Session.findOne({ userId: req.userId })
    if (!session) {
      session = new Session({ userId: req.userId, messages: [] })
      io.getIO().emit('session', {
        action: 'create',
        userId: req.userId,
        _id: session._id
      })
    }
    
    session.messages.push({message: mess, role})
    await session.save()

    io.getIO().emit('session', {
      action: 'post',
      userId: req.userId,
      messages: session.messages
    })
    res.status(201).json({ msg: 'Success' })
  } catch (err) {
    console.log(err)
  }
}

exports.postAdminMessage = async (req, res) => {
  const mess = req.body.message
  const userId = req.body.userId

  try {
    const session = await Session.findOne({ userId })
    session.messages.push({ message: mess, role: 'admin' })
    await session.save()

    io.getIO().emit('session', {
      action: 'post',
      userId: session.userId,
      messages: session.messages
    })
    res.status(201).json({ msg: 'Success' })
  } catch (err) {
    console.log(err)
  }
}