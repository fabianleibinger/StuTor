import Box from '@mui/material/Box';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                alignContent: 'stretch',
                width: '96vw',
                height: '94vh',
                mx: 'auto',
                marginTop: '3vh',
                marginBottom: '3vh',
            }}
        >
            {<MyChats />}
            {<ChatBox />}
        </Box>
    );
};

export default ChatPage;