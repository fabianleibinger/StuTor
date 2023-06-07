import React from 'react';
import { getChatsOfUser } from '../api/Chat';
import { useQuery } from 'react-query';
import { Box, Skeleton, Alert } from '@mui/material';

const MyChats = () => {

    const userId = '6468f36705853e6071dfec63';
    // TODO: Move somewhere else after userid is retrieved from auth.
    const { isLoading, error, data } = useQuery(['chats'], () => getChatsOfUser(userId));

    const boxSx = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        width: 0.5,
    };

    const loading_skeleton = <Skeleton variant='rounded' sx={{ flexGrow: 1, width: 1, marginBottom: '3vh' }} />;

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

    return (
        <Box sx={boxSx}>
            
        </Box>
    );
};

export default MyChats;
