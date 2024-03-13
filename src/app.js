import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ApplicationList from "./component/application_list";
import MaintenanceList from "./component/maintenance_list";
import AssignmentIcon from '@mui/icons-material/Assignment';
import StoreIcon from '@mui/icons-material/Store';
import { useExpand } from "@vkruglikov/react-telegram-web-app";



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    const [isExpanded, expand] = useExpand();
    expand();

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Box>
                <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange}>
                            <Tab icon={<AssignmentIcon/>} iconPosition="start" label="Заявки" value="1"/>
                            <Tab icon={<StoreIcon/>} iconPosition="start" label="Объекты" value="2"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1"><ApplicationList/></TabPanel>
                    <TabPanel value="2"><MaintenanceList/></TabPanel>
                </TabContext>
            </Box>
        </ThemeProvider>
    );
}
