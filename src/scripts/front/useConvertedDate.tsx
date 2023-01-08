import { useState, useEffect } from "react"

const useConvertedDate = (date:number) => {
    const [convertedDate, setConvertedDate] = useState<string>()

    const handleConvertedDate = (date:number) => {
        const dateToConvert = new Date(date)
        const convertedDate = {
            convertedDateDay: () => {
                if (dateToConvert.getDate() < 10) return (`0${dateToConvert.getDate()}`)
                else return dateToConvert.getDate()
            },
            convertedDateMonth: () => {
                if (dateToConvert.getMonth()+1 < 10) return (`0${dateToConvert.getMonth()+1}`)
                else return dateToConvert.getMonth()+1
            },
            convertedDateYear: dateToConvert.getFullYear(),
        }

        const newConvertedDay = 
        `${convertedDate.convertedDateDay()}.${convertedDate.convertedDateMonth()}.${convertedDate.convertedDateYear}`

        setConvertedDate(newConvertedDay)
    }

    useEffect(()=>{
        handleConvertedDate(date)
    },[convertedDate])


    return convertedDate
}

export default useConvertedDate