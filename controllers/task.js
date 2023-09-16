import { db } from "../config/db.js";


export const addTask = (req, res) => {

    let {title, description, deadline, status, created_by, tag, assigned_by, assigned_to, assigned_date } = req.body;
 
    if(!title || !description || !deadline || !status || !assigned_to){
     return res.status(400).json("Please enter valid details");
    }
   //CHECK EXISTING USER
   const q = "SELECT * FROM tasks WHERE title = ?";
 
   db.query(q, [title], (err, data) => {
     if (err) return res.status(500).json(err);
     if (data.length) return res.status(409).json("Task already exists!");
 
 
     const q = "INSERT INTO tasks(`title`,`description`,`deadline`,`status`,`created_by`,`tag`,`assigned_by`,`assigned_to`,`assigned_date`) VALUES (?)";
     
     const values = [title, description, deadline, status, created_by, tag, assigned_by, assigned_to, assigned_date];
 
     db.query(q, [values], (err, data) => {
       if (err) return res.status(500).json(err);
       return res.status(200).json({msg: "task has been added"});
     });
   });
 };
 
 //Get all tasks

 export const getAllTasks = (req, res) => {

   const q = "SELECT * FROM tasks";
 
   db.query(q, (err, data) => {
     if (err) return res.status(500).json(err);
     if (!data.length) return res.status(409).json("No tasks exists!");
     return res.status(200).json({data});
   });
 };
 
 //Get tasks by id
 export const getTaskById = (req, res) => {

    const q = "SELECT * FROM tasks where id= ?";
  
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (!data.length) return res.status(409).json("Task does not exists!");
      return res.status(200).json({data});
    });
  };

//delete task by id
  export const deleteTaskById = (req, res) => {

    const q = "DELETE FROM tasks where id= ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({msg: "Task deleted successfully"});
    });
  };

//update task by id
export const updateTask = (req, res) => {
 
   //Check task
   const q = "SELECT * FROM tasks WHERE id = ?";
    
   db.query(q, [req.params.id], (err, data) => {
     if (err) return res.status(500).json(err);
     if (!data.length) return res.status(409).json("Task does not exists!");
    
     const updates = [];
        if (req.body.title) updates.push(`title = '${req.body.title}'`);
        if (req.body.description) updates.push(`description = '${req.body.description}'`);
        if (req.body.deadline) updates.push(`deadline = '${req.body.deadline}'`);
        if(req.body.status) updates.push(`status = '${req.body.status}'`);
        if(req.body.assigned_to) updates.push(`assigned_to = '${req.body.assigned_to}'`);
        if(req.body.tag) updates.push(`status = '${req.body.tag}'`);
        
        if (updates.length === 0) {
            res.status(400).json({ message: "No updates provided" });
            return;
        }
     const q = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ${req.params.id}`;
 
     db.query(q, (err, data) => {
       if (err) return res.status(500).json(err);
       return res.status(200).json({msg: "task has been updated"});
     });
   });
 };
