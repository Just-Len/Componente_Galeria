import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.len.len',
  appName: 'unaapp',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    cleartext: true, 
    androidScheme: 'http', 
    
  },
  plugins: {
    Camera: {
      permissions: ["camera", "photos"]
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: [
        "google.com"
      ]
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    GoogleMaps: {
        apiKey: "AIzaSyALiSvM4DZTlQXtNi6HL5fxMPppkDXlnMs",
      },
  }
};

export default config;
 