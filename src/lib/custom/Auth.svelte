<script lang="ts">
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
	import { Button, buttonVariants } from '$lib/components/ui/button';
</script>

{#if $page.data.session}
	<SignOut>
		<span class={buttonVariants({ size: 'lg' })} slot="submitButton">Signout</span>
	</SignOut>
{:else}
	<SignIn provider="google" signInPage="signin" />
{/if}
