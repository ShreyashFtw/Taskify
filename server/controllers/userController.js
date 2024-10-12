export const registerUser = async (req, res) => {
    try {
      const { name, email, password, isAdmin, role, title } = req.body;
  
      const userExist = await User.findOne({ email });
  
      if (userExist) {
        return res.status(400).json({
          status: false,
          message: "User already exists",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ status: false, message: "Internal server error." });
    }
    };

// export const registerUser = async (req, res) => {
//     try {
//     } catch (error) {
//         console.error(error);
//         return res.status(400).json({ status: false, message: "Internal server error." });
//     }
// }};