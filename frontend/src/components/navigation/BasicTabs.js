import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RSSFeed from '../RSSFeed.jsx';

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        justifyContent: 'center', 
        borderBottom: 1, 
        borderColor: 'divider' 
        }}>
        <Tabs value={value} onChange={handleChange} aria-label="RSS Feed Tabs">
          <Tab label="Java Code Geeks" {...a11yProps(0)} />
          <Tab label="CoinDesk" {...a11yProps(1)} />
          <Tab label="Cointelegraph" {...a11yProps(2)} />
          <Tab label="Coinbase" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <h3>Java Code Geeks Headlines</h3>
      {<RSSFeed name="jcg" />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <h3>CoinDesk News</h3>
        {<RSSFeed name="cd" />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <h3>Cointelegraph News</h3>
        {<RSSFeed name="ct" />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <h3>Coinbase Blog</h3>
        {<RSSFeed name="cb" />}
      </CustomTabPanel>
  
    </Box>
  );
}
