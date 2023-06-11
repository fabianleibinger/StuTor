import React from 'react';
import { useAppContext } from '../context/ChatProvider';
import { useQuery } from 'react-query';
import { getMessagesOfChat } from '../api/Message';
import { Stack, Box, Chip } from '@mui/material';

const ChatBox = () => {

    const { selectedChat } = useAppContext();
    const { data } = useQuery(['messagesOfChat', selectedChat?._id], () => getMessagesOfChat(selectedChat?._id), {
        enabled: Boolean(selectedChat?._id),
    });

    const stackSx = {
        width: 0.95,
        height: 0.94,
        padding: 2,
        border: '1px solid lightgrey',
        borderRadius: '6px',
    };

    if (selectedChat && data) return (
        <Box
            sx={{
                width: 1,
                height: 1,
                overflow: 'auto'
            }}
        >
            <Stack direction='column' spacing={2} sx={stackSx}>
                {data.map((message, index) => (
                    <Stack
                        key={index}
                        direction='row'
                        justifyContent={index % 2 == 0 ? 'flex-end' : 'flex-start'}
                    >
                        <Chip label={message.content} />
                    </Stack>
                ))}
            </Stack>
        </Box>
    );

    if (selectedChat && !data) return (
        <Stack direction='column' spacing={2} sx={stackSx}>
            <Chip label='Start a conversation!' />
        </Stack>
    )

    return (
        <Stack direction='column' spacing={2} sx={stackSx}>
            <Chip label='Select a chat to start messaging!' />
        </Stack>
    );
};

export default ChatBox;