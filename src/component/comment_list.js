import React, {useEffect, useState} from "react";
import {API_HOST} from "../config/app_config";
import Stack from "@mui/material/Stack";
import Comment from "./comment"
import {useInitData} from "@vkruglikov/react-telegram-web-app";

export default function CommentList({issueId, onLoaded}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [initDataUnsafe] = useInitData();
    const telegramChatId = initDataUnsafe.user.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_HOST}/issues/${issueId}/comments`, {
                    method: 'GET',
                    headers: {
                        TelegramChatId: telegramChatId,
                        Accept: 'application/json',
                    },
                });
                const result = await response.json();
                setData(result);
                setLoading(false);
                onLoaded();

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return loading ? <div></div> :<Stack spacing={1}>
        {data.data.map((item) => (
            item.public && <Comment key={item.id} issueId={issueId} data={item}></Comment>
        ))}
    </Stack>

}