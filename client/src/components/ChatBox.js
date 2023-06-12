import React from 'react';
import { useAppContext } from '../context/ChatProvider';
import { useQuery } from 'react-query';
import { getMessagesOfChat, sendMessage } from '../api/Message';
import { Stack, Box, Chip, TextField, Button } from '@mui/material';

const ChatBox = () => {

    const { selectedChat, newMessage, setNewMessage } = useAppContext();
    const { data } = useQuery(['messagesOfChat', selectedChat?._id], () => getMessagesOfChat(selectedChat?._id), {
        enabled: Boolean(selectedChat?._id),
    });

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendClick = () => {
        const userId = '6468f36705853e6071dfec63';
        const body = {
            content: newMessage,
            chatId: selectedChat._id
        };
        const { isLoading, error, data } = useQuery(['sendMessage'], () => sendMessage(userId));
        setNewMessage('');
    };

    const boxSx = {
        width: 1,
        height: 1,
        border: '1px solid lightgrey',
        borderRadius: '6px',
    };

    const stackSx = {
        width: 0.95,
        height: 0.88,
        padding: 2,
    };

    if (selectedChat && data) return (
        <Box sx={boxSx}>
            <Box overflow={'auto'} height={0.88}>
                <Stack direction='column' spacing={2} sx={stackSx}>
                    {data.map((message, index) => (
                        <Stack
                            key={index}
                            direction='row'
                            justifyContent={index % 2 === 0 ? 'flex-end' : 'flex-start'}
                        >
                            <Chip label={message.content} />
                        </Stack>
                    ))}
                </Stack>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 'auto', padding: 1 }}>
                <TextField
                    label="Message"
                    value={newMessage}
                    onChange={handleInputChange}
                    marginRight={1}
                    fullWidth
                />
                <Button variant="contained" onClick={handleSendClick}>
                    Send
                </Button>
            </Box>
        </Box>
    );

    if (selectedChat && !data) return (
        <Box sx={boxSx}>
            <Stack direction='column' spacing={2} sx={stackSx}>
                <Chip label='Start a conversation!' />
            </Stack>
        </Box>
    )

    return (
        <Box sx={boxSx}>
            <Stack direction='column' spacing={2} sx={stackSx}>
                <Chip label='Select a chat to start messaging!' />
            </Stack>
        </Box>
    );
};

export default ChatBox;