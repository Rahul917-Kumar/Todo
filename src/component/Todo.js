import React from 'react'
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
function Todo({todo ,inprogress, id , updateProgress , deleteTodo , timestamp}) {
    
    const delete_ = ()=>{
        deleteTodo(id)
    }
    
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inprogress ? "In Progress" : "Completed"}
        />
      </ListItem>
      <Button onClick={()=>updateProgress(id ,todo , inprogress , timestamp)} > {inprogress ? "Done" : "UnDone"} </Button>
      <Button  onClick={delete_} >X</Button>
    </div>
  );
}

export default Todo