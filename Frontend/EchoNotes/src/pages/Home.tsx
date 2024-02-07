import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonRouterOutlet } from '@ionic/react';
import './Home.css';
import AudioContainer from '../components/AudioContainer';
import TranscriptContainer from '../components/TranscriptContainer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Echo Notes</IonTitle>
          <IonList slot="end">
            <IonItem >Login / Sign Up</IonItem>
          </IonList>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <p>Welcome to Echo Notes. Press buttons and hope for the best</p>
        <hr />
        <TranscriptContainer />
        {/* <AudioContainer /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
