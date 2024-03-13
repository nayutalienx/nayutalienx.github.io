import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {API_HOST} from "../config/app_config";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Grid} from "@mui/material";
import {TelegramContext} from "../app";
import {useContext} from "react";


export default function Comment({issueId, data}) {


    const {tgCtx} = useContext(TelegramContext);
    const telegramChatId = tgCtx.initDataUnsafe.user.id;

    const sendAttachment = (attachmentId) => {
        fetch(`${API_HOST}/issues/${issueId}/comments/attachments/${attachmentId}`, {
            method: 'POST',
            headers: {
                TelegramChatId: telegramChatId,
                Accept: 'application/json',
            },
        }).then(r => {
            tgCtx.close();
        });
    };

    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    <AccountBoxIcon sx={{paddingTop: 1}}/> {data.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.content}
                </Typography>
            </CardContent>
            {data.attachments.length != 0 && <CardActions>

                <Grid container justifyContent="flex-end">
                    {data.attachments.map((attachment) => (
                        <Button startIcon={<AttachFileIcon/>} key={attachment.id}
                                onClick={() => sendAttachment(attachment.id)}
                                size="small">{attachment.attachment_file_name}</Button>
                    ))}
                </Grid>
            </CardActions>}
        </Card>
    );
}