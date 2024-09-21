import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	boolean,
	primaryKey
} from 'drizzle-orm/pg-core';

export const bids = pgTable('bb_bids', {
	id: serial('id').primaryKey()
});

export const users = pgTable('bb_user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image')
});

export const accounts = pgTable(
	'bb_account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);

export const sessions = pgTable('bb_session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
	'bb_verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token]
		})
	})
);

export const authenticators = pgTable(
	'authenticator',
	{
		credentialID: text('credential_id').notNull().unique(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		providerAccountId: text('provider_account_id').notNull(),
		credentialPublicKey: text('credential_public_key').notNull(),
		counter: integer('counter').notNull(),
		credentialDeviceType: text('credential_device_type').notNull(),
		credentialBackedUp: boolean('credential_backed_up').notNull(),
		transports: text('transports')
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID]
		})
	})
);

export const items = pgTable('bb_item', {
	id: serial('id').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	name: text('name').notNull()
});
