import * as React from 'react';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Application from "./application";
import {useEffect, useState} from "react";
import {API_HOST} from "../config/app_config";
import Maintenance from "./maintenance";
import {useInitData} from "@vkruglikov/react-telegram-web-app";

export default function MaintenanceList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [initDataUnsafe] = useInitData();
    const telegramChatId = initDataUnsafe.user.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_HOST}/maintenance-entities`, {
                    method: 'GET',
                    headers: {
                        TelegramChatId: telegramChatId,
                        Accept: 'application/json',
                    },
                });
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return <div>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={loading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
        {loading ? <div></div> :
            <Stack spacing={1}>
                {data.data.map((item) => (
                    <Maintenance key={item.id} data={item}></Maintenance>
                ))}
            </Stack>}
    </div>
}