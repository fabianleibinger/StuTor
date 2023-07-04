import Box from '@mui/material/Box';
import MyChats from '../components/Chat/MyChats';
import ChatBox from '../components/Chat/ChatBox';

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
                marginTop: '1vh',
                marginBottom: '1vh',
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