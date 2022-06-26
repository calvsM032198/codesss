import React,{useState,useEffect} from 'react'
import axios from 'axios'

const AddingOrdinance = () => {
    const [ordinances, setOrdinanances] = useState({
        violationId:"",
        violationName:"",
        violationPrice:""
    })
    const [status, setStatus] = useState(true)
    
    const handleOnChange = (event) =>{
        setOrdinanances({
            ...ordinances,
            [event.target.name]: event.target.value
        })
    }

    const handleSave = async(e) => {
        e.preventDefault()
         try {
            const result = await axios.post('/ordinancesPost',ordinances)
            if(result.status == 201) {
                alert(`Status ${result.status} Item Added`)
                clearForm()
            }
         } catch (error) {
             alert(`ID must be unique or ${error}`)
             clearForm()
         }
    }
    const clearForm = () => {
        document.getElementById("myOrdinanceForm").reset(); 
        setOrdinanances({
            violationId:"",
            violationName:"",
            violationPrice:""
        })
    }

    return (
       
        <div className="ordinance--container">
            <div className="ordinance--header">
              <h3>  Adding Ordinances </h3>
            </div>
            <div className="ordinance--inputs">
                <form id="myOrdinanceForm" className="ordinance--form" onSubmit={handleSave}>
                    <label> Ordinance ID: </label>
                        <input 
                        name={"violationId"} 
                        type="number"
                        required
                        value={ordinances.violationId}
                        onChange={handleOnChange}
                        />
                    <label> Ordinance Name: </label>
                        <input
                        name={"violationName"} 
                        required
                        type="text"
                        value={ordinances.violationName}
                        onChange={handleOnChange}
                        /> 
                    <label> Ordinance Price: </label>
                        <input 
                        name={"violationPrice"}
                        type="number"
                        required
                        value={ordinances.violationPrice}
                        onChange={handleOnChange}
                        />
                    <input value="Save"type="submit"/>
                </form>
            </div>
        </div>
    )
}

export default AddingOrdinance
