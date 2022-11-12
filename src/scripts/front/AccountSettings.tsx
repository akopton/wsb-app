import React from "react"
import { useEffect, useState } from "react"

const AccountSettingsBtn = () => {
    return (
        <div className="settings-button button--round" onClick={()=>{console.log('Acctoun')}}>
            A
        </div>
    )
}

const AccountSettingsPanel = ({setIsPanelOpened}: any) => {


    const show = () => {
        setIsPanelOpened(true)
    }

    return (
        <div></div>
    )
}

const AccountSettings = {
    AccountSettingsBtn: AccountSettingsBtn,
    AccountSettingsPanel: AccountSettingsPanel
}

export default AccountSettings