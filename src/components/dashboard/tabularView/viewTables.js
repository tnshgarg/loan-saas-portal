import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Input,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { headers } from "../dataUpload/headerData";
import Navbar from "../navbarMainComponent/Navbar";

const classes = {
  root: {
    width: "70%",
    marginTop: "20px",
    overflow: "hidden",
    overflowY: "scroll",
    overflowX: "scroll",
  },
  table: {
    width: "70%",
    overflow: "hidden",
    overflowY: "scroll",
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
};

const headerFields = headers[0];

const CustomTableCell = ({ row, name, onChange }) => {
  //   const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className="tableCell">
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TableView() {
  const [rows, setRows] = useState([]);

  // AUTH LAYER
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log(auth);
    if (auth === undefined || auth === {}) {
      navigate("/login");
    } else if (!auth.isLoggedIn) {
      navigate("/login");
    } else {
      // setUserName(user.signInUserSession.idToken.payload.name);
      setUserName(auth.user.attributes.name);
    }
  }, [auth, navigate]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          "https://riz6m4w4r9.execute-api.ap-south-1.amazonaws.com/cognito_auth/employer/account/tabular-crud",
          {
            headers: {
              Authorization: auth.user
                ? auth.user.signInUserSession.idToken.jwtToken
                : null,
            },
          }
        )
        .then((res) => {
          console.log(res);
          const tempData = res.data["body"];
          for (let i = 0; i < tempData.length; i++) {
            tempData[i].isEditMode = false;
          }
          setRows(tempData);
          console.log(`Rows: ${rows}`);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const [previous, setPrevious] = useState({});
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row._id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row._id]) {
      setPrevious((state) => ({ ...state, [row._id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const id = row._id;
    const newRows = rows.map((row) => {
      if (row._id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const publishChange = async (row) => {
    await axios(
      {
        method: "put",
        url: "https://riz6m4w4r9.execute-api.ap-south-1.amazonaws.com/cognito_auth/employer/account/tabular-crud",
        headers: {
          Authorization: auth.user
            ? auth.user.signInUserSession.idToken.jwtToken
            : null,
        },
        data: row,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      }
    );
  };

  const deleteRecord = async (id) => {
    await axios
      .delete(
        "https://riz6m4w4r9.execute-api.ap-south-1.amazonaws.com/cognito_auth/employer/account/tabular-crud",
        {
          headers: {
            Authorization: auth.user
              ? auth.user.signInUserSession.idToken.jwtToken
              : null,
          },
          data: {
            _id: id,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Navbar />
      <Paper className="root">
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "10px" }}
        >
          <Tabs
            sx={{ position: "sticky", top: 0, zIndex: 100 }}
            value={value}
            onChange={handleChange}
            variant="fullWidth"
          >
            <Tab
              style={{ fontSize: 20 }}
              label="Checks Failed"
              {...a11yProps(0)}
            />
            <Tab
              style={{ fontSize: 20 }}
              label="Checks Passed"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TableContainer>
            <Table className="table" aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" />
                  {headerFields.map((header, index) => (
                    <TableCell
                      size="medium"
                      className="headerCell"
                      key={index}
                      align="left"
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0
                  ? rows.map((row, index) => (
                      <TableRow key={index}>
                        {row.isEditMode ? (
                          <>
                            <IconButton
                              onClick={() => {
                                onToggleEditMode(row._id);
                                publishChange(row);
                              }}
                            >
                              <DoneIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                let delID = row._id;
                                rows.splice(
                                  rows.findIndex(function (i) {
                                    return i._id === row._id;
                                  }),
                                  1
                                );
                                onToggleEditMode(delID);
                                deleteRecord(delID);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            sx={{ marginTop: "20px" }}
                            onClick={() => {
                              onToggleEditMode(row._id);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        {Object.values(row).map((cell, index) => (
                          <CustomTableCell
                            {...{ row, name: headerFields[index], onChange }}
                            key={index}
                          />
                        ))}
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer>
            <Table className="table" aria-label="caption table">
              <TableHead>
                <TableRow>
                  {headerFields.map((header, index) => (
                    <TableCell className="headerCell" key={index} align="left">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0
                  ? rows.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((cell, index) => (
                          <TableCell className="tableCell" key={index}>
                            {row[headerFields[index]]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </div>
  );
}

export default TableView;
