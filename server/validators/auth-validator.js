const {z} = require("zod");

//Login validator
const loginShema = z.object({
    email: z
    .string({required_error: "Email must be needed."})
    .trim()
    .email({message : "Invalid email address"})
    .min(3, {message: "Email must be minimum three characters"}),
    password: z
    .string({required_error: "password must be needed"})
    .trim()
    .min(5,{message:"Password must be in five characters"})
    .max(18, {message: "Password maximum 18 characters"})
})

//Registration validator
const signup = loginShema.extend({
    username: z
    .string({required_error: "Username must be needed"})
    .trim()
    .min(5,{message:"User name must be in five characters"})
    .max(18, {message: "Maximum 18 characters"}),
    

} );


module.exports = {signup, loginShema};