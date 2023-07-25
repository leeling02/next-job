<script>
	import { getTokenFromLocalStorage } from '../../../utils/auth';
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { getUserId } from '../../../utils/auth';
	import { createAlert } from '../../../lib/alert';
	import { loading } from '../../../lib/spinner';

	if (!getTokenFromLocalStorage()) {
		createAlert('error', 'Please sign in');

		goto('../users/login');
	}

	async function createJob(evt) {
		evt.preventDefault();

		const jobData = {
			user: getUserId(),
			title: evt.target['jobTitle'].value,
			minAnnualCompensation: evt.target['minAnnualCompensation'].value,
			maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
			employer: evt.target['companyName'].value,
			location: evt.target['jobLocation'].value,
			description: evt.target['description'].value,
			requirements: evt.target['requirements'].value,
			applicationInstructions: evt.target['applicationInstructions'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jobData)
		});

		const res = await resp.json();

		if (resp.status == 200) {
			goto(`/jobs/${res.id}`);
		} else {
			throw 'Post a Job Failed';
		}
	}
</script>

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Create Job Form</title>
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
			class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl"
		>
			<h1 class="text-3xl font-semibold text-center text-gray-700">Post a Job</h1>
			<form on:submit={createJob} class="space-y-4">
				<div>
					<label class="label">
						<span class="text-base label-text">Job Title </span>
						<input
							name="jobTitle"
							type="text"
							placeholder="eg.Software Engineer"
							class="w-full input input-bordered"
						/>
					</label>
				</div>
				<div>
					<label class="label">
						<span class="number-base label-number">Min Annual Compensation</span>
						<input
							name="minAnnualCompensation"
							type="number"
							placeholder="eg.100,000"
							class="w-full input input-bordered"
						/>
					</label>
				</div>
				<div>
					<label class="label">
						<span class="number-base label-number">Max Annual Compensation</span>
						<input
							name="maxAnnualCompensation"
							type="number"
							placeholder="eg.200,000"
							class="w-full input input-bordered"
						/>
					</label>
				</div>
				<div>
					<label class="label">
						<span class="text-base label-text">Company Name</span>
						<input
							name="companyName"
							type="text"
							placeholder="eg.Tech Tag"
							class="w-full input input-bordered"
						/>
					</label>
				</div>

				<div>
					<label class="label">
						<span>Job Location</span>
						<input
							name="jobLocation"
							type="text"
							placeholder="eg.New York"
							class="w-full input input-bordered"
						/>
					</label>
				</div>
				<label class="label">
					<span>Description</span>
					<input
						name="description"
						type="text"
						placeholder=""
						class="w-full input input-bordered"
					/>
				</label>

				<label class="label">
					<span>Requirements</span>
					<input
						name="requirements"
						type="text"
						placeholder=""
						class="w-full input input-bordered"
					/>
				</label>

				<label class="label">
					<span>Application Instructions</span>
					<input
						name="applicationInstructions"
						type="text"
						placeholder=""
						class="w-full input input-bordered"
					/>
				</label>

				<div />
				<div>
					<button class="btn btn-block">
						{#if $loading}
							<span class="loading loading-spinner loading-md" />
						{/if}

						Create Job</button
					>
				</div>
			</form>
		</div>
	</div>
</body>
