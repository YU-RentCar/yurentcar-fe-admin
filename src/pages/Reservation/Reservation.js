import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import {
  MdOutlineCalendarMonth,
  MdAccessibilityNew,
  MdDirectionsCar,
} from "react-icons/md";
import ResvList from "./ResvList/ResvList";
import DateTime from "./DateTime/DateTime";
import CarList from "./CarList/CarList";
import { useRecoilValue } from "recoil";
import { alertAtom } from "recoil/alertAtom";
import Alert from "popUp/Alert";

const Reservation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const alertState = useRecoilValue(alertAtom);

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full select-none">
        <div className="w-[1140px] flex flex-col justify-center items-center mb-5">
          <div className="text-[50px] font-bold self-start mt-[80px]">
            예약 변경
          </div>
        </div>
        <div className="w-[800px] px-24 pb-[100px]">
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            <Step onClick={() => setActiveStep(0)}>
              <MdAccessibilityNew className="w-5 h-5" />
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
            <Step onClick={() => (activeStep < 1 ? null : setActiveStep(1))}>
              <MdOutlineCalendarMonth className="w-5 h-5" />
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
            <Step onClick={() => (activeStep < 2 ? null : setActiveStep(2))}>
              <MdDirectionsCar className="w-5 h-5" />
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
        </div>
      </div>
      {activeStep === 0 ? <ResvList handleNext={handleNext}></ResvList> : null}
      {activeStep === 1 ? <DateTime handleNext={handleNext}></DateTime> : null}
      {activeStep === 2 ? (
        <CarList setActiveStep={setActiveStep}></CarList>
      ) : null}
      {alertState.state ? <Alert /> : null}
    </div>
  );
};

export default Reservation;
