import mongoose from 'mongoose'
import _ from 'lodash'

const AnswerSchema = new mongoose.Schema({
  code        : {
    type      : String,
    minlength : 5,
    unique    : true,
    trim      : true,
    required  : true,
  },
  title       : {
    type     : String,
    trim     : true,
    required : true,
  },
  created_by  : {
    type     : mongoose.Schema.ObjectId,
    required : true,
  },
  answered_by : {
    type     : mongoose.Schema.ObjectId,
    required : true,
  },
  subject     : {
    type     : String,
    trim     : true,
    required : true,
  },
  description : {
    type : String,
    trim : true,
  },
  time        : {
    type     : Number,
    required : true,
  },
  date        : {
    type     : Date,
    required : true,
  },
  questions   : [
    {
      type           : {
        type     : String,
        trim     : true,
        required : true,
      },
      question       : {
        type     : String,
        trim     : true,
        required : true,
      },
      mark           : {
        type     : Number,
        default  : 0,
        required : true,
      },
      answer         : {
        type : String,
        trim : true,
      },
      correct_answer : {
        type : String,
        trim : true,
      },
      options        : [
        {
          type : String,
          trim : true,
        },
      ],
    },
  ],
})

AnswerSchema.methods.toJSON = function() {
  const { _id, code, created_by, title, subject, description, time, date, questions } = this.toObject()

  return {
    id          : _id,
    code,
    created_by,
    title,
    subject,
    description,
    time,
    date,
    questions,
  }
}

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

AnswerSchema.statics.fetchOne = id => Answer.findById(id)

AnswerSchema.statics.fetch = payload => Answer.find({ ...payload })

// CODE: Create

AnswerSchema.statics.create = ({ code, answered_by, created_by, title, subject, description, time, date, questions }) =>
  Answer({ code, answered_by, created_by, title, subject, description, time, date, questions }).save()

// CODE: Modify

AnswerSchema.statics.modify = (id, payload) =>
  Answer.findByIdAndUpdate(id, {
    $set : {
      ...payload,
    },
  })

AnswerSchema.statics.modifyBalance = (id, amount) => Answer.findByIdAndUpdate(id, { $inc: { balance: amount } })

AnswerSchema.statics.addJournal = (id, journal_id) =>
  Answer.findByIdAndUpdate(id, {
    $push : {
      transaction : { journal_id },
    },
  })

AnswerSchema.statics.disable = id =>
  Answer.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })

AnswerSchema.statics.enable = id =>
  Answer.findByIdAndUpdate(id, {
    $set : {
      isDisabled : false,
    },
  })

// CODE: Remove

AnswerSchema.statics.remove = id => Answer.findByIdAndRemove(id)

const Answer = mongoose.model('Answer', AnswerSchema)

export default Answer
