import Box from '@mui/material/Box';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
    return (
        <div style={{ width: "100%" }}>
            <Box>
                <h1>Chat Page</h1>
                {<MyChats />}
                {<ChatBox />}
            </Box>
        </div>
    );
};

export default ChatPage;