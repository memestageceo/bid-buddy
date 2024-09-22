import type { Actions } from '@sveltejs/kit';
import { database } from '$lib/server/db';
import { bids, items } from '$lib/server/db/schema';

export const load = async () => {
	const items = await database.query.items.findMany();
	return {
		items
	};
};

export const actions: Actions = {
	// add item to database
	addItem: async ({ request, locals }) => {
		const session = await locals.auth();

		console.log('🚀 ~ addItem: ~ session:', session);

		if (!session) return null;
		if (!session.user) return null;
		if (!('email' in session.user)) return null;
		const formData = await request.formData();

		await database.insert(items).values({
			name: formData.get('name') as string,
			userId: session.user.id
		});
	}
};
