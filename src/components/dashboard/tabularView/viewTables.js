import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Input,
  Paper,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import RevertIcon from "@mui/icons-material/Undo";
import axios from "axios";
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

const createData = (name, calories, fat, carbs, protein) => ({
  id: name.replace(" ", "_"),
  name,
  calories,
  fat,
  carbs,
  protein,
  isEditMode: false,
});

const CustomTableCell = ({ row, name, onChange }) => {
  //   const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
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

function View() {
  const [edit, setEdit] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://riz6m4w4r9.execute-api.ap-south-1.amazonaws.com/default/tabula-crud-api"
      )
      .then((res) => {
        const tempData = res.data;
        for (let i = 0; i < tempData.length; i++) {
          tempData[i].isEditMode = false;
        }
        setRows(tempData);
        console.log(rows);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const onRevert = (id) => {
    const newRows = rows.map((row) => {
      if (row._id === id) {
        return previous["Employee ID"] ? previous["Employee ID"] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state["Employee ID"];
      return state;
    });
    onToggleEditMode(id);
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
                      className="tableCell"
                      key={index}
                      align="left"
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    {row.isEditMode ? (
                      <>
                        <IconButton onClick={() => onToggleEditMode(row._id)}>
                          <DoneIcon />
                        </IconButton>
                        <IconButton onClick={() => onRevert(row._id)}>
                          <RevertIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        sx={{ marginTop: "20px" }}
                        onClick={() => {
                          console.log(row._id);
                          onToggleEditMode(row._id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {Object.values(row).map((cell, index) => (
                      <CustomTableCell
                        {...{ row, name: headerFields[index], onChange }}
                        className="tableCell"
                        key={index}
                      />
                    ))}
                  </TableRow>
                ))}
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
                    <TableCell className="tableCell" key={index} align="left">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((cell, index) => (
                      <TableCell className="tableCell" key={index}>
                        {row[headerFields[index]]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </div>
  );
}

export default View;
