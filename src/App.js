import React from 'react';
import { generateId } from './utils';
import './App.css';

function App() {

  const dummyData = [
    {
      id: generateId(), name: "userName", inputType: "text", value: "Adam",
      children: [
        { 
          id: generateId(), name: "address", inputType: "textArea", value: "USA",
          children: [
            { id: generateId(), name: "address", inputType: "textArea", value: ""},
            { 
              id: generateId(), name: "userName", inputType: "text", value: "Raj",
              children: [
                { id: generateId(), name: "address", inputType: "textArea", value: "INDIA"},
                { id: generateId(), name: "phone", inputType: "text", value: "A4B"}
              ]
            }
          ]
        },
        { id: generateId(), name: "phone", inputType: "text", value: ""}
      ]
    },
    {
      id: generateId(), name: "userName", inputType: "text", value: "Adam",
      children: [
        { id: generateId(), name: "address", inputType: "textArea", value: ""},
        { id: generateId(), name: "phone", inputType: "text", value: ""}
      ]
    }
  ];

  const newArray = [];

  const handleChange = (data, id, updatedValue) => {
    data.forEach(item => {
      if (typeof(item) === "object" && !!item) {
        for (let key in item) {
          if (Array.isArray(item[key])) handleChange(item[key], id, updatedValue)
          else if(item[key] === id) item.value = updatedValue;
        }
      }
    })
  }

  const handleInputTypes = (data) => {
    let { id, inputType, name, value } = data;

    if (inputType === "text") {
      return (
        <input 
          name={name}
          type="text"
          defaultValue={!!value ? value : ""}
          onChange={(e) => handleChange(dummyData, id, e.target.value)}
        />
      )
    }

    if (inputType === "textArea") {
      return (
        <textarea
          name={name}
          defaultValue={!!value ? value : ""}
          onChange={(e) => handleChange(dummyData, id, e.target.value)}
        >
        </textarea>
      )
    }
  }

  const handleData = (data) => {
    data.forEach(item => {
      if (typeof(item) === "object" && !!item) {
        for (let key in item) {
          if (Array.isArray(item[key])) handleData(item[key])
          else if (!newArray.includes(item)) newArray.push(item)
        }
      }
    })

    return (
      <form 
        className="App"
        onSubmit={(e) => {
          e.preventDefault()
          // console.log(dummyData) // uncomment to see change in the JSON data structure given in PDF.
          console.log(newArray);
        }}
        >
        {
          newArray.map((child, k) => {
            return (
              <section key={k}>
                <div className="ptag">
                  <p>{child.name}</p>
                </div>
                {handleInputTypes(child)}
              </section>
            )
          })
        }
        <div className="submit-div">
          <input type="submit" value="Submit" className="submit" />
        </div>
      </form>
    )
  }

  return (
    <div>
      {handleData(dummyData)}
    </div>
  )
}

export default App;