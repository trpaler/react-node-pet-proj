import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/Table";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface CustomDataTableProps {
  initialData: Record<string, any>[];
  columns: Column[];
}

const CustomDataTable = ({ initialData, columns }: CustomDataTableProps) => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState<{ key: string | null, direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const sortData = useCallback((data: Record<string, any>[], sortConfig: { key: string | null, direction: 'ascending' | 'descending' }) => {
    if (sortConfig.key !== null) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, []);

  const filterData = useCallback((data: Record<string, any>[], filters: Record<string, string>) => {
    return data.filter(item =>
      Object.entries(filters).every(([key, value]) =>
        item[key]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
  }, []);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilters(prev => ({ ...prev, [column]: value }));
    setCurrentPage(1);
  };

  const paginatedData = useCallback(() => {
    const filteredData = filterData(data, filters);
    const sortedData = sortData(filteredData, sortConfig);
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    return sortedData.slice(firstIndex, lastIndex);
  }, [data, filters, sortConfig, currentPage, itemsPerPage, filterData, sortData]);

  const maxPage = Math.ceil(filterData(data, filters).length / itemsPerPage);


  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={column.key} className="px-4 py-2">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">{column.label}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => requestSort(column.key)}
                      >
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === 'ascending' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        ) : (
                          <ChevronsUpDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Input
                      placeholder={`Filter ${column.label}`}
                      value={filters[column.key] || ''}
                      onChange={(e) => handleFilterChange(column.key, e.target.value)}
                      className="w-full"
                    />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData().map((row, index) => (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {columns.map(column => (
                  <TableCell key={column.key} className="px-4 py-2">{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">Page {currentPage} of {maxPage}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, maxPage))}
          disabled={currentPage === maxPage}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};


export default CustomDataTable;
