import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Chat = () => {
  return (
    <>
      <div className="w-full h-[90%] bg-white my-4 rounded-md shadow-md px-4 flex flex-col">
        <div className="w-full h-10 mt-4 flex gap-2 items-center rounded justify-center">
          <img
            src="/src/assets/hipaaslogo.svg"
            width={30}
            height={30}
            alt="hipaaslogo"
          />
          <h2 className="text-2xl font-medium">HiPaaS</h2>
        </div>

        <div className="w-full h-[78%] bg-white border-t-2 border-l-2 border-r-2 rounded-md py-4 overflow-y-scroll overflow-x-hidden scroll-smooth">
          <div className="mx-10  w-[95%] h-full flex flex-col gap-2">
            <div className="w-full h-fit flex justify-start">
              <div className=" w-fit max-w-[60%] h-fit px-4 py-2 flex items-center gap-4 rounded-lg border-2">
                <img
                  src="/src/assets/hipaaslogo.svg"
                  width={25}
                  height={25}
                  alt="user"
                />
                <h2>Hello this is your personal assistant.</h2>
              </div>
            </div>
            <div className="w-full h-fit flex justify-end">
              <div className=" w-fit  max-w-[60%] h-fit px-4 py-2 flex items-center gap-4 rounded-lg border-2">
                <h2>Can you help me understand this product?</h2>
                <img
                  src="/src/assets/user.png"
                  width={25}
                  height={25}
                  alt="user"
                />
              </div>
            </div>
            <div className="w-full h-fit flex justify-start">
              <div className=" w-fit max-w-[60%] h-fit px-4 py-2 flex items-center gap-4 rounded-lg border-2">
                <img
                  src="/src/assets/hipaaslogo.svg"
                  width={25}
                  height={25}
                  alt="user"
                />
                <h2>
                  ​DealerPaaS AI dealership solution help 10,000+ dealers solve
                  the current and future challenges of the growing automotive
                  market in most critical areas by handling sales order
                  management, including order entry, tracking, and fulfillment.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[11%] bg-gray-100 rounded-lg shadow-lg flex items-center px-4 py-2 gap-2">
          <Input
            className="w-full h-[80%] rounded-md"
            placeholder="Chat with our hipaas AI."
          />

          <Button className="h-[80%] px-10 text-lg">Send</Button>
        </div>
      </div>
    </>
  );
};

export default Chat;
