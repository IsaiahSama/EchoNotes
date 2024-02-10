import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useContext } from 'react';
import { TranscriptContext, TranscriptProvider } from './TranscriptContext';
import AudioContainer from './components/AudioContainer';
import TranscriptContainer from './components/TranscriptContainer';
import HeaderContainer from './components/HeaderContainer';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <HeaderContainer />
      <IonRouterOutlet>
        <TranscriptProvider>
          <Route exact path="/home" component={AudioContainer} />
          <Route exact path="/home/transcribed" component={TranscriptContainer}/>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </TranscriptProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
