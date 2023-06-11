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
                height: '92vh',
                mx: 'auto',
                marginTop: '4vh',
                marginBottom: '3vh',
            }}
        >
            <Box width={0.49} height={1}>
                {<MyChats />}
            </Box>
            <Box width={0.49} height={1}>
                {<ChatBox />}
            </Box>
        </Box >
    );
};

export default ChatPage;