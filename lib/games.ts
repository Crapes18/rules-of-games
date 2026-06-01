export interface Game {
  slug: string
  name: string
  category: string
  players: string
  duration: string
  description: string
  quickRef: string[]
  rules: { title: string; body: string }[]
  tools: string[]
}

export const games: Game[] = [
  {
    slug: 'texas-holdem',
    name: 'Texas Hold\'em',
    category: 'Card',
    players: '2–10',
    duration: '30–90 min',
    description: 'The most popular poker variant. Make the best 5-card hand using two hole cards and five community cards.',
    quickRef: [
      'Each player gets 2 private hole cards',
      'Five community cards are dealt (flop, turn, river)',
      'Best 5-card hand wins the pot',
      'Betting rounds after each deal phase',
      'Royal Flush beats everything; High Card loses to everything',
    ],
    rules: [
      { title: 'Setup', body: 'Dealer button rotates each hand. Small blind posts half the minimum bet; big blind posts the full minimum bet.' },
      { title: 'Pre-Flop', body: 'Each player receives 2 hole cards face-down. Betting starts left of the big blind. Players can call, raise, or fold.' },
      { title: 'The Flop', body: 'Three community cards are dealt face-up. Another betting round begins with the first active player left of the dealer.' },
      { title: 'The Turn', body: 'A fourth community card is dealt. Another betting round occurs.' },
      { title: 'The River', body: 'The fifth and final community card is dealt. Final betting round.' },
      { title: 'Showdown', body: 'Remaining players reveal their cards. The best 5-card hand using any combination of hole cards and community cards wins.' },
      { title: 'Hand Rankings', body: 'Royal Flush > Straight Flush > Four of a Kind > Full House > Flush > Straight > Three of a Kind > Two Pair > One Pair > High Card.' },
    ],
    tools: ['timer'],
  },
  {
    slug: 'spades',
    name: 'Spades',
    category: 'Card',
    players: '4 (2 teams)',
    duration: '45–60 min',
    description: 'A trick-taking card game played in partnerships. Spades are always trump.',
    quickRef: [
      'Played with standard 52-card deck, 4 players in 2 partnerships',
      'Spades are always the trump suit',
      'Each player bids the number of tricks they expect to win',
      'Team score = 10 × bid if successful, −10 × bid if failed',
      'Extra tricks (bags) score 1 point each; 10 bags = −100 points',
    ],
    rules: [
      { title: 'Dealing', body: 'All 52 cards are dealt evenly — 13 cards per player. Players sit across from their partner.' },
      { title: 'Bidding', body: 'Starting left of the dealer, each player bids the number of tricks they will win. Bids of Nil (0) are allowed — if made, score 100 bonus points; if failed, lose 100.' },
      { title: 'Play', body: 'Player left of dealer leads first. Players must follow suit if able. If unable, they may play any card including spades. Highest card of the led suit wins, unless a spade is played — then highest spade wins.' },
      { title: 'Scoring', body: 'If a team makes their combined bid: 10 × bid + 1 per overtrick (bag). If they fall short: −10 × bid. First team to 500 wins.' },
      { title: 'Bags', body: 'Each overtrick counts as a bag. When a team accumulates 10 bags, they lose 100 points and their bag count resets.' },
    ],
    tools: ['spades-scorekeeper', 'timer'],
  },
  {
    slug: 'hearts',
    name: 'Hearts',
    category: 'Card',
    players: '4',
    duration: '30–60 min',
    description: 'Avoid taking heart cards and the Queen of Spades. Or take them all for a "Shoot the Moon."',
    quickRef: [
      '4 players, standard 52-card deck',
      'Avoid taking hearts (1 pt each) and Q♠ (13 pts)',
      'Shoot the Moon: take ALL hearts + Q♠ for 0 pts (others get 26)',
      'Must follow suit; can\'t lead hearts until "broken"',
      'Game ends when a player reaches 100 pts — lowest score wins',
    ],
    rules: [
      { title: 'Dealing', body: '52 cards dealt evenly, 13 each. Each player passes 3 cards to the left (alternating: left, right, across, no pass).' },
      { title: 'Play', body: '2♣ leads the first trick. Players must follow suit if able. Highest card of the led suit wins the trick. Hearts cannot be led until the suit has been "broken" (played on another trick).' },
      { title: 'Scoring', body: 'Each heart = 1 point. Q♠ = 13 points. Shooting the Moon: one player takes all 26 penalty cards — all others receive 26 points instead.' },
      { title: 'Winning', body: 'Play continues until someone reaches 100 points. The player with the lowest score wins.' },
    ],
    tools: ['timer'],
  },
  {
    slug: 'blackjack',
    name: 'Blackjack',
    category: 'Card',
    players: '1–7 vs dealer',
    duration: '5–30 min',
    description: 'Beat the dealer by getting closer to 21 without going over.',
    quickRef: [
      'Number cards = face value; face cards = 10; Ace = 1 or 11',
      'Dealer must hit on 16 or less, stand on 17 or more',
      'Blackjack (Ace + 10-value) pays 3:2',
      'Bust (over 21) = automatic loss',
      'Split pairs, double down on first two cards',
    ],
    rules: [
      { title: 'Objective', body: 'Get a hand value closer to 21 than the dealer without exceeding 21.' },
      { title: 'Card Values', body: 'Number cards equal their face value. Jack, Queen, King = 10. Ace = 1 or 11, whichever benefits the hand.' },
      { title: 'Play', body: 'Each player and the dealer receive 2 cards (one dealer card is face down). Players choose: Hit (take a card), Stand (keep hand), Double Down (double bet, take one card), or Split (if pair).' },
      { title: 'Dealer Rules', body: 'Dealer reveals hole card. Must hit on 16 or less, stand on 17 or more. If dealer busts, all remaining players win.' },
      { title: 'Payouts', body: 'Win = 1:1. Blackjack = 3:2. Insurance = 2:1.' },
    ],
    tools: ['timer'],
  },
  {
    slug: 'uno',
    name: 'Uno',
    category: 'Card',
    players: '2–10',
    duration: '15–30 min',
    description: 'Match cards by color or number and be the first to empty your hand.',
    quickRef: [
      'Match the top card by color OR number/symbol',
      'Say "Uno!" when you have 1 card left or draw 2',
      'Wild: change the color. Wild Draw Four: change color + next player draws 4',
      'Draw Two: next player draws 2 and loses turn',
      'Skip and Reverse work as named',
    ],
    rules: [
      { title: 'Setup', body: 'Deal 7 cards to each player. Flip top card of draw pile to start discard pile. If a Wild Draw Four is flipped, reshuffle.' },
      { title: 'Play', body: 'Match the top discard by color, number, or symbol. If unable, draw one card — play it if possible, otherwise pass.' },
      { title: 'Special Cards', body: 'Skip: next player loses turn. Reverse: direction flips. Draw Two: next player draws 2 and loses turn. Wild: choose new color. Wild Draw Four: choose color + next player draws 4.' },
      { title: 'Uno', body: 'Yell "Uno!" when playing your second-to-last card. If caught not saying it before the next player plays, draw 2 cards.' },
      { title: 'Winning', body: 'First player to empty their hand wins the round. Score the remaining cards in other players\' hands: numbers = face value, special cards = 20, Wilds = 50.' },
    ],
    tools: [],
  },
  {
    slug: 'yahtzee',
    name: 'Yahtzee',
    category: 'Dice',
    players: '1–4',
    duration: '30–45 min',
    description: 'Roll five dice up to three times per turn to score combinations on your scorecard.',
    quickRef: [
      '5 dice, up to 3 rolls per turn',
      'Keep any dice between rolls',
      'Score each category once per game',
      'Yahtzee (five of a kind) = 50 pts; bonus Yahtzees = 100 pts each',
      'Highest total score wins',
    ],
    rules: [
      { title: 'Turn Structure', body: 'Roll all 5 dice. Keep any dice you want, reroll the rest (up to 2 more times). After up to 3 rolls, score in one category.' },
      { title: 'Upper Section', body: 'Ones through Sixes: sum of that number. Bonus: score ≥63 in upper section to get +35 bonus.' },
      { title: 'Lower Section', body: '3 of a Kind / 4 of a Kind: sum of all dice. Full House: 25 pts. Small Straight (4 in a row): 30 pts. Large Straight (5 in a row): 40 pts. Yahtzee: 50 pts. Chance: sum of all dice.' },
      { title: 'Yahtzee Bonus', body: 'Extra Yahtzees score 100 pts each. The extra Yahtzee can be used as a Joker in the lower section.' },
    ],
    tools: ['dice', 'timer'],
  },
  {
    slug: 'cribbage',
    name: 'Cribbage',
    category: 'Card',
    players: '2',
    duration: '30–45 min',
    description: 'Score points by forming card combinations during play and in your hand. First to 121 wins.',
    quickRef: [
      '2 players, standard 52-card deck, cribbage board',
      'Each player gets 6 cards, discards 2 to the "crib"',
      'Play: lay cards alternating; score pairs, 15s, runs as you go',
      'Counting: score your hand + starter card for 15s, pairs, runs, flush',
      'First to peg 121 points wins',
    ],
    rules: [
      { title: 'Deal & Crib', body: 'Deal 6 cards each. Both players discard 2 to the crib (belongs to dealer). Cut deck for starter card. If starter is Jack, dealer scores 2 (his heels).' },
      { title: 'The Play', body: 'Non-dealer leads a card face-up, stating its value. Alternate playing cards, keeping a running count. Score: 15 = 2 pts, pair = 2 pts, pair royal = 6, double pair royal = 12, run of 3+ = 1 per card. If count hits exactly 31 = 2 pts; last card = 1 pt ("go").' },
      { title: 'Counting Hands', body: 'Non-dealer counts first, then dealer, then dealer\'s crib. Count using hand + starter card. 15s = 2 pts each combo. Pairs = 2 pts. Runs = 1 pt per card. Flush (4+ same suit) = pts per card. Nobs (Jack matching starter suit) = 1 pt.' },
      { title: 'Winning', body: 'First player to reach 121 wins. You can win mid-hand during the play phase ("pegging out").' },
    ],
    tools: ['cribbage-scorekeeper', 'timer'],
  },
  {
    slug: 'chess',
    name: 'Chess',
    category: 'Strategy',
    players: '2',
    duration: '10–180 min',
    description: 'A two-player strategy game. Capture your opponent\'s king to win.',
    quickRef: [
      'White moves first. Take turns moving one piece.',
      'King: one square any direction',
      'Queen: any number of squares in any direction',
      'Rook: any number of squares horizontally or vertically',
      'Bishop: any number of squares diagonally',
      'Knight: L-shape (2+1 squares). Only piece that jumps.',
      'Pawn: forward one square (or two on first move); captures diagonally',
    ],
    rules: [
      { title: 'Objective', body: 'Put the opponent\'s king in checkmate — attacked with no way to escape.' },
      { title: 'Check', body: 'When the king is under attack, the player must get out of check: move the king, block the attack, or capture the attacker.' },
      { title: 'Special Moves', body: 'Castling: king moves 2 squares toward rook, rook jumps to other side (neither can have moved, no pieces between, king not in check). En passant: pawn captures a pawn that just moved 2 squares past it. Promotion: pawn reaching the last rank promotes to any piece (usually queen).' },
      { title: 'Draw Conditions', body: 'Stalemate (no legal moves, not in check), threefold repetition, 50 moves with no capture or pawn move, insufficient material, or agreement.' },
    ],
    tools: ['timer'],
  },
  {
    slug: 'monopoly',
    name: 'Monopoly',
    category: 'Board',
    players: '2–8',
    duration: '60–180 min',
    description: 'Buy properties, build houses and hotels, and bankrupt your opponents.',
    quickRef: [
      'Roll 2 dice and move your token around the board',
      'Buy unowned properties you land on, or they go to auction',
      'Collect $200 each time you pass Go',
      'Build houses (4 max) then hotels on color-group monopolies',
      'Go bankrupt = out of game. Last player standing wins.',
    ],
    rules: [
      { title: 'Setup', body: 'Each player starts with $1,500. Place tokens on Go. Shuffle Community Chest and Chance cards.' },
      { title: 'Buying Property', body: 'Land on an unowned property — buy it at the listed price or auction it to all players starting at $1.' },
      { title: 'Rent', body: 'Landing on owned property means paying rent listed on the deed. Own all properties in a color group (monopoly) and rent doubles. Add houses/hotels to increase rent dramatically.' },
      { title: 'Building', body: 'Must own all properties in a color group. Build evenly (can\'t have 2 houses on one property while another in group has 0). 4 houses max per property before a hotel.' },
      { title: 'Jail', body: 'Go to Jail if you land on "Go to Jail," draw the card, or roll doubles 3 times in a row. Pay $50, use a Get Out of Jail Free card, or roll doubles to leave.' },
      { title: 'Bankruptcy', body: 'Unable to pay a debt — sell houses, mortgage properties, then turn over remaining assets to creditor. Player is eliminated.' },
    ],
    tools: ['dice', 'timer'],
  },
  {
    slug: 'catan',
    name: 'Catan',
    category: 'Board',
    players: '3–4',
    duration: '60–120 min',
    description: 'Settle the island of Catan by collecting resources, building settlements, and trading with other players.',
    quickRef: [
      'Collect resources on your number\'s dice roll',
      'Build: Road (Brick+Wood), Settlement (Brick+Wood+Wheat+Sheep), City (3 Ore+2 Wheat)',
      'Trade 4:1 with bank, better with ports, or negotiate with players',
      'Robber activates on a 7 — place it on any tile, steal from adjacent player',
      'First to 10 victory points wins',
    ],
    rules: [
      { title: 'Setup', body: 'Arrange hexagonal tiles randomly. Assign number tokens. Each player places 2 settlements and 2 roads. Collect resources adjacent to your second settlement.' },
      { title: 'Turn Structure', body: '1. Roll dice — all players on that number collect resources. 2. Trade (with bank or players). 3. Build (roads, settlements, cities, development cards).' },
      { title: 'Victory Points', body: 'Settlement = 1 VP. City = 2 VP. Longest Road (5+ roads) = 2 VP. Largest Army (3+ knights) = 2 VP. Some development cards = 1 VP.' },
      { title: 'Robber', body: 'On a 7, players with 8+ cards discard half. Active player moves robber to any tile — that tile produces no resources and the player steals 1 random resource from an adjacent settlement owner.' },
      { title: 'Trading', body: 'Maritime trade: 4 of 1 resource for 1 of any. Ports allow 3:1 or 2:1 for specific resources. Player trading: any negotiated deal is valid.' },
    ],
    tools: ['dice', 'timer'],
  },
]

export function getGame(slug: string): Game | undefined {
  return games.find(g => g.slug === slug)
}

export const categories = [...new Set(games.map(g => g.category))]
