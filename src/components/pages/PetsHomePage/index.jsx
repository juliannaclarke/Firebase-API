import "./styles.css";
import {useEffect, useState, useContext} from 'react'
import { PetItem } from "../../PetItem";
import PetsOrderContext from "../../../context/petsOrderContext";
import { Search } from "../../Search";

export const PetsHomePage = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchString, setSearchString] = useState('');

  const globalState = useContext(PetsOrderContext);

  useEffect(
    () => {
      getPets();
    }, []
  );

  const getPets = async() => {
    try{
      const response = await fetch('https://firestore.googleapis.com/v1/projects/pets-api-40916/databases/(default)/documents/pets/');
      const data = await response.json();

      const formattedData = data.documents.map((item) => {
        return item.fields
      });

      setPets(formattedData);
      setFilteredPets(formattedData);
      globalState.initializePets(formattedData);

    } catch (err){
      console.log(err);
    }
  }

  const handleSearchUpdate = (event) => {
    setSearchString(event.target.value)
  }

  return (
    <div className="pets-page">
      <h1 className = 'pets-title'>All Pets</h1>
      <Search handleSearchUpdate = {handleSearchUpdate}/>
      <div className = 'pets-container'>
        {
          filteredPets.map((pet) => (
            <PetItem key={pet.id.stringValue} image={pet.image.stringValue} name={pet.name.stringValue} 
            breed={pet.breed.stringValue} age= {pet.age.stringValue}
            type={pet.petType.stringValue} id={pet.id.stringValue}></PetItem>
          ))
        }
      </div>
    </div>
  );
};
