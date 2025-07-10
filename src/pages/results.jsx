import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import useSession from "../hooks/useSession";
import { useEffect, useState } from "react";
import axios from "axios";

const ResultsPage = () => {

      const doctor = JSON.parse(localStorage.getItem("doctor"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const {questions, answers} = useSession()
  const [results, setResults] = useState(null)

  useEffect(() => {

    const initDiagnosis = async () => {
        const baseURL = import.meta.env.VITE_AI_ENDPOINT;

        const diagnosisResponse = await axios.post(baseURL, {
        role: doctor.role,
        prompt: `Here are the questions you asked - ${questions}. And here are the 
        answers provided - ${answers}. patient name is ${userInfo.name}, age is ${userInfo.age}, 
         Tell them the possible medical condition they are facing, and whether it is severe or not.
         Tell them exactly what you feel is wrong and what illness they are likely having. then give them a precise
         action to do based on the urgency and severness of the illness. Do not give a generic answer but give a 
         answer based on what is exactly wrong with them. Make it short and comprehensive. Just a paragraph.`,
      });

      setResults(diagnosisResponse.data.response)
      console.log(diagnosisResponse.data.response)
    }

    initDiagnosis()

  }, [answers, doctor.role, questions, userInfo.name, userInfo.age])

    return (
        <div>
            <h1 className="text-2xl font-semibold">Results Analysis</h1>
            <div className="flex flex-col gap-3 items-center mt-4">
                <Avatar className="size-62">
            <AvatarImage src={doctor.image_path} />
            <AvatarFallback className="text-blue-500 font-bold text-lg">
              Dr.
            </AvatarFallback>
          </Avatar>

          <p className="text-lg"> {results ? 
           results : 
           `${doctor.name} is analysing your answers ...`} </p>
            </div>
        </div>
    )
}

export default ResultsPage