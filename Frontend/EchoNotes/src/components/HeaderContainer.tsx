import React, { Component } from "react";

import "@ionic/react/css/core.css"
import { IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonContent, IonRouterLink } from "@ionic/react";

interface HeaderProps { }

const HeaderContainer: React.FC<HeaderProps> = ( ) => {
    return (
        <>
        <IonHeader>
        <IonToolbar>
        <IonRouterLink routerLink="/">
            <IonTitle>Echo Notes</IonTitle>
        </IonRouterLink>
        <IonList slot="end">
            <IonItem >Login / Sign Up</IonItem>
        </IonList>
        </IonToolbar>
        </IonHeader>
        <p>Welcome to Echo Notes. Press buttons and hope for the best!</p>
        </>
        
    )
}

export default HeaderContainer;