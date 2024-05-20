const {z} = require("zod");

const signup = z.object({
    username: z
    .string({required_error: "Username must be needed"})
    .trim()
    .min(5,{message:"User name must be in five characters"})
    .max(18, {message: "Maximum 18 characters"}),
    email: z
    .string({required_error: "Email must be needed."}),
    password: z
    .string({required_error: "password must be needed"})
    .trim()
    .min(5,{message:"Must be in five characters"})
    .max(18, {message: "Maximum 18 characters"})

} );


module.exports = signup;