class Joueur {
  constructor(score) {
    this.score = score;
  }
}

const joueur1 = document.querySelector(".joueur-0");
const joueur2 = document.querySelector(".joueur-1");

const scoreTourJ0 = document.querySelector(".score-tour-j0");
const scoreTourJ1 = document.querySelector(".score-tour-j1");
const scoreActuelJ0 = document.querySelector(".score-actuel-j0");
const scoreActuelJ1 = document.querySelector(".score-actuel-j1");

const btnRegle = document.querySelector(".btn-regle");
const btnNouveau = document.querySelector(".btn-nouveau-jeu");
const btnLancer = document.querySelector(".btn-lancer");
const btnGarder = document.querySelector(".btn-garder");
const btnFermer = document.querySelector(".btn-close");
const imgDice = document.querySelector(".dice-image");

const overlay = document.querySelector(".overlay");
const modalExplication = document.querySelector(".modal-explication");

class Jeu {
  #joueurActif = 0;
  #scoreDuTour = 0;
  joueurs = [new Joueur(0), new Joueur(0)];

  constructor() {
    this._init();

    //events handler
    btnLancer.addEventListener("click", () => this._lancer());
    btnGarder.addEventListener("click", () => this._garderScore());
    btnRegle.addEventListener("click", () => this._ouvrirRegles());
    btnFermer.addEventListener("click", () => this._fermerRegles());
    btnNouveau.addEventListener("click", () => this._init());
    window.addEventListener("keydown", (e) => this._escapeRegles(e));
  }

  _init() {
    this.#scoreDuTour = 0;
    this.#joueurActif = 0;
    this.joueurs[0].score = 0;
    this.joueurs[1].score = 0;

    scoreTourJ0.textContent = 0;
    scoreTourJ1.textContent = 0;
    scoreActuelJ0.textContent = 0;
    scoreActuelJ1.textContent = 0;
    imgDice.style.display = "block";

    btnGarder.disabled = false;
    btnLancer.disabled = false;

    joueur1.classList.remove("gagnant");
    joueur2.classList.remove("gagnant");
    joueur1.classList.add("joueur-actif");
    joueur2.classList.remove("joueur-actif");
  }

  _changerJoueur() {
    this.#joueurActif = 1 - this.#joueurActif;

    joueur1.classList.toggle("joueur-actif");
    joueur2.classList.toggle("joueur-actif");

    document.querySelector(`.score-tour-j${this.#joueurActif}`).textContent = 0;
    this.#scoreDuTour = 0;
  }

  _desactiverBtns() {
    btnGarder.disabled = true;
    btnLancer.disabled = true;
  }

  _activerModeGagnant() {
    document
      .querySelector(`.joueur-${this.#joueurActif}`)
      .classList.remove("joueur-actif");
    document
      .querySelector(`.joueur-${this.#joueurActif}`)
      .classList.add("gagnant");

    imgDice.style.display = "none";
  }

  _lancer() {
    let num = Math.floor(Math.random() * 6 + 1);

    //update l'image du dé
    imgDice.src = `dice-${num}.png`;
    if (num === 1) {
      ///Si on lance le 1, on perd le tour
      this._changerJoueur();
    } else {
      this.#scoreDuTour += num;
      document.querySelector(`.score-tour-j${this.#joueurActif}`).textContent =
        this.#scoreDuTour;
    }
  }

  _garderScore() {
    this._getJoueurActif().score += this.#scoreDuTour;
    document.querySelector(`.score-actuel-j${this.#joueurActif}`).textContent =
      this._getJoueurActif().score;

    if (this._getJoueurActif().score >= 100) {
      this._desactiverBtns();
      this._activerModeGagnant();
    } else {
      this._changerJoueur();
    }
  }

  _getJoueurActif() {
    return this.joueurs[this.#joueurActif];
  }

  //pop-up Règles
  _ouvrirRegles() {
    overlay.style.display = "block";
    modalExplication.style.display = "block";
  }

  _fermerRegles() {
    overlay.style.display = "none";
    modalExplication.style.display = "none";
  }

  _escapeRegles(e) {
    if (e.key === "Escape") this._fermerRegles();
  }
}

new Jeu();
