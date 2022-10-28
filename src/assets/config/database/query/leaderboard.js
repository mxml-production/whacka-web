import DB from '../config/db';

import Points from "../models/points";
import User from "../models/user";
import Url from "../models/url"; 

const fetchUser = async id => {
    try {
        const token = import.meta.env.SECRET_BOT_TOKEN;
        const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
            headers: {
                Authorization: `Bot ${token}`,
            }
        });

        if (!response.ok) throw new Error(`Error status code: ${response.status}`);

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
  }

const leaderboard = async (slug) => {
    try {
        await DB();
        // Get the guildId from the slug
        const url = await Url.findOne({ slug: slug });
        
        // If the url doesn't exist, return null
        if (!url) return null;

        // Get the leaderboard
        const leaderboard = await Points.find({ guildId: url.guildId }).sort({ points: -1 }).populate('userId');

        const users = [];

        for(let user of leaderboard) {
            const userInfo = await fetchUser(user.userId.discordId);

            users.push({
                id: user.userId.discordId,
                username: userInfo.username,
                discriminator: userInfo.discriminator,
                avatar: userInfo.avatar,
                points: user.points
            });
        }

        // Return the leaderboard
        return users;
    } catch (error) {
        console.log(error);
    }
};

export default leaderboard;