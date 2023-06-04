import React from 'react';
import { Box } from '@mui/material';

const ChatBox = () => {
    return (
        <div>
            <h1>Chat Box</h1>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: 'auto',
                    height: 'auto',
                    padding: '20px',
                    border: '1px solid black',
                }}
            >
            </Box>
        </div>
    );
};

export default ChatBox;