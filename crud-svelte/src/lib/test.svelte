

<script lang="ts">

type Person = {
  name:string,
  surname:string
}


let people = $state([
  { name: 'Rich', surname: 'Harris' },
  { name: 'Ryan', surname: 'Carniato' },
  { name: 'Evan', surname: 'You' },
])

let selected = $state<Person>()

  let person = $state({name:'',surname:''})

  let prefix = $state('') 
  const filteredPeople = $derived(
    prefix? people.filter( (p) => p.surname.toLocaleLowerCase().startsWith(prefix) ) : people,
  )


  $effect(() => {
    person ={
      name:selected?.name ?? '',
      surname:selected?.surname ?? '',
    }
  })


  const createPerson = () => {
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