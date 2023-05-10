import data from "./data"
import { useState } from "react";

const App = () => {
  const [people, setPeople] = useState(data) 
  const [isActive, setActive] = useState("false")
  let newPeople = people

  const toggleForm = () => {
    setActive(!isActive)
  }
  const removeOnePerson = (id) => {
    let newData = people.filter((elem) => elem.id != id)
    setPeople(newData)
  }
  const removeAll = () => {
    setPeople([])
  }

  const addPerson = () => {
    const inputs = document.getElementsByClassName("form-input")
    const name = inputs[0]
    newPeople = [...newPeople, {id: newPeople.length + 1, name: name.value, birthday: inputs[1].value, age: Number(inputs[2].value)}]
    setPeople(newPeople)
    console.log(people, newPeople);
  }
  const getFirstName = (name) => {
    return name.split(" ")[0]
  }

  return (
    <div className="container">
      <h2 className="title">Birthday Reminder</h2>
      <div className="table">
        {people.map((person) => {
          return (
            <div className="person-div" key={person.id}>
              <h4 className="person-name">{person.name}</h4><p className="person-info">{() => getFirstName(person.name)} turns {person.age + 1} on {person.birthday} </p>
              <button className="btn remove" onClick={() => removeOnePerson(person.id)}>-</button>
            </div>   
          )
        })}
        <h3 className="title">People on your Birthday List: {people.length} </h3>
        <div className="buttons">
          <button className="btn" type="button" onClick={toggleForm}>Add Person</button>
          <button className="btn clear" onClick={removeAll}>Clear List</button>
        </div>
          <form className={isActive ? "form active" : "form"}>
            <div>Name: <input type="text" className="form-input"/></div>
            <div>Birthday: <input type="text" className="form-input"/></div>
            <div>Age: <input type="text" className="form-input"/></div>
          </form>
        <button className={isActive ? "btn submit active" : "btn submit"} onClick={() => addPerson()}>Submit</button>
      </div>
    </div>
    
  );
};
export default App; 
