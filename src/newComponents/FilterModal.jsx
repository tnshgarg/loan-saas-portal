// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Button,
// } from "@material-tailwind/react";

// const FilterModal = ({ isOpen, onClose, onApplyFilter, properties }) => {
//   const [selectedProperty, setSelectedProperty] = useState("");
//   const [filterCondition, setFilterCondition] = useState("");
//   const [minValue, setMinValue] = useState("");
//   const [maxValue, setMaxValue] = useState("");

//   const handlePropertyChange = (event) => {
//     setSelectedProperty(event.target.value);
//   };

//   const handleFilterConditionChange = (event) => {
//     setFilterCondition(event.target.value);
//   };

//   const handleMinValueChange = (event) => {
//     setMinValue(event.target.value);
//   };

//   const handleMaxValueChange = (event) => {
//     setMaxValue(event.target.value);
//   };

//   const handleApplyFilter = () => {
//     const filter = {
//       property: selectedProperty,
//       condition: filterCondition,
//       range: {
//         min: parseFloat(minValue),
//         max: parseFloat(maxValue),
//       },
//     };

//     onApplyFilter(filter);
//     onClose();
//   };

//   return (
//     <Dialog size="sm" open={isOpen} className="self-end">
//       <DialogHeader toggler={onClose}>Filter Dialog</DialogHeader>
//       <DialogBody>
//         <div>
//           <label htmlFor="propertySelect">Select Property:</label>
//           <select
//             id="propertySelect"
//             onChange={handlePropertyChange}
//             value={selectedProperty}
//           >
//             <option value="">Select Property</option>
//             {properties.map((property) => (
//               <option key={property} value={property}>
//                 {property}
//               </option>
//             ))}
//           </select>
//         </div>

//         {selectedProperty && (
//           <>
//             <div>
//               <label htmlFor="filterCondition">Select Filter Condition:</label>
//               <select
//                 id="filterCondition"
//                 onChange={handleFilterConditionChange}
//                 value={filterCondition}
//               >
//                 <option value="greaterThan">Greater Than</option>
//                 <option value="greaterThanOrEqual">
//                   Greater Than or Equal To
//                 </option>
//                 <option value="lessThanOrEqual">Less Than or Equal To</option>
//                 <option value="between">Between</option>
//                 <option value="exists">Exists</option>
//                 <option value="doesNotExist">Does Not Exist</option>
//               </select>
//             </div>

//             {(filterCondition === "between" ||
//               filterCondition === "exists") && (
//               <>
//                 <div>
//                   <label htmlFor="minValue">Min Value:</label>
//                   <input
//                     type="number"
//                     id="minValue"
//                     value={minValue}
//                     onChange={handleMinValueChange}
//                   />
//                 </div>

//                 {filterCondition === "between" && (
//                   <div>
//                     <label htmlFor="maxValue">Max Value:</label>
//                     <input
//                       type="number"
//                       id="maxValue"
//                       value={maxValue}
//                       onChange={handleMaxValueChange}
//                     />
//                   </div>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </DialogBody>
//       <DialogFooter>
//         <Button color="blue" onClick={handleApplyFilter}>
//           Apply Filter
//         </Button>
//         <Button color="gray" onClick={onClose}>
//           Close Dialog
//         </Button>
//       </DialogFooter>
//     </Dialog>
//   );
// };

// export default FilterModal;

import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";

const FilterModal = ({ isOpen, onClose, onApplyFilter, properties }) => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handlePropertyChange = (property) => {
    setSelectedProperty(property);
    setShowFilters(true);
  };

  const handleFilterConditionChange = (val) => {
    console.log(val);
    setFilterCondition(val);
    setFilterValue(""); // Reset filter value when condition changes
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleMinValueChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxValueChange = (event) => {
    setMaxValue(event.target.value);
  };

  const handleApplyFilter = () => {
    const filter = {
      property: selectedProperty,
      condition: filterCondition,
      range: {
        min: parseFloat(minValue),
        max: parseFloat(maxValue),
      },
      value: parseFloat(filterValue),
    };

    onApplyFilter(filter);
    onClose();
  };

  const goBack = () => {
    setShowFilters(false);
    setSelectedProperty("");
  };
  const modalStyles = {
    position: "fixed",
    bottom: isOpen ? "0" : "-100%", // Slide in from the bottom
    right: "12px", // Positioned on the right side
    width: "300px",
    height: "80vh",
    backgroundColor: "white",
    padding: "20px",
    transition: "bottom 0.5s ease-in-out",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  };
  const overlayStyles = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  };

  const fields = [
    { label: "Greater Than", value: "greaterThan" },
    { label: "Greater Than or Equal To", value: "greaterThanOrEqual" },
    { label: "Less Than or Equal To", value: "lessThanOrEqual" },
    { label: "Between", value: "between" },
    { label: "Exists", value: "doesNotExist" },
    { label: "Does Not Exist", value: "exists" },
  ];

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <div className="flex flex-row w-full items-start justify-between mb-4 ">
          <div className="flex flex-col items-start">
            {showFilters && (
              <button
                onClick={goBack}
                className="text-secondary font-medium text-xs mb-1"
              >
                Back
              </button>
            )}
            <Typography className="text-sm font-semibold">
              {showFilters ? `${selectedProperty}` : "Advanced Filter"}
            </Typography>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {showFilters ? (
          <div>
            {/* Display list of filters for the selected property */}
            {/* Add your filter options here */}
            <div>
              {fields.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterConditionChange(item.value)}
                  className="py-2 text-sm hover:bg-lightgray_01 cursor-pointer"
                >
                  {item.label}
                </li>
              ))}
            </div>

            {(filterCondition === "greaterThan" ||
              filterCondition === "greaterThanOrEqual" ||
              filterCondition === "lessThanOrEqual" ||
              filterCondition === "exists" ||
              filterCondition === "doesNotExist") && (
              <div className="w-full border border-lightGray p-1 rounded-xs">
                <input
                  // type="number"
                  id="filterValue"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                  className="w-full"
                />
              </div>
            )}

            {(filterCondition === "between" ||
              filterCondition === "exists") && (
              <>
                <Typography className="text-xs text-gray">
                  Min Value:
                </Typography>
                <div className="w-full border border-lightGray p-1 rounded-xs">
                  <input
                    // type="number"
                    id="filterValue"
                    value={minValue}
                    onChange={handleMinValueChange}
                    className="w-full"
                  />
                </div>
                {/* <div>
                  <label htmlFor="minValue">Min Value:</label>
                  <input
                    type="number"
                    id="minValue"
                    value={minValue}
                    onChange={handleMinValueChange}
                  />
                </div> */}

                {filterCondition === "between" && (
                  <>
                    <Typography className="text-xs text-gray">
                      Min Value:
                    </Typography>
                    <div className="w-full border border-lightGray p-1 rounded-xs">
                      <input
                        // type="number"
                        id="filterValue"
                        value={maxValue}
                        onChange={handleMaxValueChange}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </>
            )}
            <PrimaryButton
              title={"Add Filter"}
              size={"sm"}
              color={"secondary"}
              className={"ml-0 mt-4"}
              onClick={handleApplyFilter}
            />
          </div>
        ) : (
          <div>
            {/* Display list of properties */}
            <Typography className="text-sm text-gray my-2 ">
              Select a property
            </Typography>
            <ul>
              {properties.map((property) => (
                <li
                  key={property}
                  onClick={() => handlePropertyChange(property)}
                  className="py-2 text-sm hover:bg-lightgray_01 cursor-pointer"
                >
                  {property}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const closeButtonStyle = {
  padding: "8px 16px",
  cursor: "pointer",
  background: "transparent",
  border: "none",
  outline: "none",
  fontSize: "14px",
  fontWeight: "bold",
};

export default FilterModal;
