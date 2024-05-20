

const validate = (schema) => async (req, res, next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body  = parseBody;
        next();
    } catch (err) {
        
        const status = 422;
        const message = "Fill the poperty!";
        const extraDetails = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetails
        }
        console.log(err)
        //res.status(400).json({msg: err});
        next(error);
    }
}




module.exports = validate;