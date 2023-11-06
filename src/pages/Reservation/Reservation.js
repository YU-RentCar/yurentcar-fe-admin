import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { MdFavorite } from "react-icons/md";
import { useRecoilState } from "recoil";
import { nicknameSelector } from "recoil/reservationAtom";
import ResvList from "./ResvList/ResvList";

const Reservation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const [rclNickname, setRclNickname] = useRecoilState(nicknameSelector);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full select-none">
        <div className="w-[1140px] flex flex-col justify-center items-center mb-10">
          <div className="text-[50px] font-bold self-start mt-[80px]">
            예약 변경
          </div>
        </div>
        <div className="w-[800px] px-24 pt-4 pb-[100px]">
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            <Step onClick={() => setActiveStep(0)}>
              <MdFavorite className="w-5 h-5" />
              <div className="absolute -bottom-[4.5rem] w-max text-center">
                <Typography
                  variant="h6"
                  color={activeStep === 0 ? "blue-gray" : "gray"}
                >
                  Step 1
                </Typography>
                <Typography
                  color={activeStep === 0 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  변경할 고객을 지목하세요.
                </Typography>
              </div>
            </Step>
            <Step onClick={() => setActiveStep(1)}>
              <MdFavorite className="w-5 h-5" />
              <div className="absolute -bottom-[4.5rem] w-max text-center">
                <Typography
                  variant="h6"
                  color={activeStep === 1 ? "blue-gray" : "gray"}
                >
                  Step 2
                </Typography>
                <Typography
                  color={activeStep === 1 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  변경할 시간을 지정하세요.
                </Typography>
              </div>
            </Step>
            <Step onClick={() => setActiveStep(2)}>
              <MdFavorite className="w-5 h-5" />
              <div className="absolute -bottom-[4.5rem] w-max text-center">
                <Typography
                  variant="h6"
                  color={activeStep === 2 ? "blue-gray" : "gray"}
                >
                  Step 3
                </Typography>
                <Typography
                  color={activeStep === 2 ? "blue-gray" : "gray"}
                  className="font-normal"
                >
                  변경할 차량을 지정하세요.
                </Typography>
              </div>
            </Step>
          </Stepper>

          {/* <div className="flex justify-between mt-32">
            <Button onClick={handlePrev} disabled={isFirstStep}>
              Prev
            </Button>
            <Button onClick={handleNext} disabled={isLastStep}>
              Next
            </Button>
          </div> */}
        </div>
      </div>
      {activeStep === 0 ? <ResvList handleNext={handleNext}></ResvList> : null}
      {activeStep === 1 ? <div>ww2</div> : null}
      {activeStep === 2 ? <div>ww3</div> : null}
    </div>
  );
};

export default Reservation;
