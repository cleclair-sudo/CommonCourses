# Data Center Mayor Game - Player & Developer Guide

## 🎮 How to Play

### Game Overview
You are elected as the mayor of a thriving city. A major AI Data Center has just been built in your municipality. Your job is to manage the impacts while keeping citizens happy and the city running smoothly.

### Game Mechanics
- **5 Turns**: Each turn represents a time period where you make strategic decisions
- **4 Metrics to Manage**:
  - 😊 **Happiness** (0-100%) - If it drops below 30%, you lose
  - 💰 **Budget** ($0 - $500K) - If it goes negative, you lose
  - 🌍 **Environment** (0-100%) - Balance growth with environmental protection
  - 🔋 **Resources** (0-100%) - Manage city's available capacity

### Playing the Game
1. Navigate to the "Open to AI: Risks, Benefits, Community Impact & Self Assessment" course
2. Click on Module 2: "Data Center Mayor - Interactive Game"
3. Click "Start Game" to enter the game
4. For each turn, you'll see 3 decision options with impact previews
5. Click on the decision you want to make
6. Watch your stats update and read the feedback message
7. Continue for 5 turns
8. After turn 5, see your performance rating and restart if desired

### Decision Categories

#### Turn 1: Water Management
- **Build Water Treatment Plant** ($150K)
  - High happiness boost, environmental benefit
  - Significant budget cost
- **Use City Water As-Is** (Free)
  - Budget boost, but massive environmental damage
  - Happiness drops
- **Partial Treatment System** ($75K)
  - Balanced approach with moderate impacts

#### Turn 2: Noise Control
- **Build Noise Barriers** ($200K)
  - Strong happiness boost
  - Moderate environmental benefit
- **Relocate Residents** ($300K)
  - High budget cost, negative happiness hit
- **Education Campaign** ($50K)
  - Budget-friendly, modest benefits

#### Turn 3: Energy Sources
- **Invest in Renewable Energy** ($250K)
  - Best environmental outcome
  - Significant happiness boost
- **Use Grid Power** (Free + $100K gain)
  - Cheap but heavy environmental cost
  - Happiness penalty
- **Hybrid Energy Mix** ($120K)
  - Balanced environmental and budget approach

#### Turn 4: Economic Impact
- **Create Data Center Jobs Program** ($180K)
  - Major happiness boost
  - Provides resources
- **Tax the Data Center** (Free + $500K gain)
  - Strong budget improvement
  - Modest happiness boost
- **Community Fund** (Free + $100K gain)
  - Community benefit, happiness and environmental boost

#### Turn 5: Growth Policy
- **Approve Expansion** (Free + $200K gain)
  - Budget and resource boost
  - Heavy happiness and environmental penalties
- **Cap Growth** (Neutral)
  - Preserves current state
  - Positive happiness and environmental boost
- **Relocate Data Center** ($400K)
  - High happiness boost
  - Expensive but clears the city

### Win Conditions
- **Excellent Mayor** 🎉: Average stats > 70%, happiness > 50%
- **Good Management** 😊: Average stats 40-70%, happiness > 50%
- **Mixed Results** 😐: Average stats < 40%
- **Citizens Are Upset** 😡: Happiness < 30% OR budget < $0

---

## 👨‍💻 Developer Guide

### Game Architecture

The game is built with a modular JavaScript-based system:

```
MayorGame class
├── Game State (turn, metrics, messages)
├── Decision System
│   ├── getDecisions() - Returns 3 options per turn
│   ├── makeDecision() - Processes impacts
│   └── Impact Objects { happiness, budget, environment, resources }
├── Rendering System
│   ├── render() - Updates all UI elements
│   ├── displayActivity() - Shows decisions
│   └── Animations - Smooth stat transitions
└── Game Flow
    ├── Init game state
    ├── Loop: Render → Wait for decision → Update state → Check end
    └── Show results on game end
```

### File Structure

```
Interactive-Education-on-CT/
├── plugins/using_ai_safely/
│   ├── course.py                  # Course plugin (game is module_2, get_games() adds /game/mayor)
│   └── games/mayor/
│       ├── mayor.html             # Game UI structure
│       ├── mayor.css              # Game styling
│       └── mayor.js               # Game logic & state
└── GAME_GUIDE.md                  # This file
```

### Modifying the Game

#### Change Game Duration
In `plugins/using_ai_safely/games/mayor/mayor.js`, line 11:
```javascript
this.maxTurns = 5;  // Change to desired number of turns
```

#### Adjust Decision Impacts
Each decision in `getDecisions()` returns an impacts object:
```javascript
this.addDecision(
    'Decision Title',
    '🎨',  // Icon emoji
    'Description text',
    {
        happiness: 15,      // -100 to +100
        budget: -150000,    // In dollars
        environment: 20,    // -100 to +100
        resources: -5       // -100 to +100
    }
)
```

#### Change Win/Loss Conditions
Modify the `endGame()` method:
```javascript
endGame() {
    // Currently uses average of happiness/environment/resources
    const avg = (this.happiness + this.environment + this.resources) / 3;
    
    // Adjust thresholds and messages as needed
    if (this.happiness < 30 || this.budget < 0) {
        // Loss condition
    }
}
```

#### Customize UI Colors
In `plugins/using_ai_safely/games/mayor/mayor.css`:
```css
/* Stats bar colors */
.stat-fill {
    background: linear-gradient(to right, 
        #ff6b6b 0%,     /* Red - critical */
        #ffd93d 50%,    /* Yellow - warning */
        #6bcf7f 100%    /* Green - good */
    );
}

/* Individual stat fills */
#happinessFill { background-color: #95E1D3; }
#budgetFill { background-color: #FFE66D; }
#environmentFill { background-color: #95E1D3; }
#resourcesFill { background-color: #A8D8EA; }
```

### Adding New Decision Scenarios

To add a new turn or modify turn scenarios:

1. Find `getDecisions()` method around line 95
2. Each element in the `scenarios` array is a turn
3. Add a new turn array with 3 decision objects:

```javascript
[
    this.addDecision(
        'Title',
        '🎯',
        'Description of what happens',
        { happiness: 10, budget: -50000, environment: 5, resources: 0 }
    ),
    this.addDecision(
        'Alternative Title',
        '📊',
        'Alternative description',
        { happiness: -5, budget: 100000, environment: -15, resources: 10 }
    ),
    this.addDecision(
        'Third Option',
        '⚙️',
        'Balanced choice',
        { happiness: 0, budget: -25000, environment: 0, resources: 0 }
    )
]
```

### Integration with Course System

The game is integrated as a module in the `using_ai_safely` course:

```python
# In plugins/using_ai_safely/course.py
{
    'id': 'module_2',
    'title': 'Data Center Mayor - Interactive Game',
    'activity_type': 'game',  # Special type for game activities
    'game_url': '/game/mayor',
    'description': '...'
}
```

When this module is selected in the course:
1. `course.js` detects `activity_type == 'game'`
2. Renders a "Start Game" button with the description
3. Clicking the button navigates to `/game/mayor`
4. Full-screen game experience loads

### Performance Tracking

The game currently tracks:
- Decisions made
- Final stat values
- Performance rating

Future enhancements could include:
- Saving progress to backend via `/api/progress`
- Achievement system
- Leaderboard rankings
- Difficulty levels
- Multiple scenario variations

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Game loads without errors
- [ ] All 5 turns have decisions appearing
- [ ] Stats update when decisions made
- [ ] Stats stay within valid ranges (0-100% or currency)
- [ ] Messages display correctly
- [ ] Win/loss conditions trigger appropriately
- [ ] Restart button works
- [ ] Game responsive on mobile/tablet
- [ ] CSS animations smooth at 60fps

### Automated Testing (Future)
Could add Jest tests for:
- Game state calculations
- Decision impacts applying correctly
- Win condition detection
- Message generation

---

## 🎓 Educational Outcomes

After playing, students should understand:
1. **Trade-offs in Technology**: Can't optimize everything simultaneously
2. **Externalities**: Technologies have ripple effects on communities
3. **Systems Thinking**: Multiple interdependent systems to manage
4. **Stakeholder Balance**: Balancing profit, society, and environment
5. **Real-World Complexity**: Major projects have multifaceted impacts
6. **Responsible AI**: Tech companies must consider societal impact

---

## 📝 Notes

- The game is currently deterministic (same choices = same outcomes)
- Could be enhanced with randomness/surprise events
- Currently single-player; could be cooperative multiplayer
- Save/load functionality not yet implemented
- Mobile optimizations may be needed for small screens

Enjoy playing and learning! 🎮📚
