<script>
	import { getUserId } from '../../../../utils/auth.js';
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';

   export let data; 
   console.log(data)

   async function updateJob(evt) {
    evt.preventDefault()

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
        throw 'Update a Job Failed';
      }
    }

</script>

<div id="update">
	<form on:submit={updateJob} class="space-y-4">
        <div>
            <label class="label">
                <span class="text-base label-text">Job Title </span>
                <input name="jobTitle" type="text" value={data.job.title} placeholder="eg.Software Engineer" class="w-full input input-bordered" />
            </label>
            
        </div>
        <div>
            <label class="label">
                <span class="number-base label-number">Min Annual Compensation</span>
                <input name="minAnnualCompensation" type="number" value={data.job.minAnnualCompensation} placeholder="eg.100,000" class="w-full input input-bordered" />
            </label>
            
        </div>
        <div>
            <label class="label">
                <span class="number-base label-number">Max Annual Compensation</span>
                <input name = "maxAnnualCompensation" type="number" value={data.job.maxAnnualCompensation} placeholder="eg.200,000" class="w-full input input-bordered" />
            </label>
            
        </div>
        <div>
            <label class="label">
                <span class="text-base label-text">Company Name</span>
                <input
                name="companyName"
                type="text"
                value={data.job.employer}
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
                value={data.job.location}
                placeholder="eg.New York"
                class="w-full input input-bordered"
            />
            </label>
            
        </div>
        <label class="label">
            <span>Description</span>
            <input name="description" type="text" value={data.job.description} placeholder="" class="w-full input input-bordered" />
        </label>

        <label class="label">
            <span>Requirements</span>
            <input name="requirements" type="text" value={data.job.requirements} placeholder="" class="w-full input input-bordered" />
        </label>

        <label class="label">
            <span>Application Instructions</span>
            <input name="applicationInstructions" type="text" value={data.job.applicationInstructions} placeholder="" class="w-full input input-bordered" />
        </label>

        <div />
        <div>
            <button class="btn btn-block">Update</button>
        </div>
        
    </form>
</div>
