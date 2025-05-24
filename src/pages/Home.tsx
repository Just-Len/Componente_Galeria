import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import AppHeader from "../components/head/AppHeader";
import FirebaseStatus from "../components/cargarServicio";
import Acelerometro from "../components/acelerometro";
import BarCode from "../components/barCode/barCode";
import CapturaFotoPage from "../components/capturarFotos/CapturaFoto";

const Home: React.FC = () => {
  return (
    <IonPage>
      <AppHeader title='Home - Notifaciones' showMenuButton={true} />
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
      <h1>Home</h1>
      <CapturaFotoPage />
      <BarCode />
      <Acelerometro />
      <FirebaseStatus />
    </IonPage>
  );
};

export default Home;
