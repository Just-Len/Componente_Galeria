import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import Login from "./pages/security/login";

import { useAuth } from "./contexts/authContext";
import { MenuLoggedIn } from "./components/Menu/private";
import { MenuLoggedOut } from "./components/Menu/public";
import Home from "./pages/Home";

import Notificaciones from "./pages/Notificaciones";
import Perfil from "./pages/Perfil";
import PrivateRoute from "./routers/PrivateRoute";
import Unauthorized from "./pages/Unauthorized";
import LocationTracker from "./pages/LocationTracker";
import Mapa from "./pages/Mapa";
import CapturaFotoPage from "./components/capturarFotos/CapturaFoto";
import Gallery from "./components/gallery/Gallery";

setupIonicReact();

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path='/home'>
              <Home />
            </Route>

            <PrivateRoute exact path='/perfil' allowedRoles={["admin", "user"]} component={Perfil} />

            <PrivateRoute exact path='/notificaciones' allowedRoles={["admin"]} component={Notificaciones} />
            <PrivateRoute exact path='/capturafotopage' allowedRoles={["admin", "user" ]} component={CapturaFotoPage} />
            <PrivateRoute exact path='/galeria' allowedRoles={["admin", "user"]} component={Gallery}/>

            <Route exact path='/location'>
              <LocationTracker />
            </Route>
            
            <Route exact path='/mapa'>
              <Mapa />
            </Route>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/unauthorized'>
              <Unauthorized />
            </Route>
          </IonRouterOutlet>
          {user ? <MenuLoggedIn /> : <MenuLoggedOut />}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
