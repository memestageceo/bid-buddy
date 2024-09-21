<script lang="ts">
	import * as Table from '$lib/components/ui/table/index';
	import type { items } from '$lib/server/db/schema';
	// import type { PageData } from './$types';

	let { items: itemArr }: { itemArr: typeof items } = $props();
</script>

<div class="mt-8">
	<h2 class="mb-4 text-2xl font-bold">Items</h2>
	<Table.Root>
		<Table.Caption>A list of items</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>ID</Table.Head>
				<Table.Head>Name</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each items as item}
				<Table.Row>
					<Table.Cell>{item.id}</Table.Cell>
					<Table.Cell>{item.name}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
