import { useState } from "react";
import { InputWithLabel } from "../components/input-with-label";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import {Textarea} from "../components/ui/textarea"
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {

  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)

  const {handleSubmit, register, reset, formState: {errors}} = useForm()


  const onFormSubmit = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data))
    setShowConfetti(true)
    reset()
    setTimeout(() => {
      navigate("/doctors")
    }, 3000);
  }

    return (
        <div className="screen-full flex-center">

          {showConfetti && <ReactConfetti />}

        {/* form-container */}
      <div className="w-[350px] flex flex-col items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Welcome to BetaHealth!</h1>
          <p className="max-w-sm">
            Please fill the form below so we can provide you with better
            answers!
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit(onFormSubmit)}
         className="bg-white h-fit w-full shadow-xl rounded-2xl mt-6 p-8">

          <InputWithLabel
            id="age"
            label="Tell us your age"
            type="number"
            placeholder="Enter a valid age"
            register={register("age", {
              required: "Please enter age",
              valueAsNumber: "must be a valid number"
            })}
          />

          {
            errors.age && <p className="text-red-500 font-semibold my-3">{errors.age?.message}</p>
          }

          <div className="text-black mt-8">
            <p className="text-sm font-semibold">Gender</p>
            <div className="flex items-center gap-2 mt-1">
              <label htmlFor="male">Male</label>
              <input type="radio" value="male" name="gender" id="male" {...register("gender", {
                required: "Select a gender"
              })} />
              <label htmlFor="female">Female</label>
              <input type="radio" value="female" id="female" name="gender" {...register("gender" , {
                required: "Select a gender"
              })} />
              <label htmlFor="rather not say">Rather not say</label>
              <input type="radio" value="not defined" id="rather not say" name="gender" {...register("gender" , {
                required: "Select a gender"
              })} />
            </div>
          </div>

          {
            errors.gender && <p className="text-red-500 font-semibold my-3">{errors.gender?.message}</p>
          }

          <InputWithLabel
            id="name"
            label="Tell us your name"
            type="text"
            placeholder="Helps us address you better"
            className="mt-8"
            register={register("name")}
          />

          <div className="mt-4">
            <p className="text-blue-500 font-semibold">optional *</p>
            <Textarea
          className="mt-1 text-black"
          placeholder="Tell us about any medical condition you are facing."
          {...register("medicalCondition")}
           />
          </div>

          <Button type="submit" className="mt-8">Next</Button>
        </form>

        <img src="/welcome.svg" 
          width={200}
          className="mt-6"
          alt="" />
      </div>

        </div>
    )

}

export default WelcomePage