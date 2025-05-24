import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonButton } from '@ionic/react';
import { useState } from 'react';
import './barCode.css';

const BarCode: React.FC = () => {
  const [scanResult, setScanResult] = useState<string>('');

  const startScan = async () => {
    try {
      console.log('Iniciando verificación de permisos...');
      const permission = await BarcodeScanner.checkPermission({ force: true });
      console.log('Permisos de cámara:', permission);

      if (!permission.granted) {
        alert('Permisos de cámara denegados. Por favor, habilítalos en la configuración.');
        return;
      }

      console.log('Ocultando fondo para mostrar la cámara...');
      await BarcodeScanner.hideBackground();
      document.body.classList.add('scanner-active');

      console.log('Iniciando escaneo de código de barras...');
      const result = await BarcodeScanner.startScan();
      console.log('Resultado del escaneo:', result);

      if (result.hasContent) {
        console.log('Código escaneado:', result.content);
        setScanResult(result.content);
      } else {
        console.log('No se encontró contenido en el escaneo.');
      }

      console.log('Restaurando fondo de la app...');
      await BarcodeScanner.showBackground();
      document.body.classList.remove('scanner-active');
    } catch (error) {
      console.error('Error crítico al escanear:', error);
      alert('Error al escanear: ' + (error instanceof Error ? error.message : 'Desconocido'));
      await BarcodeScanner.showBackground();
      document.body.classList.remove('scanner-active');
    }
  };

  return (
    <div className="barcode-container">
      <IonButton onClick={startScan}>Escanear Código</IonButton>
      {scanResult && <p>Resultado: {scanResult}</p>}
    </div>
  );
};

export default BarCode;