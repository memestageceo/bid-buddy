import type { Actions } from '@sveltejs/kit';
import { database } from '$lib/server/db';
import { bids } from '$lib/server/db/schema';

export const load = async () => {
	const users = await database.query.bids.findMany();
	return {
		message: 'Hello World',
		users
	};
};

export const actions: Actions = {
	// places a bid in database
	placeBid: async ({ request }) => {
		const data = await request.formData();
		const bidAmount = String(data.get('bidAmount'));
		// action to insert bid with amount in the database
		try {
			const newBid = await database.insert(bids).values({});
			return {
				success: true,
				message: `Bid placed successfully with amount: ${bidAmount}`,
				bid: newBid[0]
			};
		} catch (error) {
			console.error('Error placing bid:', error);
			return {
				success: false,
				message: 'Failed to place bid. Please try again.'
			};
		}
	}
};
