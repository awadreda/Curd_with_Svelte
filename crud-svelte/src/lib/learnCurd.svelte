<script lang="ts">
	type Person = {
		name: string
		surname: string
	}

	let people = $state([
		{ name: 'Rich', surname: 'Harris' },
		{ name: 'Ryan', surname: 'Carniato' },
		{ name: 'Evan', surname: 'You' },
	])
	let selected = $state<Person>()
	let person = $state({ name: '', surname: '' })

	let prefix = $state('')
	const filteredPeople = $derived(
		prefix ? people.filter((p) => p.surname.toLowerCase().startsWith(prefix)) : people,
	)

	$effect(() => {
		person = {
			name: selected?.name ?? '',
			surname: selected?.surname ?? '',
		}
	})

	function createPerson() {
		people.push(person)
		clearFields()
	}

	function updatePerson() {
		const index = people.indexOf(selected!)
		people[index] = { name: person.name, surname: person.surname }
	}

	function deletePerson() {
		people = people.filter((p) => p.name !== person.name || p.surname !== person.surname)
		clearFields()
	}

	function clearFields() {
		person = { name: '', surname: '' }
	}
</script>





<div class="container">
	<div class="search">
		<label class="group">
			<span>🔎 Filter prefix:</span>
			<input type="text" bind:value={prefix} placeholder="Type to filter..." />
		</label>
	</div>

	<label class="people">
		<span class="sr-only">Names:</span>
		<select bind:value={selected} size="7">
			{#each filteredPeople as person}
				<option value={person}>{person.surname}, {person.name}</option>
			{/each}
		</select>
	</label>

	<div class="details card">
		<label class="group">
			<span>👤 Name:</span>
			<input type="text" bind:value={person.name} placeholder="Enter name..." />
		</label>

		<label class="group">
			<span>📝 Surname:</span>
			<input type="text" bind:value={person.surname} placeholder="Enter surname..." />
		</label>
	</div>

	<div class="actions">
		<button class="btn create" onclick={createPerson}>➕ Create</button>
		<button class="btn update" onclick={updatePerson}>💾 Update</button>
		<button class="btn delete" onclick={deletePerson}>🗑 Delete</button>
	</div>
</div>

<style>
	:root {
		--bg: #1e1e2e;
		--card: #2a2a3d;
		--text: #e0e0e0;
		--accent: #6c63ff;
		--danger: #ff5c5c;
		--success: #4caf50;
		--radius: 10px;
		--gap: 1rem;
	}

	body {
		background-color: var(--bg);
		color: var(--text);
		font-family: "Segoe UI", sans-serif;
	}

	.container {
		width: 600px;
		margin: 2rem auto;
		background: var(--card);
		padding: var(--gap);
		border-radius: var(--radius);
		display: grid;
		grid-template-areas:
			'search .'
			'people details'
			'actions actions';
		grid-template-columns: 250px 1fr;
		gap: var(--gap);
		box-shadow: 0 4px 15px rgba(0,0,0,0.4);
	}

	/* search */
	.search {
		grid-area: search;
	}
	.search .group {
		display: flex;
		align-items: center;
		gap: .5rem;
	}
	.search input {
		flex: 1;
		padding: .4rem .6rem;
		border-radius: var(--radius);
		border: 1px solid #444;
		background: #1b1b2b;
		color: var(--text);
	}

	/* people list */
	.people {
		grid-area: people;
	}
	.people select {
		width: 100%;
		height: 100%;
		padding: .5rem;
		border-radius: var(--radius);
		background: #1b1b2b;
		color: var(--text);
		border: 1px solid #444;
	}

	/* details card */
	.details {
		grid-area: details;
		display: grid;
		gap: .8rem;
		padding: var(--gap);
		border-radius: var(--radius);
		background: #1b1b2b;
	}
	.details .group {
		display: flex;
		flex-direction: column;
		gap: .3rem;
	}
	.details input {
		padding: .4rem .6rem;
		border-radius: var(--radius);
		border: 1px solid #444;
		background: #2a2a3d;
		color: var(--text);
	}

	/* actions */
	.actions {
		grid-area: actions;
		display: flex;
		justify-content: flex-end;
		gap: .6rem;
	}
	.btn {
		padding: .5rem 1rem;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		color: white;
		font-weight: 600;
		transition: transform .2s ease, opacity .2s ease;
	}
	.btn:hover {
		transform: translateY(-2px);
		opacity: 0.9;
	}
	.btn.create { background: var(--success); }
	.btn.update { background: var(--accent); }
	.btn.delete { background: var(--danger); }
</style>
