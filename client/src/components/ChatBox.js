import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppContext } from '../context/ChatProvider';
import { useQuery } from 'react-query';
import { getMessagesOfChat } from '../api/Message';
import { } from '@mui/material';

const ChatBox = () => {

    const { selectedChat } = useAppContext();
    const { data } = useQuery(['messagesOfChat', selectedChat?._id], () => getMessagesOfChat(selectedChat?._id), {
        enabled: Boolean(selectedChat?._id),
    });

    const gridSx = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        width: 0.49,
        border: '1px solid lightgrey',
        borderRadius: '6px',
    };

    if (data) return (
        <Grid container spacing={2} sx={gridSx}>
            {data.map((message, index) => (
                <Grid item xs={12} key={index}>
                    {message.content}
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Grid container spacing={2} sx={gridSx}>
            Select a chat to start messaging!
        </Grid>
    );
};

export default ChatBox;