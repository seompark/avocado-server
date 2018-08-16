import mongoose from 'mongoose'

const UserTypes = {
  GUEST: 'GUEST',
  USER: 'USER',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
  0: this.GUEST,
  1: this.USER,
  2: this.MANAGER,
  3: this.ADMIN,
  asArray: () => [this.GUEST, this.USER, this.MANAGER, this.ADMIN]
}

const scheme = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'id required'],
    validate: {
      /**
       * Contain at least on letter
       * Do not contain special characters
       * 4-10 letters
       */
      validator: /^(?!\d*$)[a-zA-Z0-9]{4,10}$/.test,
      message: props => `${props.value} is not a valid id`
    },
    trim: true,
    unique: true
  },

  password: {
    type: String,
    required: [true, 'password required']
  },

  email: {
    type: String,
    required: [true, 'email required'],
    trim: true,
    unique: true
  },

  phones: {
    type: [{
      number: {
        type: String,
        required: true,
        validate: {
          validator: /^\d{10, 11}$/.test,
          message: props => `${props.value} is not a valid phone number`
        }
      }
    }],
    validate: [({length}) => length <= 2, 'Too many phone numbers']
  },

  addresses: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    }
  }],

  /**
   * GUEST: Not authorized user. just registered.
   * USER: Common.
   * MANAGER: Just managing, no super power.
   * ADMIN: God.
   */
  userType: {
    type: String,
    enum: UserTypes.asArray(),
    default: UserTypes.GUEST
  }
}, {
  timestamps: true
})

export default mongoose.model('User', scheme)
export { UserTypes }
