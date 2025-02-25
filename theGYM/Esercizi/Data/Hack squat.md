---
nome_esercizio: Hack squat
tags:
  - gambe
  - quadricip
  - glutes
  - forza
  - compound
---
Macchina:: [[Hack squat machine|Hack squat machine]]

# # Descrizione

L'hack squat è un esercizio per la parte inferiore del corpo eseguito su una macchina specifica inclinata a 45 gradi. A differenza dello squat tradizionale, questa variante sposta il carico dalle vertebre lombari, permettendo di concentrare maggiormente il lavoro su quadricipiti e glutei. La posizione inclinata all'indietro e le spalle appoggiate al supporto imbottito permettono di mantenere una postura stabile durante l'esecuzione, riducendo il rischio di infortuni alla schiena.

# Tecnica di Esecuzione

1. **Posizione iniziale**:
    - Posizionati sulla macchina con le spalle ben appoggiate contro il cuscinetto imbottito
    - Piedi a larghezza spalle o leggermente più larghi posizionati sulla pedana (la posizione dei piedi influenza i muscoli coinvolti)
    - Impugna le maniglie laterali per stabilità
    - Sblocca i fermi di sicurezza prima di iniziare
2. **Fase eccentrica (discesa)**:
    - Inspira e piega lentamente le ginocchia
    - Mantieni la schiena ben appoggiata al supporto
    - Scendi fino a quando le cosce sono parallele o leggermente sotto il parallelo rispetto alla pedana
    - Evita di rimbalzare nella posizione bassa
3. **Fase concentrica (risalita)**:
    - Espira mentre spingi attraverso i talloni e la parte centrale del piede
    - Estendi le ginocchia e i fianchi per tornare alla posizione di partenza
    - Mantieni le ginocchia leggermente flesse nel punto più alto per evitare blocchi articolari
4. **Varianti di posizionamento dei piedi**:
    - Piedi più avanti: maggiore attivazione dei glutei e dei bicipiti femorali
    - Piedi più indietro: maggiore attivazione dei quadricipiti
    - Piedi larghi: maggiore coinvolgimento degli adduttori e parte interna delle cosce
    - Piedi stretti: maggiore attivazione del vasto laterale (parte esterna del quadricipite)

# Note di Sicurezza

- Mantieni sempre la schiena ben appoggiata al supporto durante tutto il movimento
- Non bloccare mai completamente le ginocchia nella fase di estensione
- Assicurati che i fermi di sicurezza siano correttamente posizionati prima di iniziare
- Inizia con pesi leggeri per padroneggiare la tecnica prima di aumentare il carico
- Evita questo esercizio se hai problemi alle ginocchia o alla schiena senza prima consultare un professionista
- Non eseguire questo movimento con una profondità eccessiva se hai problemi di mobilità alle anche o alle caviglie
- Assicurati che la macchina sia regolata correttamente per la tua altezza e conformazione fisica

# Log Esercizio
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
