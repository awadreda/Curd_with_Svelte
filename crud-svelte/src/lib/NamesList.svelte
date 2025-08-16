


<script lang="ts">
	import UpdateDailog from '../UpdateDailog.svelte';
  import { onMount } from "svelte";
  import { addNameToLocalStorage, deleteNameFromLocalStorage, getNamesFromLocalStorage, updateNameInLoacalStorage, type FullName } from "./Crud-name-logic";
  import { fade, fly } from "svelte/transition";

  let names :FullName[] =$state<FullName[]>([]);
  let nameToAdd : FullName = $state({name: '', surname: '' });
  // $effect(() => {
  //   // This will run once when the component is mounted
  //   names = getNamesFromLocalStorage();
  //   console.log("Names loaded from local storage:", names);
  // });

  let retloadNames = () => {
    names = getNamesFromLocalStorage();
    console.log("Names reloaded from local storage:", names);
  };
  
 

    let AddName = (event: Event) => {
      event.preventDefault();


      if(nameToAdd.name && nameToAdd.surname) {
        addNameToLocalStorage(nameToAdd);
        retloadNames();
        nameToAdd = { name: '', surname: '' };
      }
      
    }

    onMount(() => {
      // Load names from local storage when the component mounts
      retloadNames();
    });



      let deleteName = (name: FullName) => {
        deleteNameFromLocalStorage(name);
        retloadNames();
      };
          let searchQuery = $state('');

      const filterNames = (searchQuery:string)=> {
        
        // Filter names based on the search query
        if (!searchQuery) {
          retloadNames(); // Reload all names if search query is empty
          return;
        }
       
        names = names.filter(name => 
          name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          name.surname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
      }

      </script>
<div class="max-w-2xl mx-auto mt-10 space-y-6">

  <!-- Names List Card -->
  <div class="bg-white shadow-lg rounded-xl p-6">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Names List</h2>

    <!-- Search Bar -->
    <div class="mb-4">
      <input
        type="text"
        placeholder="Search by name or surname"
        bind:value={searchQuery}
        oninput={() => filterNames(searchQuery)}
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
    
    <ul class="divide-y divide-gray-200">
      {#if names.length > 0}
        {#each names as name (name.name + name.surname)}
          <li
            class="flex justify-between items-center py-3"
            in:fade={{ duration: 200 }}
            out:fly={{ y: 20, duration: 300 }}
          >
            <span class="text-lg font-medium text-gray-700">
              {name.name} {name.surname}
            </span>
            <div class="flex gap-2">
              <button
                onclick={() => deleteName(name)}
                class="px-3 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
              >
                Delete
              </button>
              <UpdateDailog  name={name.name} surname={name.surname}/>
              
            </div>
          </li>
        {/each}
      {:else}
        <li class="text-center text-gray-400 py-4" in:fade>No names found</li>
      {/if}
    </ul>
  </div>

  <!-- Reload Button -->
  <div class="flex justify-center">
    <button
      class="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium shadow-md transition"
      onclick={retloadNames}
    >
      Reload Names
    </button>
  </div>

  <!-- Add Name Form -->
  <form
    onsubmit={AddName}
    class="bg-white shadow-lg rounded-xl p-6 space-y-4"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        name="first name"
        bind:value={nameToAdd.name}
        placeholder="First Name"
        type="text"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        name="surname"
        bind:value={nameToAdd.surname}
        placeholder="Surname"
        type="text"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
    <button
      type="submit"
      class="w-full px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition"
    >
      Add Name
    </button>
  </form>
</div>
