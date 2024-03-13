import React, {useState, useEffect} from 'react';
import {API_HOST, telegramChatId} from "../config/app_config";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Application from "./application";

import { useInitData } from '@vkruglikov/react-telegram-web-app';



export default function ApplicationList() {
    const [data, setData] = useState([]);
    const [detailsMap, setDetailsMap] = useState(new Map());
    const [loading, setLoading] = useState(true);

    const [initDataUnsafe] = useInitData();
    const telegramChatId = initDataUnsafe.user.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_HOST}/issues`, {
                    method: 'GET',
                    headers: {
                        TelegramChatId: telegramChatId,
                        Accept: 'application/json',
                    },
                });
                const result = await response.json();
                setData(result);

                const detailsMap = new Map();

                for (const item of result.data) {

                    const detailsResponse = await fetch(`${API_HOST}/issues/${item.id}/params`, {
                        method: 'GET',
                        headers: {
                            TelegramChatId: telegramChatId,
                            Accept: 'application/json',
                        },
                    });
                    const detailResult = await detailsResponse.json();
                    detailsMap.set(item.id, detailResult.data);

                }

                setDetailsMap(detailsMap);

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
                    <Application key={item.id} data={item} detail={detailsMap.get(item.id)}/>
                ))}
            </Stack>}
    </div>
}