import data from "./data"
import { useEffect, useState } from "react";

const App = () => {
  const [people, setPeople] = useState(data) 
  const [isActive, setActive] = useState("false")
  let newPeople = [...people]

  // get saved user data from the last visited time on initial render and set it equal to people
  useEffect(() => {
    let savedData = localStorage.getItem("birthdays")
    console.log(savedData);
    if(savedData) {
      const userDataArray = JSON.parse(savedData)
      console.log(userDataArray);
      setPeople(userDataArray)
    }
  }, [])

  // Button Actions
  const toggleForm = () => {
    setActive(!isActive)
  }
  const removeOnePerson = (id) => {
    let newData = people.filter((elem) => elem.id != id)
    setPeople(newData)
    saveUserData(newData)
  }
  const removeAll = () => {
    setPeople([])
    saveUserData([])
  }
  const addPerson = () => {
    const inputs = document.getElementsByClassName("form-input")
    newPeople = [...newPeople, {id: newPeople.length + 1, name: inputs[0].value, birthday: inputs[1].value, age: Number(inputs[2].value)}]
    setPeople(newPeople)
    saveUserData(newPeople)
  }
  
  // save user data in localStorage
  const saveUserData = (data) => {
    localStorage.removeItem("birthdays")
    const userDataJSON = JSON.stringify(data)
    console.log(userDataJSON);
    localStorage.setItem("birthdays", userDataJSON)
  }
 
  

  return (
    <div className="container">
      <h2 className="title">Birthday Reminder</h2>
      <div className="table">
        {people.map((person) => {
          return (
            <div className="person-div" key={person.id}>
              <h4 className="person-name">{person.name}</h4><p className="person-info">turns {person.age + 1} on {person.birthday} </p>
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
