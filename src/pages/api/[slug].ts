import type { APIRoute } from "astro";

import leaderboardQuery from "../../assets/config/database/query/leaderboard";

export const get: APIRoute = async ({ params, request }) => {
    console.log('Slug: ', params.slug);

    const { slug } = params;

    const leaderboard = await leaderboardQuery(slug);

    if (!leaderboard) {
        return new Response(JSON.stringify({
            success: false,
            message: "The leaderboard doesn't exist"
        }), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return new Response(JSON.stringify({
        success: true,
        leaderboard
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}