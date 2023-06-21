class Game {
    constructor(container, rows, columns, totalCards) {
      this.container = container;
      this.rows = rows;
      this.columns = columns;
      this.totalCards = totalCards;
      this.cards = [];
      this.activeCards = [];
      this.players = ['Player 1', 'Player 2'];
      this.currentPlayerIndex = 0;
      this.score = {
        'Player 1': 0,
        'Player 2': 0
      };
    }
  
    init() {
      if (this.totalCards % 2 !== 0) {
        console.error('Total number of cards must be even.');
        return;
      }
  
      if (this.rows * this.columns !== this.totalCards) {
        console.error('Invalid number of rows and columns for the given total number of cards.');
        return;
      }
  
      this.generateCards();
      this.shuffleCards();
      this.render();
    }
  
  
  
  
    generateCards() {
      const totalCards = (this.rows * this.columns) / 2;
      const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Symbole na kartach
  
      for (let i = 0; i < totalCards; i++) {
        const symbol = symbols[i % symbols.length];
        const card1 = this.createCard(symbol);
        const card2 = this.createCard(symbol);
  
        this.cards.push(card1);
        this.cards.push(card2);
      }
    }
  
    createCard(symbol) {
      return {
        symbol,
        isFlipped: false,
        isMatched: false
      };
    }
  
    shuffleCards() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    render() {
      this.container.innerHTML = '';
      
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          const card = this.cards[i * this.columns + j];
          const cardElement = document.createElement('div');
          cardElement.className = 'card';
          cardElement.innerHTML = `
            <div class="card-inner">
              <div class="card-front"></div>
              <div class="card-back">${card.symbol}</div>
            </div>
          `;
  
          cardElement.addEventListener('click', () => {
            this.flipCard(card, cardElement);
          });
  
          this.container.appendChild(cardElement);
        }
      }
    }
  
   

flipCard(card, cardElement) {
    if (card.isFlipped || card.isMatched || this.activeCards.length >= 2) {
      return;
    }
  
    card.isFlipped = true;
    this.activeCards.push({ card, cardElement });
    cardElement.classList.add('flipped');
  
    if (this.activeCards.length === 2) {
      setTimeout(() => {
        this.checkMatch();
      }, 1000);
    }
  }
  
  checkMatch() {
    const [card1, card2] = this.activeCards;
  
    if (card1.card.symbol === card2.card.symbol) {
      card1.card.isMatched = true;
      card2.card.isMatched = true;
      this.score[this.players[this.currentPlayerIndex]] += 1;
      this.removeMatchedCards();
    } else {
      card1.card.isFlipped = false;
      card2.card.isFlipped = false;
      card1.cardElement.classList.remove('flipped');
      card2.cardElement.classList.remove('flipped');
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
  
    this.activeCards = [];
  }
  
  
  
  removeMatchedCards() {
    const matchedCards = this.activeCards.map(card => card.card);
  
    this.cards = this.cards.filter(card => !matchedCards.includes(card));
  
    this.activeCards.forEach(({ cardElement }) => {
      cardElement.removeEventListener('click', this.handleCardClick);
    });
  
    this.activeCards = [];
  
    if (this.isGameOver()) {
      this.showGameOver();
    }
  }
  
  
  
  isGameOver() {
    return this.cards.every(card => card.isMatched);
  }
  
  
  
    showGameOver() {
      const winner = Object.keys(this.score).reduce((a, b) => this.score[a] > this.score[b] ? a : b);
      alert(`Game Over!\n\nWinner: ${winner}\nScore: ${this.score['Player 1']} - ${this.score['Player 2']}`);
    }
  }
  
  export default Game;
  
