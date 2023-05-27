
export const DeleteUserWindow = ({setShowDeleteWindow, handleDeleteAccount}:any) => {

    return (
        <div className="delete-window__wrapper">
            <div className="delete-window">
                <span className="delete-window__label">Czy na pewno chcesz usunąć konto?</span>
                <div className="delete-window__buttons-wrapper">
                    <button className="btn form__btn go-back-btn" onClick={()=>setShowDeleteWindow(false)}>Wróć</button>
                    <button className="btn form__btn delete-btn" onClick={handleDeleteAccount}>Usuń</button>
                </div>
            </div>
        </div>
    )
}