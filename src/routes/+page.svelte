<!-- opting into runes mode for svelte 5 -->
<svelte:options runes={true} />

<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ActionData, PageData } from './$types';
	import * as Table from '$lib/components/ui/table/index';
	let bidAmount = $state(0);

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

{#snippet viewData()}
	<div class="my-16 grid w-full grid-cols-2">
		<pre>{JSON.stringify(data, null, 2)}</pre>
		<pre>
		Formdata 📝:
		{JSON.stringify(form, null, 2)}
	</pre>
	</div>
{/snippet}

<form class="mx-auto mt-8 max-w-sm" use:enhance method="post" action="?/placeBid">
	<div class="mb-4">
		<Label for="bidAmount" class="mb-2 block text-sm font-bold text-gray-700">Bid Amount</Label>
		<Input
			type="number"
			id="bidAmount"
			name="bidAmount"
			bind:value={bidAmount}
			min="0"
			step="1"
			class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
			placeholder="Enter bid amount"
		/>
	</div>
	<div class="flex items-center justify-between">
		<Button
			type="submit"
			class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
		>
			Place Bid
		</Button>
	</div>
</form>

<!-- {@render viewData()} -->
<div class="mt-8">
	<h2 class="mb-4 text-2xl font-bold">Bids</h2>
	<Table.Root>
		<Table.Caption>A list of bids</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>ID</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.users as bid}
				<Table.Row>
					<Table.Cell>{bid.id}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
