"use client";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import DetailProgramWebsite from "./detail-program-website";
import DetailProgramAI from "./detail-program-ai";
import DetailProgramUXUI from "./detail-program-uxui";
import DetailProgramMobile from "./detail-program-mobile";
import { ContainerScroll } from "../ui/container-scroll-animation";

type ViewType = "uxui" | "website" | "ai" | "mobile" | null;

interface Program {
  id: ViewType;
  name: string;
  component: JSX.Element;
}

const Program = () => {
  const [activeView, setActiveView] = useState<ViewType>(null);

  const handleSetView = (view: ViewType) => {
    setActiveView(activeView === view ? null : view);
  };

  const programs: Program[] = [
    { id: "uxui", name: "UX/UI", component: <DetailProgramUXUI /> },
    {
      id: "website",
      name: "Lập trình website",
      component: <DetailProgramWebsite />,
    },
    { id: "ai", name: "Trí tuệ nhân tạo", component: <DetailProgramAI /> },
    {
      id: "mobile",
      name: "Lập trình di động",
      component: <DetailProgramMobile />,
    },
  ];

  return (
    <ContainerScroll>
      <div className="flex rounded-lg bg-gray-100 p-4 text-primary shadow-lg dark:bg-black dark:text-white">
        <div className="w-[30%]">
          <div className="mb-4 text-lg font-bold">Thông tin ngành học:</div>
          <ul className="ml-4 space-y-2">
            {programs.map((program) => (
              <li
                key={program.id}
                onClick={() => handleSetView(program.id)}
                className="flex cursor-pointer items-center"
              >
                <ChevronsUpDown
                  className={`transition-transform ${
                    activeView === program.id ? "rotate-90" : ""
                  } mr-2`}
                />
                {program.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[70%] border-l-2 border-gray-300 pl-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`transition-all duration-300 ${
                activeView === program.id
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 overflow-hidden opacity-0"
              }`}
            >
              {program.component}
            </div>
          ))}
        </div>
      </div>
    </ContainerScroll>
  );
};

export default Program;
