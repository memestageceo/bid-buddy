import type { Actions } from '@sveltejs/kit';
import { database } from '$lib/server/db';
import { bids, items } from '$lib/server/db/schema';
import { signIn } from '../auth';

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

		if (!session) return null;
		if (!session.user) return null;
		const formData = await request.formData();
		const itemName = String(formData.get('name'));

		await database.insert(items).values({
			name: itemName,
			userId: session.user.id
		});
	}
};
