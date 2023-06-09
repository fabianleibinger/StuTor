import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppContext } from '../context/ChatProvider';
import { useQuery } from 'react-query';
import { getMessagesOfChat } from '../api/Message';
import { Chip } from '@mui/material';

const ChatBox = () => {

    const { selectedChat } = useAppContext();
    const { data } = useQuery(['messagesOfChat', selectedChat?._id], () => getMessagesOfChat(selectedChat?._id), {
        enabled: Boolean(selectedChat?._id),
    });

    const gridSx = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: 0.49,
        border: '1px solid lightgrey',
        borderRadius: '6px',
    };

    if (data) return (
        <Grid container spacing={2} sx={gridSx}>
            {data.map((message, index) => (
                <React.Fragment key={'index'}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}/>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Chip label={message.content} />
                    </Grid>
                </React.Fragment>
            ))}
        </Grid>
    );

    if (selectedChat && !data) return (
        <Grid container spacing={2} sx={gridSx}>
            Start a conversation!
        </Grid>
    )

    return (
        <Grid container spacing={2} sx={gridSx}>
            Select a chat to start messaging!
        </Grid>
    );
};

export default ChatBox;