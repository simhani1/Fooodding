import { useState } from "react";

import { HouseLine, MapTrifold, FireTruck, UserCircle } from "@phosphor-icons/react";
import logo from "@assets/fooodding_boss_logo.svg";

const TheSideBar = () => {
  const [active, setActive] = useState("home");

  return (
    <div
      id="header"
      className="bg-gradient-to-b from-main to-boss h-screen w-48 pb-12 inline-block"
    >
      <div className="h-full flex flex-col items-center justify-between">
        <div className="logo w-24 h-24 my-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
          <img src={logo} alt="fooodding" className="w-20 h-20" />
        </div>
        <div
          className={`home flex flex-col items-center justify-center w-full py-6 ${
            active === "home" ? "bg-white rounded-l-3xl" : ""
          }`}
          onClick={() => setActive("home")}
        >
          <HouseLine size={56} />
          <p className="text-2xl text-center mt-1">홈</p>
        </div>
        <div
          className={`map flex flex-col items-center justify-center w-full py-6 ${
            active === "map" ? "bg-white rounded-l-3xl" : ""
          }`}
          onClick={() => setActive("map")}
        >
          <MapTrifold size={56} />
          <p className="text-2xl text-center mt-1">내 지도</p>
        </div>
        <div
          className={`business flex flex-col items-center justify-center w-full py-6 ${
            active === "business" ? "bg-white rounded-l-3xl" : ""
          }`}
          onClick={() => setActive("business")}
        >
          <FireTruck size={56} />
          <p className="text-2xl text-center mt-1">장사</p>
        </div>
        <div
          className={`mypage flex flex-col items-center justify-center w-full py-6 ${
            active === "mypage" ? "bg-white rounded-l-3xl" : ""
          }`}
          onClick={() => setActive("mypage")}
        >
          <UserCircle size={56} />
          <p className="text-2xl text-center mt-1">내 정보</p>
        </div>
      </div>
    </div>
  );
};

export default TheSideBar;
