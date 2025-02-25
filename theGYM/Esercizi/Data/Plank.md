---
nome_esercizio: Plank
tags:
---
# Descrizione

Il Plank è un esercizio isometrico fondamentale per il rafforzamento del core e della stabilità generale del corpo. Consiste nel mantenere una posizione simile a quella di una flessione (push-up), ma con gli avambracci appoggiati a terra anziché le mani. Questo esercizio coinvolge principalmente i muscoli addominali (retto addominale, obliqui esterni e interni, trasverso dell'addome), i muscoli della schiena (erettori spinali), i glutei e gli stabilizzatori delle spalle. A differenza degli esercizi dinamici come i crunch, il plank impegna l'intera catena muscolare anteriore e posteriore in una contrazione statica, migliorando la resistenza muscolare e la stabilità posturale senza stress sulla colonna vertebrale. Per questo motivo, è considerato uno degli esercizi più efficaci e sicuri per lo sviluppo della forza del core.

# Tecnica di Esecuzione

1. **Posizione iniziale**:
    - Posizionati a faccia in giù sul tappetino
    - Appoggia gli avambracci a terra, con i gomiti direttamente sotto le spalle
    - Le braccia dovrebbero formare un angolo di 90 gradi con gli avambracci paralleli tra loro
    - Solleva il corpo da terra, sostenendoti sugli avambracci e sulle punte dei piedi
    - Mantieni le gambe distese e i piedi a larghezza fianchi
2. **Allineamento corporeo**:
    - Mantieni il corpo in una linea retta dalla testa ai talloni
    - Contrai gli addominali e i glutei per stabilizzare la posizione
    - Mantieni la schiena in posizione neutra, evitando sia l'inarcamento che la curvatura
    - Tieni il collo in linea con la colonna vertebrale, guardando leggermente avanti verso il pavimento
    - Distribuisci uniformemente il peso tra avambracci e punte dei piedi
3. **Mantenimento della posizione**:
    - Respira normalmente durante l'esecuzione, evitando di trattenere il respiro
    - Tieni la muscolatura del core costantemente attivata
    - Mantieni la posizione per il tempo prestabilito (da 20 secondi per principianti a oltre 1 minuto per avanzati)
    - Concentrati sulla qualità della posizione piuttosto che sulla durata
4. **Varianti di esecuzione**:
    - Plank sulle mani: posizione più elevata con braccia tese
    - Side plank: plank laterale che coinvolge maggiormente gli obliqui
    - Plank con elevazione di un arto: sollevare alternamente braccia o gambe per aumentare la difficoltà
    - Plank dinamico: aggiungere movimenti come toccare alternativamente le spalle con le mani opposte

# Note di Sicurezza

- Evita di far cadere il bacino verso il basso o di sollevarlo eccessivamente verso l'alto
- Non trattenere il respiro durante l'esecuzione dell'esercizio
- Evita di caricare eccessivamente il peso sulle spalle per prevenire tensioni nel collo
- Interrompi l'esercizio se avverti dolore nella zona lombare o nelle spalle
- Inizia con tempi brevi (20-30 secondi) e aumenta gradualmente la durata
- Preferisci più serie brevi con tecnica perfetta piuttosto che una singola serie lunga con tecnica scorretta
- Se hai problemi alle spalle o ai polsi, puoi eseguire il plank su un supporto rialzato come una panca
- Assicurati di avere sufficiente presa sul pavimento per evitare scivolamenti
- Se hai problemi di pressione sanguigna, consulta un medico prima di praticare esercizi isometrici prolungati
- Per principianti o persone con limitata forza del core, è possibile iniziare con una versione modificata appoggiando le ginocchia a terra

# Log delle Performance

```dataviewjs
// Utilizzo corretto per Leg Press
await dv.view("theGYM/Scripts/ExerciseLogTable", {
    input: {
        exercise: dv.current().nome_esercizio,
        limit: 50,
        searchByName: true,
        debug: true
    }
});
```
### grafico
```dataviewjs
// Definisci i parametri (opzionali)
const input = {
    // title: "Trend Volume Esercizio",
    // height: "250px",
    // showTrend: true,
    // showStats: true,
    // exercisePath: "theGYM/Esercizi/Panca Piana.md" // Solo se vuoi visualizzare un esercizio diverso
};

// Passa il container esplicitamente quando usi dv.view
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: input
});
```
