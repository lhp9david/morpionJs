const info = document.querySelector('.info');
const cellules = document.querySelectorAll('.cell');
const restart = document.querySelector('.rejouer');

let verouillage = true;
let joueurEnCours = 'X';

info.innerHTML = `Au tour de ${joueurEnCours}`;

const alignementsGagnants = [

    [0, 1, 2], // ligne 1
    [3, 4, 5], // ligne 2
    [6, 7, 8], // ligne 3
    [0, 3, 6], // colonne 1
    [1, 4, 7], // colonne 2
    [2, 5, 8], // colonne 3
    [0, 4, 8], // diagonale 1
    [2, 4, 6]  // diagonale 2
]

let partieEnCours = ['','','','','','','','',''];

cellules.forEach(cell => {
    cell.addEventListener('click', gestionClicCase);
});

function gestionClicCase(e) {
    const caseClique = e.target;
    const caseIndex = caseClique.getAttribute('data-index');

    if (partieEnCours[caseIndex] !== '' || !verouillage) return;

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    validationResultat();
    
}

function validationResultat() {
    let finDePartie = false;
    for(let i = 0; i < alignementsGagnants.length; i++) {
        const ligne = alignementsGagnants[i];
        let a = partieEnCours[ligne[0]];
        let b = partieEnCours[ligne[1]];
        let c = partieEnCours[ligne[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            finDePartie = true;
            break;
        }
    }
    if (finDePartie) {
        info.innerHTML = `Le joueur ${joueurEnCours} a gagné !`;
        verouillage = false;
        restart.style.display = 'block';
        return;
    }

    let matchNul = !partieEnCours.includes('');
    if (matchNul) {
        info.innerHTML = `Match nul !`;
        verouillage = false;
        restart.style.display = 'block';
        return;
    }
    changementJoueur();
}


function changementJoueur() {
    joueurEnCours = joueurEnCours === 'X' ? 'O' : 'X';
    info.innerHTML = `Au tour de ${joueurEnCours}`;
}

restart.addEventListener('click', rejouer);

function rejouer() {
    verouillage = true;
    joueurEnCours = 'X';
    info.innerHTML = `Au tour de ${joueurEnCours}`;
    partieEnCours = ['','','','','','','','',''];
    cellules.forEach(cell => {
        cell.innerHTML = '';
        restart.style.display = 'none';
    });
}