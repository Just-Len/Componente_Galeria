import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonAlert,
  IonButton,
} from '@ionic/react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { app } from '../../Services/firebase/config/firebaseConfig';

const Gallery: React.FC = () => {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarImagenes = async () => {
    setCargando(true);
    const storage = getStorage(app);
    const carpetaRef = ref(storage, 'imagenes/');

    try {
      const listado = await listAll(carpetaRef);
      const urls = await Promise.all(
        listado.items.map((item) => getDownloadURL(item))
      );
      setImagenes(urls);
    } catch (e: any) {
      console.error('Error cargando imágenes:', e);
      setError(e.message || 'No se pudieron cargar las imágenes');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarImagenes();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Galería de Fotos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={cargarImagenes}>
          Actualizar galería
        </IonButton>

        {cargando ? (
          <IonSpinner name="crescent" />
        ) : error ? (
          <IonAlert
            isOpen={!!error}
            header="Error"
            message={error}
            buttons={['OK']}
            onDidDismiss={() => setError(null)}
          />
        ) : imagenes.length === 0 ? (
          <p>No hay imágenes para mostrar.</p>
        ) : (
          <IonGrid>
            <IonRow>
              {imagenes.map((url, index) => (
                <IonCol size="6" key={index}>
                  <IonImg
                    src={url}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Gallery
