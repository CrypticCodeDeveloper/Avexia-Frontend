import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { History, GraduationCap } from "lucide-react";
import { Button } from "../components/ui/button";
import Select from "react-select";
import { useState } from "react";
import { symptoms } from "../constants";
import useSession from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  const { setSymptoms } = useSession();

  const startSession = () => {
    if (!selectedOption) {
      return;
    }

    const symptoms = selectedOption?.map((options) => options.value).join(",");
    setSymptoms(symptoms);

    navigate("/session");
  };

  return (
    <section>
      <div>
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-semibold">BetaHealth</h1>
          <Avatar className="size-12">
            <AvatarImage src="https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Jocelyn" />
            <AvatarFallback className="text-blue-500 font-bold text-lg">
              {userInfo.name[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="w-full flex flex-col items-center mt-7">
        {/* Dr image */}
        <div className="max-w-[400px] rounded-full overflow-hidden">
          <img
            src={doctor.image_path}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>

        <div className="mt-7">
          <h2 className="text-3xl font-semibold">Welcome, {userInfo.name}</h2>
          <p className="mt-3">Ready to chat? Start a new session ... </p>
        </div>

        <div className="mt-7 flex items-center gap-7">
          <div className="flex items-center gap-3 text-blue-500 bg-white font-semibold p-2 rounded-full">
            <History />
            <span className="text-sm sm:text-lg">Past sessions</span>
          </div>

          <div className="flex items-center gap-3 text-blue-500 bg-white font-semibold p-2 rounded-full">
            <GraduationCap />
            <span className="text-sm sm:text-lg">Learn about health</span>
          </div>
        </div>

        {/*  */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={symptoms}
            isMulti
            placeholder="What symptoms are you facing?"
            className="min-w-[300px] text-blue-500"
          />

          <Button
            onClick={startSession}
            className="bg-white text-blue-500 p-2 px-3 hover:bg-white text-lg mt-3"
          >
            Start session
          </Button>
        </div>

        <div className="mt-10">
          <p className="text-center">
            BetaHealth is not a replacement for urgent medical consultation,
            please make sure to see a doctor in emergency cases.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
