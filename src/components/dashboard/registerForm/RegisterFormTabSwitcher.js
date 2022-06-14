import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterFormTabValue } from "../../../actions/registerForm";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RegisterFormTabSwitcher({ tab1, tab2, tab3 }) {
  const { tabValue } =
    useSelector((state) => state.registerForm.tabValueDetails) ?? 0;
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setRegisterFormTabValue(newValue));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="1. Address " {...a11yProps(0)} />
          <Tab label="2. Tax Setup" {...a11yProps(1)} />
          <Tab label="3. Automation" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        {tab1}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {tab2}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {tab3}
      </TabPanel>
    </Box>
  );
}
