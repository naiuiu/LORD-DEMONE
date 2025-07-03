const MODALITA = ['FACILE', 'NORMALE', 'TOSTO', 'BRUTALE', 'INCUBO', 'ULTRA INCUBO'];

function caricaDati() {
  let dati = localStorage.getItem('trackerLordDemone');
  if (dati) return JSON.parse(dati);
  let struttura = {};
  for (let m of MODALITA) {
    struttura[m] = {
      schegge: { Antica: 0, Vuoto: 0, Sacra: 0 },
      tomi: { Raro: 0, Epico: 0, Leggendario: 0, Mitico: 0 }
    };
  }
  return struttura;
}

let datiTracker = caricaDati();

function salvaDati() {
  localStorage.setItem('trackerLordDemone', JSON.stringify(datiTracker));
}

function aggiornaTabella() {
  const tbody = document.getElementById('tabellaConteggi');
  tbody.innerHTML = '';
  for (let m of MODALITA) {
    let riga = `<tr>
      <td>${m}</td>
      <td>${datiTracker[m].schegge.Antica}</td>
      <td>${datiTracker[m].schegge.Vuoto}</td>
      <td>${datiTracker[m].schegge.Sacra}</td>
      <td>${datiTracker[m].tomi.Raro}</td>
      <td>${datiTracker[m].tomi.Epico}</td>
      <td>${datiTracker[m].tomi.Leggendario}</td>
      <td>${datiTracker[m].tomi.Mitico}</td>
    </tr>`;
    tbody.innerHTML += riga;
  }
}

function aggiungiSchegga() {
  const mod = document.getElementById('modalita').value;
  const tipo = document.getElementById('scheggaTipo').value;
  datiTracker[mod].schegge[tipo]++;
  salvaDati();
  aggiornaTabella();
}

function aggiungiTomo() {
  const mod = document.getElementById('modalita').value;
  const tipo = document.getElementById('tomoTipo').value;
  datiTracker[mod].tomi[tipo]++;
  salvaDati();
  aggiornaTabella();
}

function resetModalita() {
  const mod = document.getElementById('modalita').value;
  datiTracker[mod] = {
    schegge: { Antica: 0, Vuoto: 0, Sacra: 0 },
    tomi: { Raro: 0, Epico: 0, Leggendario: 0, Mitico: 0 }
  };
  salvaDati();
  aggiornaTabella();
}

document.getElementById('aggiungiScheggaBtn').addEventListener('click', aggiungiSchegga);
document.getElementById('aggiungiTomoBtn').addEventListener('click', aggiungiTomo);
document.getElementById('resetModalitaBtn').addEventListener('click', resetModalita);

aggiornaTabella();

// Registro service worker se supportato
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker registrato.', reg))
      .catch(err => console.log('Registrazione Service Worker fallita:', err));
  });
}
