export function validateSchema(schema){
    return function(req,res,next){
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            return res
                .status(400)
                .json({message: error.errors.map((err)=> err.message)});
        }
    }
}

export function validatePartialSchema(schema){
    return function(req,res,next){
        try {
            const result = schema.partial().safeParse(req.body);
            console.log(result)
            if (!result.success) {
                return res.status(400).json({
                    message: result.error.errors.map((err) => err.message), // Capturar errores
                  });
            }
            next();
        } catch (error) {
            return res
                .status(400)
                .json({message: error.errors.map((err)=> err.message)});
        }
    }
}