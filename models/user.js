import { Schema,model,models } from "mongoose";
const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        match:[/^[a-zA-Z0-9]+$/,"Username must be alphanumeric"],
    },
    email:{
        type:String,
        unique:[true,"Email already exist"],
        required:true
    },
    image:{
        type:String,
    }
});



const User = models.User ||  model("User",UserSchema);
export default User;