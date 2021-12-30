import mongoose from 'mongoose'
import _ from 'lodash'

const QuestionSchema = new mongoose.Schema({
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
        type    : String,
        trim    : true,
        default : '',
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

QuestionSchema.methods.toJSON = function() {
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

QuestionSchema.statics.fetchOne = id => Question.findById(id)

QuestionSchema.statics.fetch = payload => Question.find({ ...payload })

// CODE: Create

QuestionSchema.statics.create = ({ code, created_by, title, subject, description, time, date, questions }) =>
  Question({ code, created_by, title, subject, description, time, date, questions }).save()

// CODE: Modify

QuestionSchema.statics.modify = (id, payload) =>
  Question.findByIdAndUpdate(id, {
    $set : {
      ...payload,
    },
  })

QuestionSchema.statics.modifyBalance = (id, amount) => Question.findByIdAndUpdate(id, { $inc: { balance: amount } })

QuestionSchema.statics.addJournal = (id, journal_id) =>
  Question.findByIdAndUpdate(id, {
    $push : {
      transaction : { journal_id },
    },
  })

QuestionSchema.statics.disable = id =>
  Question.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })

QuestionSchema.statics.enable = id =>
  Question.findByIdAndUpdate(id, {
    $set : {
      isDisabled : false,
    },
  })

// CODE: Remove

QuestionSchema.statics.remove = id => Question.findByIdAndRemove(id)

const Question = mongoose.model('Question', QuestionSchema)

export default Question
