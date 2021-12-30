import Mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import _ from 'lodash'

const UserSchema = new Mongoose.Schema({
  name        : {
    type     : String,
    trim     : true,
    required : true,
  },
  email       : {
    type     : String,
    trim     : true,
    unique   : true,
    required : true,
  },
  password    : {
    type     : String,
    required : true,
  },
  type        : {
    type : String,
  },
  gender      : {
    type : String,
  },
  bloodGroup  : {
    type : String,
  },
  birthDate   : {
    type : Date,
  },
  subject     : {
    type : String,
  },
  institution : {
    type : String,
  },
  createdAt   : {
    type    : Number,
    default : new Date().getTime(),
  },
})

UserSchema.methods.toJSON = function() {
  const { _id, name, email, gender, birthDate, bloodGroup, type, subject, institution } = this.toObject()

  return {
    id          : _id,
    name,
    email,
    gender,
    birthDate,
    bloodGroup,
    type,
    subject,
    institution,
  }
}

UserSchema.statics.findByToken = token => {
  const User = this
  let decoded

  try {
    decoded = jwt.verify(token, 'secret')
  } catch (error) {
    return Promise.reject()
  }

  return User.findOne({
    _id                  : decoded._id,
    'accessTokens.token' : token,
  })
}

UserSchema.statics.findByCredentials = function({ email, password }) {
  return User.findOne({ email }).then(user => {
    if (!user) throw 'User or password is wrong'

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (e, res) => {
        res ? resolve(user) : reject()
      })
    })
  })
}

// CODE: Create

UserSchema.statics.create = ({ name, email, gender, birthDate, bloodGroup, type, subject, institution, password }) => {
  password = bcrypt.hashSync(password, 10)
  User({ name, email, gender, birthDate, bloodGroup, type, subject, institution, password }).save()
}
const User = Mongoose.model('User', UserSchema)

export default User
