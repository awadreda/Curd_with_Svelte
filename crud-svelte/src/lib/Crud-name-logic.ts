
interface FullName {
  name:string
  surname:string}


let addNameToLocalStorage = (fullName:FullName):void => {

  let names:FullName[] = JSON.parse(localStorage.getItem('names')||'[]');
  names.push(fullName);
localStorage.setItem('names',JSON.stringify(names));
}


let getNamesFromLocalStorage = ():FullName[] => {
  let names:FullName[] = JSON.parse(localStorage.getItem('names')||'[]');
  return names;
}



let deleteNameFromLocalStorage = (fullName:FullName):void => {
  let names:FullName[] = JSON.parse(localStorage.getItem('names')||'[]');
  names = names.filter(fnameItem => fnameItem.name !== fullName.name || fnameItem.surname !== fullName.surname);
  localStorage.setItem('names', JSON.stringify(names));
}


let updateNameInLoacalStorage = (oldName:FullName,newName:FullName):void => {

  let names:FullName[] = JSON.parse(localStorage.getItem('names')||'[]');
  names = names.map(fnameItem => {
    if(fnameItem.name === oldName.name && fnameItem.surname === oldName.surname) {
      return newName;
    }
    return fnameItem;
  })
  localStorage.setItem('names',JSON.stringify(names));

}



export { addNameToLocalStorage, getNamesFromLocalStorage, deleteNameFromLocalStorage, updateNameInLoacalStorage };
export type { FullName };
























