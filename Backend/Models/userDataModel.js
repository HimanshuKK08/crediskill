const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    score: { type: Number, default: 0 },
    lastTested: { type: Date },
    isTested: {type: Boolean, required: true, default: false}
  }
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    githubURL: {type: String, required: true},
    techStack: [
      {
        name: { type: String },
        source: {
          type: String,
          enum: ['detected', 'manual'],
          required: true
        }
      }
    ],
    description: { type: String },
  },
  // { _id: false }
);

const growthSchema = new mongoose.Schema(
  {
    date: { type: String }, // e.g. "2025-01"
    avgScore: { type: Number },
  },
  { _id: false }
);

const userDataSchema = new mongoose.Schema(
  {
    // 🔑 link to auth user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // your auth model name
      required: true,
      unique: true,
    },

    username: { type: String },
    name: { type: String },
    bio: { type: String },

    profilePhoto: {
      type: String,
      default: 'https://api.dicebear.com/7.x/avataaars/svg',
    },

    links: {
      email: { type: String },
      github: { type: String },
      linkedin: { type: String },
      portfolio: { type: String },
    },

    skills: [skillSchema],
    projects: [projectSchema],
    growthData: [growthSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserData', userDataSchema);
