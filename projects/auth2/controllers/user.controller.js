export const Register = async (req,res) => {
    const {username , email , password} = req.body

    if (!username || !email || !password){
        return res.status(400).json({
            message : "All Fields are required."
        })
    }

    try {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username }
                    ]
                }
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            
    } catch (error) {
        
    }
}
export const Login = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
export const Verify = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
export const ForgotPassword = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
export const ResetPassword = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
export const getProfile = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
export const LogOut = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}