import React from "react";
import Subcard from "../Subcard";
import { GiNotebook } from "react-icons/gi";
import { BiSolidUserBadge } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import employees from "../../fakedata/employe";
import data from "../../fakedata/data";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdInventory2 } from "react-icons/md";

const Dashboard = () => {
  const employee = employees.length;
  const totalRevenue = data
    .map((item, id) => (item.status === "success" ? item.amount : 0))
    .reduce((prev, current) => prev + current, 0);

  return (
    <>
      <div className="w-full h-full mt-4 rounded-md">
        <h2 className="text-2xl font-medium text-[#535C91] my-3">Overview</h2>

        <div className="flex gap-4">
          {/* Total Revenue  */}
          <Subcard
            title="Total Revenue"
            icon={FaMoneyBillTrendUp}
            onClick="/transaction"
            children={
              <div className="flex flex-col gap-2 justify-center">
                {totalRevenue}
              </div>
            }
          />

          {/* Employe Card  */}
          <Subcard
            title="No of Employee"
            icon={BiSolidUserBadge}
            onClick="/employe"
            children={employee}
          />
          <Subcard title="Notes" icon={MdInventory2} onClick="/inventory" />
          {/* <Subcard title="Notes" icon={BiSolidUserBadge} /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
