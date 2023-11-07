import { popUpInfoSelector } from "recoil/popUpInfoSelector";
import { useRecoilState } from "recoil";

export const usePopUp = function (popUpKey, enableScroll = false) {
  const [popUpInfo, setPopUpInfo] = useRecoilState(popUpInfoSelector(popUpKey));

  const popUp = {};

  // 팝업 스크롤 방지
  const openPopUp = () => {
    document.body.style.overflow = "hidden";
  };

  // 스크롤 정상화
  const closePopUp = () => {
    document.body.style.overflow = "unset";
  };

  popUp.toggle = function () {
    if (!enableScroll) {
      popUp.isClicked ? closePopUp() : openPopUp();
    }

    setPopUpInfo({ ...popUpInfo, isShow: !popUpInfo.isShow });
  };

  popUp.isShow = popUpInfo.isShow;
  popUp.isClicked = popUpInfo.isShow;

  return popUp;
};
