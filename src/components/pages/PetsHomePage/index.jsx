import "./styles.css";
import {useEffect, useState} from 'react'

export const PetsHomePage = () => {
  const [pets, setPets] = useState ([]);

  useEffect(
    () => {
      getPets();
    }, []
  );

  const getPets = async() => {
    try{
      const response = await fetch('https://firestore.googleapis.com/v1/projects/pets-api-40916/databases/(default)/documents/pets/');
      const data = await response.json();
      console.log(data);
      const formattedData = data.documents.map((item) => {
        return item.fields
      });
      console.log(formattedData);
      setPets(formattedData);

    } catch (err){
      console.log(err);
    }
  }
  return (
    <div className="pets-page">
      |<h1 className = 'pets-title'>All Pets</h1>
      |<div className = 'pets-container'>
        {/* to do*/}
      </div>
    </div>
  );
};
