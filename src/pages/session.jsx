import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import useSession from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

const SessionPage = () => {

  const inputRef = useRef(null);

  const [greetings, setGreetings] = useState(null);

  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate()

  const { symptoms, setExtraSymptoms } = useSession();

  useEffect(() => {
    const sessionInit = async () => {
      const baseURL = import.meta.env.VITE_AI_ENDPOINT ;

      //  coming soon
      const greetingsResponse = await axios.post(baseURL, {
        role: doctor.role,
        prompt: `My name is ${userInfo.name}, gender is ${userInfo.gender}. 
            I am experiencing ${symptoms} as part of my illness.
            Greet me professional based on your personality, do not give any medical consultations
            or diagnosis. Just give me a light greeting and encouragement as if you are about to attend to me
             and kickstart the diagnosis phase. Do not ask any question afterward.`,
      });

      console.log(greetingsResponse.data);
      setGreetings(greetingsResponse.data.response);
    };

    sessionInit();
  }, [doctor.role, userInfo.name, userInfo.gender, symptoms]);

  return (
    <div>
      <p>Session Page</p>

      <div className="mt-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage src={doctor.image_path} />
            <AvatarFallback className="text-blue-500 font-bold text-lg">
              Dr.
            </AvatarFallback>
          </Avatar>
          <p className="font-semibold text-lg">{doctor.name}</p>
        </div>

        <p className="mt-3 max-w-[450px] border-b border-gray-400 pb-3">
          {greetings ? greetings : `${doctor.name} is responding ... `}
        </p>

        {greetings && (
          <div className="mt-5">
            <p>
              Is there anything else you want {doctor.name} to know before you
              continue the session?
            </p>
            <Textarea
              className="mt-4 placeholder:text-gray-300"
              ref={inputRef}
              placeholder="Type in any extra symptoms or describe in detail what is wrong with you. (optional)"
            />

            <div className="flex w-full items-center justify-end">
              <Button
                onClick={() => {
                  setExtraSymptoms(inputRef.current.value);
                  navigate("/questions")
                }}
                className="bg-white text-blue-500 mt-3 hover:bg-white"
              >
                Proceed
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionPage;
