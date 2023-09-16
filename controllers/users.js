import { db } from "../config/db.js";

export const editUser = (req, res) => {

    const q = "SELECT * FROM users WHERE id = ?";
    
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(409).json("User does not exists!");
     
      const updates = [];
         if (req.body.firstname) updates.push(`firstname = '${req.body.firstname}'`);
         if (req.body.lastname) updates.push(`lastname = '${req.body.lastname}'`);
         if (req.body.username) updates.push(`username = '${req.body.username}'`);
        
         
         if (updates.length === 0) {
             res.status(400).json({ message: "No updates provided" });
             return;
         }
      const q = `UPDATE users SET ${updates.join(", ")} WHERE id = ${req.params.id}`;
  
      db.query(q, (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({msg: "User has been updated"});
      });
    });
 };
 