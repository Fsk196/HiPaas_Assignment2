import React from "react";
import Subcard from "../Subcard";
import { GiNotebook } from "react-icons/gi";
import { BiSolidUserBadge } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import employees from "../../fakedata/employe";
import data from "../../fakedata/data";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdInventory2 } from "react-icons/md";
import TransactionStatusChart from "../TransactionStatusChart";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const employee = employees.length;
  const totalRevenue = data
    .map((item, id) => (item.status === "success" ? item.amount : 0))
    .reduce((prev, current) => prev + current, 0);

  return (
    <>
      <div className="w-full h-[60%] mt-4 rounded-md">
        <h2 className="text-2xl font-medium text-[#535C91] my-3">Overview</h2>

        <div className="flex gap-4">
          <Subcard
            title="Total Revenue"
            icon={FaMoneyBillTrendUp}
            onClick="/transaction"
            btnName="All Transactions"
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

        <div className="flex gap-4 justify-center items-center w-full h-full my-4">
          <div className="bg-white w-[80%] h-full rounded-lg shadow-lg"></div>
          <div className="bg-white w-[20%] h-full  rounded-lg shadow-lg flex flex-col items-center px-4">
            <h2 className="mt-4 mb-2 text-xl">Transaction Overview</h2>
            <div className="my-2">
              <TransactionStatusChart />
            </div>
            <p className="text-wrap text-md font-medium mt-2 px-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptate voluptas cumque doloribus fugit vel,
            </p>
            <Link
              to="/transaction"
              className="w-full mt-3 bg-violet-900 text-center text-white py-2 rounded-md"
            >
              View Full Transaction
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
