import { useEffect } from "react"
import { TTask } from "../interfaces/taskInterface"

export const DeleteTaskWindow = ({setIsDeleteWindowOpened, task, handleDelete}: {setIsDeleteWindowOpened: any, task: TTask, handleDelete:any}) => {

    useEffect(()=>{
        console.log(task)
    },[])
    return (
        <div className="delete-window__wrapper">
            <div className="delete-window">
                <span className="delete-window__label">Czy na pewno chcesz usunąć zadanie id: {task.innerId}?</span>
                <div className="delete-window__buttons-wrapper">
                    <button className="btn form__btn go-back-btn" onClick={()=>setIsDeleteWindowOpened(false)}>Wróć</button>
                    <button className="btn form__btn delete-btn" onClick={()=>handleDelete(task)}>Usuń</button>
                </div>
            </div>
        </div>
    )
}