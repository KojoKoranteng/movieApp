const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'myuniquesecret')
    // console.log(decoded)
    const user = await User.findOne({ _id: decoded._id, 'token': token })
    //const user = await User.findOne({ _id: decoded._id})

    if (!user) {
      res.status(401).send({ error: 'Unauthorized' })
    }

    req.token =  token
    req.user = user
    next()
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: e })
  }
}


module.exports = auth
