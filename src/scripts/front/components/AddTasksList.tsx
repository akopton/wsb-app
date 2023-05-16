export const AddTasksList = ({handleNewTasksList}: any) => {
    return (
        <div className="todo-tasks list-wrap">
                            <div className="wrapper">
                                <div 
                                    className='add-new-list-btn'
                                    onClick={handleNewTasksList} 
                                    style={{
                                        position: 'absolute', 
                                        top: '35%', 
                                        left: '50%', 
                                        transform: 'translate(-50%,-50%)', 
                                        fontSize: '100px', 
                                        cursor:'pointer', 
                                        height: '100px', 
                                        width:'100px', 
                                        borderRadius:'50%', 
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
    )
}