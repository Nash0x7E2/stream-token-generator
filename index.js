const express = require('express');
const StreamChat = require('stream-chat').StreamChat;
const cors = require('cors');
require('custom-env').env();

const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

app.use(express.json());
app.use(cors());

app.post("/token", async (request, response) => {
    const { name } = request.body;
    try {
        const client = new StreamChat(API_KEY, API_SECRET);
        const id = "nash";
        const user = {
            id: id.toString(),
            name: name,
            role: 'channel_member',
            image: 'https://getstream.io/random_png/?name='+name,
        };

        const token = client.createToken(user.id);
        await client.upsertUser(user);
        
        return response.status(200).json({
            token: token,
            ...user
        });
    } catch (error) {
        console.error(`Error creating token ${error}`);
        return response.status(500).send({
            error: "Token could not be created at the moment.",
        });
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));