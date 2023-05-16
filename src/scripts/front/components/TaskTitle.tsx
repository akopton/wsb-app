const TaskTitle = ({title}:any) => {
    return (
        <div 
            className="single-task__title" 
            style={
                    {
                        overflow:'hidden',
                        whiteSpace:'nowrap',
                        textOverflow: 'ellipsis'
                        
                    }
                }    
        >
            {title}
        </div>
    )
}

export default TaskTitle