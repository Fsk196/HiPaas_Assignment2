import React, { useEffect, useMemo, useState } from "react";
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
import data from "../../fakedata/data";
import columns from "../../columns";

const MemoizedTableRow = React.memo(({ row }) => (
  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
    {row.getVisibleCells().map((cell) => (
      <TableCell key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    ))}
  </TableRow>
));

const Transaction = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const column = table.getColumn("status");
    if (column) {
      column.setFilterValue(statusFilter);
    }
  }, [statusFilter]);

  // Debounce filter input to prevent rapid re-renders
  useEffect(() => {
    const timeout = setTimeout(() => {
      const column = table.getColumn("email");
      if (column) column.setFilterValue(filterValue);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [filterValue]);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data: loading ? [] : data,
    columns: columns,
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
    <>
      <div className="w-full h-[90%] bg-white my-4 rounded-md shadow-md px-4  flex justify-center">
        <div className="w-full">
          <div className="flex items-center py-4 justify-between">
            <Input
              placeholder="Filter emails..."
              value={table.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm focus:outline-none"
            />

            <div className="flex justify-center gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto bg-[#070F2B] text-white"
                >
                  Status <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("success")}>
                  Success
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("processing")}>
                  Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("failed")}>
                  Failed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
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
                      // <MemoizedTableRow key={row.id} row={row} />
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
                        colSpan={columns.length}
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
    </>
  );
};
export default Transaction;
