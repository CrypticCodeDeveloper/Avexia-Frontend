import useSession from "../hooks/useSession";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { useNavigate } from "react-router-dom";

const QuestionsPage = () => {
    const inputRef = useRef(null)
  const { symptoms, extraSymptoms, questions, setQuestions,
    answers, setAnswers
   } = useSession();

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  const navigate = useNavigate()

  const [questionIndex, setQuestionIndex] = useState(0)

  const finishSession = () => {

    setAnswers(answers)
    navigate("/results")

  }


    useEffect(() => {


      const initQuestions = async () => {
        console.log("Asking questions ... ");
        const baseURL = import.meta.env.VITE_AI_ENDPOINT;

        const questionsResponse = await axios.post(baseURL, {
          role: doctor.role,
          prompt: `My name is ${userInfo.name}, gender is ${userInfo.gender},
                  I have ${symptoms} as part of my illness. More info/symptoms is ${extraSymptoms}.
                   PROPERLY draft out series of questions that would enable you to come to a conclusion
                   and give a clear and consise guide on what is probably wrong with me and recommended
                   next steps of action. Just give ONLY the questions seperated by a "~" after the first question. with NO ADDITIONAL TEXT before and after
                   the response. Ask a MINIMUM of 10 questions just to be sure.`,
        });

        const questions = questionsResponse.data.response.split("~");
        setQuestions(questions);
        console.log(questions);

        console.log(questionsResponse.data);
      };

      initQuestions();

    }, [doctor.role, userInfo.name, userInfo.gender, symptoms, extraSymptoms, setQuestions]);

  return (
    <div>
      
      <div>
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={doctor.image_path} />
            <AvatarFallback className="text-blue-500 font-bold text-lg">
              Dr.
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{doctor.name}</p>
        </div>
      </div>

        <div className="mt-5">
            <p>{questions[questionIndex]}</p>
            <Textarea 
            placeholder="Reply with Yes or No when necessary, otherwise give a expansive answer." 
            className="placeholder:text-gray-300 mt-4"
            ref={inputRef}
            value={answers[questionIndex] ? answers[questionIndex] : null}
            />

            <div className="flex w-full justify-end items-center mt-5 gap-3">

                {
                    questionIndex !== 0 && <Button 
                onClick={() => setQuestionIndex(prevI => prevI - 1)}
                className="text-lg text-blue-500 bg-white hover:bg-white">
                    Prev
                </Button>
                }

                {
                    questionIndex === questions.length-1 ?

                <Button
                onClick={finishSession}
                    className="text-lg text-blue-500 bg-white hover:bg-white"
                    >
                        Finish Session
                    </Button>

                    :

                 <Button 
                onClick={() => {
                    if (answers[questionIndex]){
                        answers[questionIndex] = inputRef.current.value
                    } else {
                        answers.push(`${questionIndex+1}. ${inputRef.current.value}`)
                    }
                    setQuestionIndex(prevI => prevI + 1)
                    inputRef.current.value = ""
                    console.log(answers)
                }}
                className="text-lg text-blue-500 bg-white hover:bg-white">
                    Next
                    </Button>

                     
                }
                    
            </div>
        </div>

    </div>
  );
};

export default QuestionsPage;
