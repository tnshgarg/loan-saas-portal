import { Card, Elevation } from "@blueprintjs/core";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import Select from "react-select";
import Navbar from "../../Navbar";
import statesList from "../../../../utils/states";
import { setSimplianceMinimumWages } from "../../../../store/slices/simpliance";

const TabularViewTab = ({ columns, data }) => {
  console.log(columns, data);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table
      {...getTableProps()}
      style={{
        border: "1px solid black",
      }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{ border: "1px solid black" }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={(e) => console.log(e)}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{ border: "1px solid black" }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const StateLevel = () => {
  console.log(`states: ${statesList}`);
  console.log(`typeof states: ${typeof statesList}`);
  console.log(`typeof states: ${typeof statesList}`);

  const states = statesList.map((indianState) => {
    return {
      value: indianState,
      label: indianState,
    };
  });

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [stateName, setStateName] = useState(null);
  const [header, setHeader] = useState([]);
  const [fetchedRows, setFetchedRows] = useState([]);

  const columns = useMemo(() => {
    console.log("header in memo: ", header);
    header.map((name) => {
      return {
        Header: name,
        accessor: name,
      };
    });
  }, []);

  const data = useMemo(() => fetchedRows, []);

  const makeColumns = (header) => {
    return header.map((name) => {
      return {
        Header: name,
        accessor: name,
      };
    });
  };

  const makeData = (header, rows) => {
    var res = [];
    for (var row of rows) {
      var mappedRow = {};
      for (var j = 0; j < row.length; j++) {
        mappedRow[header[j]] = row[j];
      }
      res.push(mappedRow);
    }
    console.log(res);
    return res;
  };

  console.log("stateName: ", stateName);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
    if (auth === undefined || auth === {} || !auth.isLoggedIn) {
      navigate("/login");
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      // setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  const fetchData = (val) => {
    const options = {
      headers: {
        Authorization: auth.user
          ? auth.user.signInUserSession.idToken.jwtToken
          : null,
      },
      params: {
        state: val,
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://h2gpjoxfj1.execute-api.ap-south-1.amazonaws.com/dev/employer/simpliance/minimum_wages",
          options
        )
        .then((res) => {
          console.log("res:", res);
          const data = res.data["body"];
          dispatch(setSimplianceMinimumWages(val, data[val]["min_wages"]));
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  const handleChange = (val) => {
    console.log("stateName: ", val);
    if (!val) {
      return;
    }

    console.log("fetching data for :", val);
    fetchData(val).then((res) => {
      console.log("fetched data :", res);
      console.log("in stateName :", stateName);
      setHeader(makeColumns(res[val]["min_wages"]["header"]));
      setFetchedRows(
        makeData(res[val]["min_wages"]["header"], res[val]["min_wages"]["rows"])
      );
      setStateName(val);
      console.log("in stateName :", stateName);
    });

    console.log("in stateName :", stateName);
  };

  return (
    <>
      <Card elevation={Elevation.THREE}>
        <label>State</label>
        <Select
          options={states}
          placeholder="Select State"
          onChange={(val) => handleChange(val.value)}
        />

        <br />
        {stateName && <TabularViewTab columns={header} data={fetchedRows} />}
      </Card>
    </>
  );
};

export const MinimumWages = () => {
  return <Navbar child={<StateLevel />} />;
};
