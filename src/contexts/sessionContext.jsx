
import {createContext, useState} from "react"

export const SessionContext = createContext(null)

const SessionProvider = ({children}) => {

    const [symptoms, setSymptoms] = useState(null)
    const [extraSymptoms, setExtraSymptoms] = useState(null)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    return (
        <SessionContext.Provider value={{
            symptoms,
            setSymptoms,
            extraSymptoms, 
            setExtraSymptoms,
            questions,
            setQuestions,
            answers,
            setAnswers
            }}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProvider