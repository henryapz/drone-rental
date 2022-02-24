const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    profileImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CloudImage',
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Deleted', 'Active', 'Pending'],
      required: true,
    },
    role: {
      type: String,
      default: 'User',
      enum: ['User', 'Admin'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line consistent-return
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  // eslint-disable-next-line consistent-return
  bcrypt.genSalt(SALT_WORK_FACTOR, (saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }
    // eslint-disable-next-line consistent-return
    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
