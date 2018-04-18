var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

const saltRounds = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false }
});

UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function(error, hash) {
        if(error) return next(error);

        user.password = hash;
        next();
      });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User', UserSchema);