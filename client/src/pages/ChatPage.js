import Box from '@mui/material/Box';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignContent: 'stretch',
                width: '100vw',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: 0.475,
                    height: '96vh',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                    backgroundColor: '#f5f5f5',
                }}
            >
                {<MyChats />}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: 0.475,
                    height: '96vh',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                    backgroundColor: '#f5f5f5',
                }}
            >
                {<ChatBox />}
            </Box>
        </Box>
    );
};

export default ChatPage;