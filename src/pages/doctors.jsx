import { doctors } from "../constants/index";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const DoctorsPage = () => {

    const [doctorIndex, setDoctorIndex] = useState(0)
    const doctor = doctors[doctorIndex]

    const navigate = useNavigate()

    const selectDoctor = () => {
        localStorage.setItem("doctor", JSON.stringify({
            name: `Dr. ${doctor.name.split(' ')[1]}`,
            image_path: doctor.image_path,
            role: doctor.role
        }))

        navigate("/dashboard")
    }

    return (
        <div className="screen-full flex-center">
            <div>
                <div className="mb-5">
                    <h1 className="font-semibold text-xl">Select a AI Doctor</h1>
                    <p>You can change this later.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-[600px]">
                    {
                        doctors.map((doctor, index) => (
                            <div 
                            key={doctor.name}
                            onClick={() => setDoctorIndex(index)}
                            className={`${index === doctorIndex && 
                            "border-white border-2"} max-w-[250px]`}>
                                <img
                                 src={doctor.image_path}
                                  alt={doctor.name} />
                            </div>
                        ))
                    }
                </div>

                {/* Doctor Info */}
                    <div className="mt-4"> 
                        <h1 className="font-semibold text-lg">{doctor.name}</h1>
                        <p className="max-w-lg">{doctor.about}</p>
                    </div>

                    <Button
                    onClick={selectDoctor}
                    className="bg-white text-blue-500 mt-5 hover:bg-white"
                    >Next</Button>

            </div>
        </div>
    )
}

export default DoctorsPage;