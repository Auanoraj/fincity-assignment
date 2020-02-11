import React, { useState } from 'react';
import './App.css';

function App() {

  const [ name, setName ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ phone, setPhone ] = useState("");

  const dummyData = [
    {
      name: "userName", inputType: "text", value: "Adam",
      children: [
        { name: "address", inputType: "textArea", value: "A2B"},
        { name: "phone", inputType: "text", value: ""}
      ]
    },
    // {
    //   name: "userName", inputType: "text", value: "Adam",
    //   children: [
    //     { name: "address", inputType: "textArea", value: ""},
    //     { name: "phone", inputType: "text", value: ""}
    //   ]
    // }
  ]

  const handleSubmit = (e, data, index) => {
    e.preventDefault()
    
    let newObj, newName, newAddress, newPhone;

    if (!!name) newName = name;
    else newName = data.value;
    if (!!address) newAddress = address;
    else newAddress = data.children[0].value;
    if (!!phone) newPhone = phone;
    else newPhone = data.children[1].value;

    newObj = {
      name: "userName", inputType: "text", value: newName,
      children: [
        { name: "address", inputType: "textArea", value: newAddress },
        { name: "phone", inputType: "text", value: newPhone }
      ]
    }

    dummyData.splice(index, 1, newObj)

    setName("")
    setAddress("")
    setPhone("")

    console.log(dummyData);
  }

  const handleInputTypes = (data) => {
    let { inputType, name, value } = data;

    if (inputType === "text") {
      return (
        <input 
          type="text"
          defaultValue={!!value ? value : ""}
          onChange={(e) => {
            if (name === "userName") setName(e.target.value)
            else setPhone(e.target.value)
          }}
        />
      )
    }

    if (inputType === "textArea") {
      return (
        <textarea
          defaultValue={!!value ? value : ""}
          onChange={(e) => setAddress(e.target.value)}
        >
        </textarea>
      )
    }
  }

  return (
    dummyData.map((item, i) => {
      return (
        <form 
          key={i}
          className="App"
          onSubmit={(e) => handleSubmit(e, item, i)}
          >
          <section>
            <div className="ptag">
              <p>{item.name}</p>
            </div>
            <div className="input_div">
              {handleInputTypes(item)}
            </div>
          </section>
          {
            item.children.map((child, k) => {
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
    })
  )
}

export default App;