const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    date: {type: Date, default: Date.now} 
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

//Se utiliza declaracion de funcion ES5 para que
//pueda reconocer el valor de this y no lo tome como undefined
UserSchema.methods.matchPassword = function (password) {
    return bcrypt.compare(password, this.password)
}



module.exports = mongoose.model('User', UserSchema);