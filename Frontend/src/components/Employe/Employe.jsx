import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import employees from "../../fakedata/employe";
import employeColumns from "../../employeColumns";
import AddEmploye from "../AddEmploye";
const Employe = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(true);
  const [employeesData, setEmployeesData] = useState(employees); // State for employees
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchData();
  }, []);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSearchQuery = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value) {
      table.getColumn("name")?.setFilterValue("");
      table.getColumn("email")?.setFilterValue("");
      table.getColumn("id")?.setFilterValue("");
      table.getColumn("department")?.setFilterValue("");
      return;
    }

    // Set the filter based on the selected search criteria
    if (searchName) {
      // If searching by ID, keep the full number
      if (searchName === "id") {
        table.getColumn(searchName)?.setFilterValue(value);
      } else {
        // For name, email, and department, you might want a partial match
        table.getColumn(searchName)?.setFilterValue(value);
      }
    }
  };

  // new
  const handleAddEmployee = (newEmployee) => {
    setEmployeesData((prevEmployees) => [newEmployee, ...prevEmployees]);
  };

  const table = useReactTable({
    // data: loading ? [] : employees,
    data: loading ? [] : employeesData,
    columns: employeColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full h-[90%] bg-white my-4 rounded-md shadow-md px-4  flex justify-center">
      <div className="w-full">
        <div className="flex justify-between items-center py-4">
          <div className="flex  gap-1">
            <Input
              placeholder="Search by Name, Email, ID, Department..."
              value={searchQuery}
              onChange={handleSearchQuery}
              className="max-w-sm focus:outline-none"
            />
            <Select
              className="focus:outline-none"
              value={searchName}
              onValueChange={(value) => setSearchName(value)}
            >
              <SelectTrigger className="w-[180px] focus:outline-none ">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="department">Department</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 justify-between">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={handleOpenDialog}>
                  Add{" "}
                  <IoMdAdd className="text-lg font-bold flex gap-1 items-center" />
                </Button>
              </DialogTrigger>
              <AddEmploye
                onAddEmployee={handleAddEmployee}
                onClose={handleCloseDialog}
              />
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto bg-[#070F2B] text-white"
                >
                  Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((columns) => columns.getCanHide())
                  .map((columns) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={columns.id}
                        className="capitalize"
                        checked={columns.getIsVisible()}
                        onCheckedChange={(value) =>
                          columns.toggleVisibility(!!value)
                        }
                      >
                        {columns.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          {loading ? (
            <div className="flex items-center justify-center h-24">
              <div className="flex gap-2">
                <h2>Loading</h2>
                <div className="animate-spin w-5 h-5 border-2 rounded-full border-r-gray-300 border-b-gray-400 border-l-gray-600 border-t-gray-900 "></div>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="text-[#070F2B]">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={employeColumns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employe;
