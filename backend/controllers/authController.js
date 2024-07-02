export const signup = async (req, res) => {
  
  try {
    const { email, password, username, fullName } = req.body;
    
    const validEmail =
  } catch (error) {
    
  }
};
export const login = async (req, res) => {
  res.json({ message: "login" });
};
export const logout = async (req, res) => {
  res.json({ message: "logout" });
};
