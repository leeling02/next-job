<script>
	import { authenticateUser } from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	import { createAlert } from '../../../lib/alert.js';
	import { loading } from '../../../lib/spinner.js';
	// let formErrors = {}

	async function Login(evt) {
		evt.preventDefault();
		const username = evt.target['username'].value;
		const password = evt.target['password'].value;

		loading.set(true);
		const res = await authenticateUser(username, password);
		loading.set(false);

		if (res.success) {
			goto('/');
		} else {
			createAlert('error', 'Please check your username/password!');
		}
	}
</script>

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Login Form</title>
	<link
		href="https://cdn.jsdelivr.net/npm/daisyui@2.51.5/dist/full.css"
		rel="stylesheet"
		type="text/css"
	/>
	<script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
	<div class="relative flex flex-col justify-center h-screen overflow-hidden">
		<div
			class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg"
		>
			<h1 class="text-3xl font-semibold text-center text-gray-700">Log In</h1>
			<form on:submit={Login} class="space-y-4">
				<div>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="text-base label-text">Username</span>
					</label>
					<input
						name="username"
						type="text"
						placeholder="Email Address"
						class="w-full input input-bordered"
					/>
				</div>
				<div>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span class="text-base label-text">Password</span>
					</label>
					<input
						name="password"
						type="password"
						placeholder="Enter Password"
						class="w-full input input-bordered"
					/>
				</div>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600"
					>Forget Password?</a
				>

				<button class="btn btn-block">
					{#if $loading}
						<span class="loading loading-spinner loading-md" />
					{/if}

					Login</button
				>
			</form>
		</div>
	</div>
</body>
