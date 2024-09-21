import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { database } from '$lib/server/db';
import { accounts } from '$lib/server/db/schema';
import { users, sessions, verificationTokens } from './lib/server/db/schema';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(database, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens
	}),
	providers: [Google]
});
