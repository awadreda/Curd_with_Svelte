<script lang="ts">
  // import DialogClose from "$lib/components/ui/dialog/dialog-close.svelte";
  import { updateNameInLoacalStorage, type FullName } from "$lib/Crud-name-logic.js";
  import { Button, buttonVariants } from "./lib/components/ui/button/index.js";
  import * as Dialog from "./lib/components/ui/dialog/index.js";
  import { Input } from "./lib/components/ui/input/index.js";
  import { Label } from "./lib/components/ui/label/index.js";
  let {name,surname}:FullName =$props();
  let open = $state(false);
  let NewFullName: FullName = $state({
    name: name,
    surname: surname
  });
  

  let updateName = () => {
    if (NewFullName.name && NewFullName.surname) {
      // Call the update function with the new name
      updateNameInLoacalStorage({name,surname}, NewFullName);
      // Optionally, you can close the dialog or reset the form
      open = false;
      realoadNames();
      
  };
  };
  

  function realoadNames() {
    throw new Error("Function not implemented.");
  }
</script>
  
 <Dialog.Root bind:open ={open}> >
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
   >UpdateName</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-[425px]">
   <Dialog.Header>
    <Dialog.Title>Edit profile</Dialog.Title>
    <Dialog.Description>
     Make changes to your profile here. Click save when you're done.
    </Dialog.Description>
   </Dialog.Header>
   <div class="grid gap-4 py-4">
    <div class="grid grid-cols-4 items-center gap-4">
     <Label for="frist-name" class="text-right">Frist Name</Label>
     <Input id="first-name" bind:value={NewFullName.name} class="col-span-3" />
    </div>
    <div class="grid grid-cols-4 items-center gap-4">
     <Label for="surname" class="text-right">Sur Name</Label>
     <Input id="surname" bind:value={NewFullName.surname} class="col-span-3" />
    </div>
   </div>
   <Dialog.Footer>
    <Button  onclick={updateName} type="submit">Update</Button>
   </Dialog.Footer>
  </Dialog.Content>
 </Dialog.Root>