const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
        password:{
        type:String,
        require:true,
    }
})
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  }
});

const user = mongoose.model('User',userSchema);

module.exports=user;