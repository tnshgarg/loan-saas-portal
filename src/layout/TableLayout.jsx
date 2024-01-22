import {
  AdjustmentsVerticalIcon,
  ArrowDownTrayIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { useMaterialTailwindController } from "../contexts/SidebarContext";
import PrimaryButton from "../newComponents/PrimaryButton";
import SearchInput from "../newComponents/SearchInput";

const tableCellClass = "p-4";

const TableLayout = ({
  tableHeaders,
  rowData,
  setRowData,
  mainData,
  searchDisabled,
  renderActionItems,
}) => {
  // console.log("rowData", rowData);
  // console.log("tableHeaders", tableHeaders);

  const csvHeaders = tableHeaders.map(({ label, value }) => ({
    label,
    key: value,
  }));

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rowData?.slice(indexOfFirstItem, indexOfLastItem);

  const [controller, dispatch] = useMaterialTailwindController();

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortData = (data) => {
    if (sortConfig.key === null) return data;

    return data.slice().sort((a, b) => {
      const keyA = a[sortConfig.key];
      const keyB = b[sortConfig.key];

      if (keyA < keyB) return sortConfig.direction === "asc" ? -1 : 1;
      if (keyA > keyB) return sortConfig.direction === "asc" ? 1 : -1;

      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderValue = (value) => {
    switch (value) {
      case true:
      case "ACTIVE":
        return (
          <Typography className="text-xs font-semibold text-primary">
            ACTIVE
          </Typography>
        );

      case "INPROGRESS":
        return (
          <Typography className="text-xs font-semibold text-warning">
            INPROGRESS
          </Typography>
        );

      case "SUCCESS":
        return (
          <Typography className="text-xs font-semibold text-primary">
            SUCCESS
          </Typography>
        );

      case "PENDING":
        return (
          <Typography className="text-xs font-semibold text-warning">
            PENDING
          </Typography>
        );

      case "INACTIVE":
        return (
          <Typography className="text-xs font-semibold text-danger">
            INACTIVE
          </Typography>
        );

      case false:
        return (
          <Typography className="text-xs font-semibold text-danger">
            EXITED
          </Typography>
        );

      default:
        return value !== null && value !== undefined && value !== "" ? (
          <Typography className="text-xs font-normal">{value}</Typography>
        ) : (
          <Typography className="text-xs font-bold text-danger">-</Typography>
        );
    }
  };

  return (
    <>
      <div className="w-full flex-row flex items-center justify-between">
        {!searchDisabled && (
          <SearchInput
            label="Search by Name, Phone, Employee ID and Email ID"
            data={rowData}
            setData={setRowData}
            mainData={mainData}
          />
        )}
        <PrimaryButton
          title="Filter"
          color="secondary"
          variant="outlined"
          size="sm"
          leftIcon={AdjustmentsVerticalIcon}
        />

        <CSVLink
          data={rowData ?? []}
          filename={"tableData.csv"}
          headers={csvHeaders ?? []}
          style={{ outlineWidth: 0 }}
        >
          <PrimaryButton
            title="Download"
            color="secondary"
            variant="outlined"
            size="sm"
            className="ml-0"
            leftIcon={ArrowDownTrayIcon}
          />
        </CSVLink>
      </div>
      <Card className="mt-4 shadow-none rounded-none ">
        <CardBody className="h-full w-full overflow-x-scroll p-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="w-full">
              <tr>
                {tableHeaders.map((item, index) => (
                  <th
                    key={index}
                    className="cursor-pointer border-b border-lightGray  p-4 transition-colors hover:bg-blue-gray-50"
                    onClick={() => item.sortable && requestSort(item.value)}
                  >
                    <Typography
                      variant="small"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 font-medium text-black"
                    >
                      {item.label}
                      {item.sortable && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className={`h-4 w-4 ${
                            sortConfig.key === item.value
                              ? "text-primary"
                              : "text-gray"
                          }`}
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                sortData(currentItems)?.map((item, index) => (
                  <tr key={index}>
                    {tableHeaders.map(({ value }, key) => (
                      <td className={tableCellClass} key={key}>
                        {renderValue(item?.[value])}
                      </td>
                    ))}
                    {renderActionItems && (
                      <td>{renderActionItems(item, index)}</td>
                    )}
                  </tr>
                ))
              ) : (
                <p className="pl-4 py-2 text-blue-gray-500">No Data Present</p>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <div className="flex flex-row items-center justify-end border-t border-blue-gray-50 py-4 bg-transparent">
        <div
          className="bg-white h-5 w-5 items-center flex flex-col justify-center hover:bg-lightGray cursor-pointer shadow-sm"
          onClick={() => {
            if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
          }}
        >
          <i className="fa fa-arrow-left text-xs" aria-hidden="true"></i>
        </div>
        <div className="bg-white h-5 w-5 items-center flex flex-col justify-center mx-2 shadow-sm">
          <Typography className="font-medium text-[10px]">
            {currentPage}
          </Typography>
        </div>
        <div
          className="bg-white h-5 w-5 items-center flex flex-col justify-center hover:bg-lightGray cursor-pointer shadow-sm"
          onClick={() => {
            if (currentPage < Math.ceil(rowData?.length / itemsPerPage)) {
              setCurrentPage((prevPage) => prevPage + 1);
            }
          }}
        >
          <i className="fa fa-arrow-right text-xs" aria-hidden="true"></i>
        </div>
      </div>
    </>
  );
};

export default TableLayout;
