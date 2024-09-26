import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import employees from "../fakedata/employe";

const AddEmploye = ({ onAddEmployee, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !department) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Create new employee object
    const newEmployee = {
      id: Math.max(...employees.map((e) => e.id)) + 1, // New ID
      name: name,
      email: email,
      department: department,
    };
    onAddEmployee(newEmployee);

    console.log("New Employee Added:", newEmployee);

    // Optionally, clear the form fields after submission
    setName("");
    setEmail("");
    setDepartment("");

    onClose();
  };

  return (
    <>
      <form onSubmit={() => handleSubmit()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogDescription>
              Add employee here. Click Add Employee when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Name</label>
              <Input
                id="name"
                placeholder="Pedro Duarte"
                value={name}
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Email</label>
              <Input
                id="email"
                value={email}
                placeholder="pedro@gmail.com"
                className="col-span-3"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Department</label>
              <Select
                className="focus:outline-none"
                value={department}
                onValueChange={(value) => setDepartment(value)}
              >
                <SelectTrigger className="w-[333px] focus:outline-none ">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmit}
              className="bg-[#070F2B] text-white"
              type="submit"
            >
              Add Employe
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </>
  );
};

export default AddEmploye;
