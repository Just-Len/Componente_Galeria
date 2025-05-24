import Gallery from "../components/gallery/Gallery"
import AppHeader from "../components/head/AppHeader";
import {   IonPage   } from "@ionic/react";
 

const GalleryPage: React.FC = () => {
  return (
    <IonPage>
      <AppHeader title='Galeria' showMenuButton={true} /> 
      <h1>Galeria</h1> 
        <Gallery/> 
    </IonPage>
  );
};

export default GalleryPage;
