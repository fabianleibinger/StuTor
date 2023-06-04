import React from 'react';
import { getChatsOfUser } from '../api/Chat';
import { useQuery } from 'react-query';
import { Box, Button, Skeleton } from '@mui/material';

const MyChats = () => {
    const userId = '6468f36705853e6071dfec63';
    const { isLoading, error, data } = useQuery(['chats'], () => getChatsOfUser(userId));
    if (isLoading) return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
                height: '100%',
                padding: '2vh',
            }}
        >
            {<Skeleton variant='rounded' width='95%' sx={{ flexGrow: 1, marginBottom: '1vh' }}/>}
            {<Skeleton variant='rounded' width='95%' sx={{ flexGrow: 1, marginBottom: '1vh' }}/>}
            {<Skeleton variant='rounded' width='95%' sx={{ flexGrow: 1, marginBottom: '1vh' }}/>}
            {<Skeleton variant='rounded' width='95%' sx={{ flexGrow: 1, marginBottom: '1vh' }}/>}
            {<Skeleton variant='rounded' width='95%' sx={{ flexGrow: 1, marginBottom: '1vh' }}/>}
        </Box>
    );
    if (error) return
    const chats = data;
    console.log(chats)
    // just random button for now
    return (
        <div>
            <h1>My Chats</h1>

        </div>
    );
};

export default MyChats;
