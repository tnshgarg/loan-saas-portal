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
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rowData?.slice(indexOfFirstItem, indexOfLastItem);

  const [controller, dispatch] = useMaterialTailwindController();

  const renderValue = (value) => {
    if (value === true) {
      return (
        <Typography className="text-xs font-semibold text-primary">
          Active
        </Typography>
      );
    } else if (value === false) {
      return (
        <Typography className="text-xs font-semibold text-danger">
          EXITED
        </Typography>
      );
    } else if (value !== null && value !== undefined && value !== "") {
      return <Typography className="text-sm font-normal">{value}</Typography>;
    } else {
      return (
        <Typography className="text-sm font-bold text-danger">-</Typography>
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
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {item.label}
                      {index !== tableHeaders.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, index) => {
                const isLast = index === currentItems?.length - 1;
                const classes = isLast ? "p-4" : "p-4";

                return (
                  <tr key={index}>
                    {tableHeaders.map(({ value }, key) => (
                      <td className={classes} key={key}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-xs"
                        >
                          {renderValue(item[value])}
                        </Typography>
                      </td>
                    ))}
                    {renderActionItems && (
                      <td>{renderActionItems(item, index)}</td>
                    )}
                  </tr>
                );
              })}
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
            if (currentPage < Math.ceil(rowData?.length / itemsPerPage))
              setCurrentPage((prevPage) => prevPage + 1);
          }}
        >
          <i className="fa fa-arrow-right text-xs" aria-hidden="true"></i>
        </div>
      </div>
    </>
  );
};

export default TableLayout;
