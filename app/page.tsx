"use client";

import PulldownSelection from "./ui/pulldown";
import PulldownMenu from "./ui/pulldown-menu";

export default function Home() {
  return (
    <div className="bg-white w-screen h-screen p-5 ">
      <div className="mb-5">
        <PulldownSelection
          items={["Project 1", "Project 2", "Project 3"]}
          defaultSelected={0}
          onSelect={(index) => {
            console.log(index);
          }}
        />
      </div>
      <div>
        <PulldownMenu
          items={["Menu 1", "Menu 2", "Menu 3"]}
          onSelect={(index) => {
            console.log(index);
          }}
        />
      </div>
    </div>
  );
}
