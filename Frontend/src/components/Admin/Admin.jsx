import React, { useEffect, useState } from "react";
import { fetchAllUserData, speedTest } from "../../fetch/fetchData";
import {
  ChevronDownIcon,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import adminColumns from "../AdminColumn";
import SpeedTest from "fast-speedtest-api";
// token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",

const Admin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchName, setSearchName] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const [speed, setSpeed] = useState(null);
  const [speedError, setSpeedError] = useState("");

  useEffect(() => {
    const fetchSpeedTest = async () => {
      try {
        const response = await fetch("http://localhost:3000/speedtest");
        const data = await response.json();
        if (response.ok) {
          console.log("Speed: ", data.speed);
          setSpeed(data.speed);
          if (data.speed < 1) {
            setSpeedError(
              "Slow internet. Please connect to a proper internet."
            );
          } else {
            setSpeedError("");
          }
        } else {
          setSpeedError(data.error);
        }
      } catch (error) {
        console.error("Error during speed test:", error);
        setSpeedError("Error testing speed: " + error.message);
      }
    };

    fetchSpeedTest();
  }, [speed]);

  const handleSearchQuery = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value) {
      table.getColumn("name")?.setFilterValue("");
      table.getColumn("email")?.setFilterValue("");
      table.getColumn("id")?.setFilterValue("");
      table.getColumn("role")?.setFilterValue("");
      table.getColumn("companyname")?.setFilterValue("");
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

  useEffect(() => {
    fetchAllUserData(setData, setError, setLoading);
  }, []);

  const table = useReactTable({
    data: loading ? [] : data,
    columns: adminColumns,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-full h-[90%] bg-white my-4 rounded-md shadow-md px-4  flex justify-center">
        {speedError !== "" ? (
          <div className="flex  justify-center items-center flex-col gap-6">
            <h2 style={{ color: "red" }} className="text-2xl font-medium">
              {speedError}
            </h2>
            <div className="animate-spin w-10 h-10 border-4 rounded-full border-r-red-300 border-b-red-400 border-l-red-600 border-t-red-700 "></div>
          </div>
        ) : (
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
                    <SelectItem value="companyname">Company Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-between">
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
                            <TableHead
                              key={header.id}
                              className="text-[#070F2B]"
                            >
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
                          colSpan={adminColumns.length}
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
        )}
      </div>
    </>
  );
};

export default Admin;
