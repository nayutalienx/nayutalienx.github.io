import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {LoadingButton} from "@mui/lab";
import {Button, ButtonGroup, Chip, Grid} from "@mui/material";
import Divider from '@mui/material/Divider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {useState} from "react";

import Collapse from '@mui/material/Collapse';
import Stack from "@mui/material/Stack";
import CommentList from "./comment_list";
import SendIcon from '@mui/icons-material/Send';
import {API_HOST} from "../config/app_config";
import {useInitData} from "@vkruglikov/react-telegram-web-app";


function dataRow(name, value) {
    if (value) {
        return <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{value}</TableCell>
        </TableRow>
    }
    return null
}

export default function Application({data, detail}) {

    const [withComments, setWithComments] = useState(false);
    const [commentsLoading, setCommandsLoading] = useState(false);

    const loadComments = () => {
        setCommandsLoading(!withComments);
        setWithComments(!withComments);
    };

    const commentsLoaded = () => {
        setCommandsLoading(false);
    }

    const [initDataUnsafe] = useInitData();
    const telegramChatId = initDataUnsafe.user.id;

    const sendComment = (issueId) => {
        fetch(`${API_HOST}/issues/${issueId}/comments`, {
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
            <Typography variant="h5" component="div">
                {data.title}
            </Typography>
            <Typography color="text.secondary">
                {data.created_at.split('T')[0]}
            </Typography>

            <Divider textAlign="right">
                <Chip color="primary" variant="outlined" label={data.status.name} size="small"/>
            </Divider>

            <br/>

            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {dataRow("Тип оборудования", detail.equipmentType)}
                        {dataRow("Производитель оборудования", detail.equipmentManufacturer)}
                        {dataRow("Модель оборудования", detail.equipmentModel)}
                        {data.service_object && dataRow("Объект", data.service_object.name)}
                        {data.type && dataRow("Тип", data.type.name)}
                    </TableBody>
                </Table>
            </TableContainer>

            <br/>

            <Collapse in={withComments} timeout="auto" unmountOnExit>
                <CommentList issueId={data.id} onLoaded={commentsLoaded}></CommentList>
                <br/>
            </Collapse>

            <Grid container justifyContent="flex-end">

                <ButtonGroup variant="outlined" aria-label="Loading button group">
                    <LoadingButton size="small" loading={commentsLoading} onClick={loadComments}>Комментарии</LoadingButton>
                    <Button size="small" variant="contained"
                            onClick={() => sendComment(data.id)}
                            endIcon={<SendIcon/>}>Отправить</Button>
                </ButtonGroup>

            </Grid>

        </CardContent>
    </Card>

}