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
  IonIcon,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../../Services/firebase/config/firebaseConfig';

const Gallery: React.FC = () => {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imagenAEliminar, setImagenAEliminar] = useState<string | null>(null);

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

  const eliminarImagen = async (url: string) => {
    try {
      const storage = getStorage(app);
      const path = decodeURIComponent(new URL(url).pathname.split('/o/')[1].split('?')[0]);
      const imageRef = ref(storage, path);

      await deleteObject(imageRef);
      setImagenes((prev) => prev.filter((img) => img !== url));
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      setError('No se pudo eliminar la imagen');
    } finally {
      setImagenAEliminar(null);
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
                  <div style={{ position: 'relative' }}>
                    <IonImg
                      src={url}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        objectFit: 'cover',
                      }}
                    />
                    <IonButton
                      color="danger"
                      size="small"
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        zIndex: 1,
                        borderRadius: '50%',
                        minWidth: 'unset',
                        width: '32px',
                        height: '32px',
                      }}
                      onClick={() => setImagenAEliminar(url)}
                    >
                      <IonIcon icon={trash} />
                    </IonButton>
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}

        {/* Confirmación para eliminar */}
        <IonAlert
          isOpen={!!imagenAEliminar}
          header="¿Eliminar imagen?"
          message="¿Estás seguro de que deseas eliminar esta imagen?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setImagenAEliminar(null),
            },
            {
              text: 'Eliminar',
              handler: () => imagenAEliminar && eliminarImagen(imagenAEliminar),
            },
          ]}
          onDidDismiss={() => setImagenAEliminar(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Gallery;
