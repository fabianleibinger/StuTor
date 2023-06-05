import React from 'react';
import { getChatsOfUser } from '../api/Chat';
import { useQuery } from 'react-query';
import { Box, Skeleton, Snackbar, Alert } from '@mui/material';

const MyChats = () => {

    const boxSx = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        width: 0.5,
    };

    const loading_skeleton = <Skeleton variant='rounded' sx={{ flexGrow: 1, width: 1, marginBottom: '3vh' }} />

    const [open, setOpen] = React.useState(false);

    const userId = '6468f36705853e6071dfec63';
    const { isLoading, error, data } = useQuery(['chats'], () => getChatsOfUser(userId));
    if (isLoading) return (
        <Box sx={boxSx}>
            {loading_skeleton}
            {loading_skeleton}
            {loading_skeleton}
            {loading_skeleton}
            {loading_skeleton}
            {loading_skeleton}
        </Box>
    );
    if (error) return (
        <Box sx={boxSx}>
            <Alert severity='info' sx={{ flexGrow: 1, width: 0.95 }}>
                Start a chat first!
            </Alert>
        </Box>
    );
    const chats = data;
    console.log(chats);
    return (
        <Box sx={boxSx}>
            {loading_skeleton}
            {loading_skeleton}
            {loading_skeleton}
            {loading_skeleton}
            {loading_skeleton}
        </Box>
    );
};

export default MyChats;
