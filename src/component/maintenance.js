import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, Chip, Grid} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";
import {API_HOST} from "../config/app_config";
import {useInitData} from "@vkruglikov/react-telegram-web-app";

export default function Maintenance({data}) {

    const [initDataUnsafe] = useInitData();
    const telegramChatId = initDataUnsafe.user.id;

    const sendIssue = (maintenanceId) => {
        fetch(`${API_HOST}/issues/${maintenanceId}`, {
            method: 'POST',
            headers: {
                TelegramChatId: telegramChatId,
                Accept: 'application/json',
            },
        }).then(r => {
            // todo: close tg
        });
    };

    return <Card>
        <CardContent>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h5" component="div">
                        {data.name}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Grid container justifyContent="flex-end">
                        <Chip color="primary" variant="outlined" label={data.active ? "Активен" : "Неактивен"}
                              size="small"/>
                    </Grid>
                </Grid>
            </Grid>


            <Typography color="text.secondary">
                {data.address}
            </Typography>
            <Typography variant="body2">
                {data.comment}
            </Typography>

            <br/>

            <Grid container justifyContent="flex-end">
                <Button size="small" variant="contained"
                        onClick={() => sendIssue(data.id)}
                        endIcon={<SendIcon/>}>Создать заявку</Button>
            </Grid>

        </CardContent>
    </Card>
}