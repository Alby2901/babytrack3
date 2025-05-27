# BabyTrack

BabyTrack è un'applicazione mobile sviluppata con React Native ed Expo che consente agli utenti di effettuare alcuni controlli su dei codici QR. Viene utilizzata in Neonatologia collegata ad una API esposta dal backend. BabyTrack prevede una autenticazione dell'utente attraverso la API. Sucessivamente il sistema permette di scansionare il QR Code presente sul bracciale del neonato e quello presenete sul bracciale del genitore o sul cartellino culla. Il sistema passa i dati all'API che effettua il controllo dei codici e restituisce un risultato: corretto se i due codici sono coerenti, errato se non lo sono. Sono coerenti se il neonato corrisponde al genitore o al cartellino sulla culla. Con il risultato corretto la API restituisce anche il nome dem bambino e il nome del genitore.
L'applicazione ha una area "impostazioni" dove si accede tramite password (cablata nel codice) dove possono essere impostati diversi parametri tra cui l'URL della API, l'ID del dispositivo, ecc.

## Funzionalità principali

- **Autenticazione utente**: Gli utenti devono effettuare il login per accedere all'app.
- **Input dei dati**: Gli utenti possono inserire manualmente informazioni relative al bambino, come crescita, alimentazione e altro.
- **Scansione**: L'app permette agli utenti di effettuare scansioni per raccogliere dati tramite dispositivi esterni o QR code.
- **Visualizzazione dei risultati**: I dati inseriti sono presentati in modo chiaro e organizzato per una facile lettura.
- **Navigazione**: L'app offre una navigazione fluida tra le varie schermate utilizzando React Navigation.
- **Impostazioni**: Possibilità di configurare e gestire il profilo utente e le preferenze.

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/Alby2901/babytrack3.git
   
2. Vai nella cartella del progetto:
    cd babytrack3

3. Installa le dipendenze:
4. Avvia il progetto

## Tecnologie utilizzate
- React Native
- React Navigation
- Expo
- Context API (per la gestione dello stato e dell'autenticazione)
- Axios (per le chiamate API, se previste)

## Contribuire
Se desideri contribuire a questo progetto, sentiti libero di aprire una pull request. Segui le convenzioni del progetto e assicurati che il codice sia ben testato prima di inviarlo.

## Licenza
Distribuito sotto la Licenza MIT. Vedi LICENSE per ulteriori informazioni.
