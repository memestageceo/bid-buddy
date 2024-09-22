<!-- opting into runes mode for svelte 5 -->
<svelte:options runes={true} />

<script lang="ts">
	import BidTable from './BidTable.svelte';
	import { page } from '$app/stores';

	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ActionData, PageData } from './$types';
	import { SignIn } from '@auth/sveltekit/components';
	import Auth from '$lib/custom/Auth.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<Auth />
{#if $page.data.session}
	{@const user = $page.data.session.user}
	<img src={user?.image} alt="avatar of {user?.name}" />
{/if}

<form class="mx-auto mt-8 max-w-sm" use:enhance method="post" action="?/addItem">
	<div class="mb-4">
		<Label for="name" class="mb-2 block text-sm font-bold text-gray-700">Name</Label>
		<Input
			type="text"
			id="name"
			name="name"
			class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			placeholder="Name your item"
		/>
	</div>
	<div class="flex items-center justify-between">
		<Button
			type="submit"
			class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
		>
			Post Item
		</Button>
	</div>
</form>

<div class="px-8">
	<BidTable items={data.items}></BidTable>
</div>
