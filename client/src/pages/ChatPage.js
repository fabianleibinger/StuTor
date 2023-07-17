import Box from '@mui/material/Box';
import MyChats from '../components/Chat/MyChats';
import ChatBox from '../components/Chat/ChatBox';

/**
 * The Chat Page.
 * Incorporates the MyChats and ChatBox components.
 */
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
                width: '97vw',
                height: '90vh',
                mx: 'auto',
                marginTop: '2vh',
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