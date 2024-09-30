import Sidebar from "./Sidebar";
import { AdminContent, MainContent } from "./index";

const AdminDashboard = () => {
  // console.log(users);

  return (
    <>
      <div className="w-full h-screen bg-[#E1E1E1]">
        <div className="w-full flex flex-row h-full">
          <Sidebar />
          <AdminContent />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
