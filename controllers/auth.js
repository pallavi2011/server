import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

   let {firstname, lastname, username, email, password} = req.body;

   if(!firstname || !lastname || !username || !email || !password){
    return res.status(400).json("Please enter valid details");
   }
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [email, username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`,`role`,`firstname`,`lastname`) VALUES (?)";
    
    const values = [username, email, hash, 2, firstname, lastname];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong email or password!");

    const payload = {
      data:{
        id: data.id,
        role: data.role,
        username: data.username
      }
    }
    
    jwt.sign(payload, "jwtkey", {expiresIn: 360000}, (err,token) => {
      if(err) throw err;
      res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({token});
  });
})
}


export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};