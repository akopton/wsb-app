import React from "react"
import { useEffect, useState, useCallback, useMemo, useReducer } from "react"
import ActionsPicker from "./ActionsPicker"
import TaskDescription from "./TaskDescription"
// import TaskTitle from "./TaskTitle"
import useConvertedDate from "./useConvertedDate"
import { TTask } from "./interfaces"

const SingleTask = ({ task, setTaskToOpen, setIsTaskOpened, searchValue }:{ task:TTask, setTaskToOpen:any, setIsTaskOpened:any, searchValue:string }) => {
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const convertedDate = useConvertedDate(task.date, searchValue)
    const {title} = task
    const handleTaskToOpen = (task: TTask) => {
        setIsTaskOpened(true)
        setTaskToOpen(task)
    }

    const handleExpiredTask = () => {
    const todaysDate = new Date().getTime()
    
        if (todaysDate > task.date) {
            setIsExpired(true)
        }
        else setIsExpired(false)
    }

    useEffect(()=>{
        handleExpiredTask()
    },[isExpired])

    return (
        <li
            className={isExpired ? 'single-task expired' : 'single-task'}
            onClick={() => handleTaskToOpen(task)}
        >
            <span className="single-task__id">{task.innerId}</span>
            <span className="single-task__title">{title}</span>
            <div className="single-task__bottom-wrap">
                    <span className="task-content__asignee">
                        {task.asignee.firstName} {task.asignee.lastName}
                    </span>
                    <span className="task-content__date">
                        {convertedDate}
                    </span>
            </div>
        </li>
    )
}



// const SingleTask = ({task, id, setTasks, lists, isPopupOpened, setTaskToOpen, setIsTaskOpened}:any) => {

//     const [isEditable, setIsEditable] = useState<boolean>(false)
//     const [isActionsWindowOpened, setIsActionsWindowOpened] = useState<boolean>(false)
//     const [isExpired, setIsExpired] = useState<boolean>(false)
    
//     const convertedDate = useConvertedDate(task.date)
//     const initialTaskState = {
//         data: {
//             ...task
//         },
//         isOpened: false
//     }
    
//     const taskUpdateReducer = (state:any, action:any) => {
//         switch (action.type) {
//             case 'update':
//                 const {data} = state
//                 return {
//                     ...state,
//                     data: {
//                         ...data,
//                         [action.field]: action.payload
//                     }
//                 }
//                 case 'toggleOpen':
//                     return {
//                         ...state,
//                         [action.field]: action.payload
//                     }
//                     default:
//                         return state
//                     }
//                 }
                
//     const [updatedTask, dispatch] = useReducer(taskUpdateReducer, initialTaskState)

//     const handleUpdate = (e:any) => {
//         dispatch({
//             type:'update', 
//             field: e.target.id,
//             payload: e.target.value ? e.target.value : e.target.getAttribute('data-type')
//         })
//         console.log(task)
//     }

//     const handleToggleOpen = (value:boolean) => {
//         dispatch({
//             type:'toggleOpen',
//             field: 'isOpened',
//             payload: value
//         })
//     }

//     const handleSubmit = async () => {
//         setIsEditable(false)
//         if (updatedTask.data.description == initialTaskState.data.description) return
//         await updateTask()
//     }

//     // const handleDelete = () => {
//     //     const settings = {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-type': 'application/json'
//     //         },
//     //         body: JSON.stringify(task)
//     //     }
//     //     fetch('http://127.0.0.1:8888/delete-task', settings)
//     //     .then(data => data.json())
//     //     .then(res => {
//     //         console.log(res)
//     //         setTasks(res)
//     //     })
//     // }
    
//     const updateTask = async () => {
//         const settings = {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(updatedTask.data)
//         }
//        fetch('http://127.0.0.1:8888/update-task', settings)
//         .then(data => data.json())
//         .then(res => {
//             console.log(res)
//             setTasks(res)
//         })
//     }

//     const handleExpiredTask = () => {
//         const todaysDate = new Date().getTime()
        
//         if (todaysDate > task.date) {
//             setIsExpired(true)
//         }
//         else setIsExpired(false)
//     }

//     useEffect(()=>{
//         handleExpiredTask()
//     },[isExpired])

//     return (
//         <li 
//             className={isExpired ? 'single-task expired' : 'single-task'}
//             style={updatedTask.isOpened ? 
//                     {
//                         height: '240px',
//                         minHeight:'240px',
//                         width: '100%',
//                         background:'#1f1f1f', 
//                         color:'white', 
//                         transition: 'all .3s ease',
//                     } 
//                 : 
//                     {
//                         cursor:'pointer', 
//                         transition: 'all .3s ease', 
//                         minHeight:'70px',
//                         height: '70px'
//                     }
//                 }
//             key={id}
//             onClick={(e)=>{
//                 setTaskToOpen(updatedTask.data)
//                 setIsTaskOpened(true)
//                 if (isPopupOpened) return
//                 // if (!updatedTask.isOpened) {
//                     // handleToggleOpen(true)
//                 // }
//                 }}
//         >
//             <div className="single-task__top-wrap">
//                 {/* <span className="single-task__id">{updatedTask.data.innerId}</span> */}
//                 <span className="single-task__id">{updatedTask.data.innerId}</span>
//                 {updatedTask.isOpened && 
//                     <>
//                         {isEditable ? 

//                             <div 
//                                 className="single-task__submit-change-btn"
//                                 onClick={handleSubmit}
//                             >
//                                 <span>Gotowe jest</span>
//                             </div>
//                             :
//                             <div 
//                                 className="single-task__close-btn" 
//                                 onClick={()=>{
//                                     handleToggleOpen(false)
//                                     setIsActionsWindowOpened(false)
//                                 }}
//                             />
//                         }
//                     </>
//                 }
//             </div>
//             <TaskTitle 
//                 // task={task}
//                 updatedTask={updatedTask} 
//             />
//             {updatedTask.isOpened &&
//                 <TaskDescription 
//                     handleSubmit={handleSubmit}
//                     task={task} 
//                     isTaskOpened={updatedTask.isOpened} 
//                     isEditable={isEditable} 
//                     setIsEditable={setIsEditable}
//                     updatedTask={updatedTask} 
//                     handleUpdate={handleUpdate}
//                     initialTaskState={initialTaskState}
//                     handleToggleOpen={handleToggleOpen}
//                     updateTask={updateTask}
//                 />
//             }
//             {updatedTask.isOpened &&
//                 <div className="single-task__bottom-wrap">
//                     <div className="left-side">
//                         <span className="task-content__asignee">
//                             {/* {updatedTask.data.asignee.login} */}
//                             {task.asignee.login}
//                         </span>
//                         <span className="task-content__date">
//                             {convertedDate}
//                         </span>
//                     </div>
//                     <ActionsPicker
//                         isExpired={isExpired}
//                         lists={lists}
//                         updateTask={updateTask}
//                         setIsActionsWindowOpened={setIsActionsWindowOpened}
//                         isActionsWindowOpened={isActionsWindowOpened}
//                         task={task}
//                         handleToggleOpen={handleToggleOpen}
//                         updatedTask={updatedTask}
//                         handleUpdate={handleUpdate}
//                         // handleDelete={handleDelete}
//                         handleSubmit={handleSubmit}
//                     />
//                 </div>
//             }
//         </li>
//     )
// }

export default SingleTask