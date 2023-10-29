const mongoose = require('mongoose');
const {v1:uuid}=require('uuid')
const crypto= require('crypto');

const Schema = mongoose.Schema;   
const userSchema = new Schema({
    name: {
            type: String,
            trim: true,
            // require: [true,'name required'],

           },
    email: {
            type: String,
            trim: true,
            unique: true,
            require: [true,'email required'],

           },
    hashed_password: {
           type: String,
           trim: true,
           require: [true,'password required'],
           minlength: 6,

          },
    salt: {
            type: String
          },
    image: {
            type: String,
            trim: true,
            default: 'empty.png',

 
           },
    role: {
            type: String,
            enum: ['manager','livreur','client'],
            default: 'client',
           },
    active: {
    type: Boolean,
    default: false,
    }

},{timestamps: true});



userSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=uuid()
    this.hashed_password=this.cryptPassword(password)

})
.get(function(){
    return this._password
})


 

userSchema.methods={
    authenticate: function(password){
        return this.cryptPassword(password)===this.hashed_password  

    },
 

    cryptPassword: function(password){
        if(!password) return ''

        try{
            return crypto
            .createHmac('sha1',this.salt)
               .update(password)
               .digest('hex');

        }catch(error)
        {
            return ''
        }
    }
}










module.exports=mongoose.model('User',userSchema)

