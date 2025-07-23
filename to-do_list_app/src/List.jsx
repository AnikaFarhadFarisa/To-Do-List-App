import React, {useEffect, useState} from "react";

function List(){

    const [task, setTask] = useState("");
    const [completed, setCompleted] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [showList, setShowList] = useState([]);

    useEffect(() => {
       const oldTaskList = localStorage.getItem("To-Do-List");
       const parsed = oldTaskList ? JSON.parse(oldTaskList) : [];
       setTaskList(parsed);
       setShowList(parsed);
    }, []);

    function addTask(event){
        setTask(event.target.value);
        
    }

    function addComplete(index){
        const updated = [...taskList];
        updated[index].status = !updated[index].status;
        setTaskList(updated);
        localStorage.setItem("To-Do-List", JSON.stringify(updated));
    }

    function addTaskList(){
        const newTask = {
            status: completed,
            name: task
        };
        
        task.length > 0 && setTaskList(t => {
            const updated = [...t, newTask];
            localStorage.setItem("To-Do-List", JSON.stringify(updated));
            setShowList(updated);
            return updated;        
        });
        setTask("");   
    }

   function deleteTask(index){
        setTaskList(t=> {
            const updated = taskList.filter((_, i) => i !== index );
            localStorage.setItem("To-Do-List", JSON.stringify(updated));
            setShowList(updated);
            return updated;
        });
    }

    function showTasks(event){
        if(event.target.value == "All"){
            setShowList(t => taskList);
        }
        else if (event.target.value == "Completed"){
            setShowList(t => taskList.filter((item, _) => item.status === true));
        }
        else if (event.target.value === "Incomplete"){
            setShowList(t => taskList.filter((item, _) => item.status === false));
        }
    }

    function handleBlur(event, index){
        const updatedTask = event.target.textContent;
        taskList[index].name = updatedTask;
        localStorage.setItem("To-Do-List", JSON.stringify(taskList));
        console.log(event.target.textContent);
        console.log(index);
    }

    return(
        <>
        <div className="main_sec">
            <div className="center_peice">
            <h1>To Do List App</h1>
            <input value={task} name="taskInput" id="" onChange={(event) => addTask(event)}/>
            <button onClick={addTaskList}>Submit</button>
            <select id="" name="options" onChange={showTasks}>
               <option value="All">All</option>
               <option value="Completed">Completed</option>
               <option value="Incomplete">Incomplete</option>
            </select></div>
            <ol className="myList">
                {showList.map((taskItem, index) => (<li key={index}>
                    <p> <input type="checkbox" onChange={() => addComplete(index)} checked={taskItem.status}/>
                         <span style={taskItem.status ? {textDecorationLine: "line-through"}:
                         {textDecorationLine: "none"} }
                         suppressContentEditableWarning
                         contentEditable= {taskItem.status ? false: true }
                         onBlur={(event) => handleBlur(event, index)}>
                            {taskItem.name}</span>
                        <button onClick={() => deleteTask(index)}>Delete</button></p>
                </li>))}
            </ol>
        </div>
        </>
    )
}

export default List