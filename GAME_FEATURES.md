# Data Center Mayor - Complete Game Features

## Overview
The Data Center Mayor game is an interactive city management simulation designed for middle schoolers to learn about the real-world impacts of AI data centers on communities. Players take on the role of a city mayor making decisions about how to manage the challenges and opportunities created by a new data center.

## Game Improvements (Latest Version)

### ✅ Full City Map
- **Canvas Size**: 1000x700 pixels for detailed city visualization
- **Road Grid**: Comprehensive road system with lane markings
  - Vertical roads at 100px intervals
  - Horizontal roads at 100px intervals
  - Road markings with dashed centerlines
- **Building Density**: 20+ individual buildings spread throughout the city
  - Mix of residential, commercial, civic, industrial, and utility buildings
  - Realistic spacing and variety

### ✅ Realistic Building Graphics
Each building includes:
- **Main Structure**: Color-coded by type (data center, residential, school, etc.)
- **Windows**: Grid of detailed windows with borders
  - Window color changes based on happiness (gold when happy, dark when sad)
  - Proper window spacing and sizing
- **Door**: Brown door at the base of each building
- **Labels**: 
  - Large emoji icon representing building type (📡, 🏠, 🏫, 💧, ⚡, 🏛️, 🏬, 🏢, 🏥)
  - Text name below building for identification
- **Styling**: 
  - Black outlines for definition
  - Shadows for depth perception
  - Hover effects with golden border highlight

### ✅ Diverse Building Types

#### Residential Areas (12 buildings)
- House A, B, C - Small residential homes
- Apartments - Multi-family residential
- Townhouses - Medium density housing
- Neighborhood, Housing Complex, Dorms - Various housing types
- Suburban developments throughout map

#### Civic & Community Buildings
- **Elementary School**: Education facility
- **High School**: Larger educational institution
- **Hospital**: Medical services (🏥)
- **Town Hall**: Government center (🏛️)
- Shopping Center & Office Park: Commercial hubs

#### Industrial & Utility
- **Data Center**: The main polluting facility (📡) - Red with warning color
- **Water Treatment Plant**: Essential utility (💧) - Teal color
- **Power Station**: Energy infrastructure (⚡) - Yellow color

### ✅ Animated People System
- **Population**: 30 animated citizens moving around the city
- **Behavior**:
  - Random pathfinding and movement
  - Collision detection with buildings (bounces off obstacles)
  - Variable speed for realistic diversity
  - Emotion display above each person
- **Emotional Feedback**:
  - Shows happiness level through emojis (😊 happy, 😐 neutral, 😞 sad)
  - Updates in real-time based on player decisions
  - Visible representation of city sentiment

### ✅ Fixed Click Detection
- **Coordinate Calculation**: Accurate canvas coordinate translation
  - Proper `getBoundingClientRect()` offset calculation
  - Handles canvas positioning and scaling
- **Hit Detection**: Precise rectangular bounding box checking
  - Each building has exact x, y, width, height bounds
  - Works reliably for all 20+ buildings
- **Console Logging**: Debug information for transparency
  - Logs click coordinates
  - Shows which buildings were checked
  - Confirms successful hits
- **Hover Effects**: Visual feedback
  - Golden border highlights when mouse hovers over building
  - Cursor changes to pointer on hovering

### ✅ Interactive Decision System
When a player clicks a building, they see 3 options specific to that building type:

#### Data Center Decisions
1. **Allow Expansion** - Controversial but profitable
2. **Cap Growth** - Conservative approach
3. **Relocate** - Extreme but solution-oriented

#### Residential Decisions
1. **Build Noise Barriers** - Mitigates pollution
2. **Support Community** - Build relationships
3. **Lower Taxes** - Economic relief

#### Water Treatment Decisions
1. **Build Treatment** - Full protection
2. **Use Grid** - Minimal intervention
3. **Partial System** - Balanced approach

#### Power Station Decisions
1. **Go Solar** - Clean energy
2. **Use Grid Power** - Conventional approach
3. **Hybrid Energy** - Compromise solution

#### Community/Business Decisions
1. **Create Jobs** - Economic benefit
2. **Tax Data Center** - Revenue generation
3. **Build Programs** - Social investment

### ✅ Dynamic Stats System

**Four Key Metrics** (0-100%):
1. **😊 Happiness**: Citizen satisfaction (starts at 75%)
2. **💰 Budget**: City finances in thousands (starts at $500K)
3. **🌍 Environment**: Air/water quality (starts at 60%)
4. **🔋 Resources**: Resource efficiency (starts at 40%)

**Decision Impacts**:
- Each choice affects all four stats
- Positive and negative tradeoffs create meaningful gameplay
- Real-time sidebar updates show cumulative effects
- Visual bar indicators with color gradients

### ✅ Environmental Effects
- **Pollution Overlay**: Semi-transparent gray overlay appears when environment < 50%
  - Intensity increases as environment quality decreases
  - Visual representation of city pollution level
- **Window Lighting**: Reflects citizen happiness
  - Gold windows when population is happy (happiness > 60%)
  - Dark windows when citizens are unhappy
- **Particle Effects**: Decision feedback
  - Green particles for positive decisions
  - Red particles for negative decisions
  - 20 particles burst from selected building

### ✅ Game Progression
- **5 Turns**: Limited decision count creates strategy
- **Turn Counter**: "Turn 1 of 5" display updated each turn
- **Game Over Condition**: Automatic end after 5 decisions
- **Multiple Outcomes** (based on average of happiness + environment + resources):
  - 🎉 "Excellent Mayor!" (avg > 70) - Perfect balance
  - 😊 "Good Management!" (40-70) - Solid performance
  - 😐 "Mixed Results" (< 40) - Barely survived
  - 😡 "Citizens Revolted!" (< 30 happiness or negative budget) - Failed

### ✅ Visual Polish
- **Dark Theme**: Professional dark blue background (#1a1a2a)
- **Animated Transitions**:
  - Fade-in animations for page elements
  - Slide-up animations for decision cards
  - Bounce animation for game-over icon
  - Smooth state transitions
- **Responsive Design**:
  - Desktop: Full side-by-side layout
  - Tablet: Stacked layout
  - Mobile: Optimized for small screens
- **Hover Effects**:
  - Building highlight with golden border
  - Glowing shadow effect
  - Decision cards lift on hover

### ✅ User Experience Features
- **Instructions**: Clear on-screen text ("👆 Click on buildings to make decisions")
- **Selected Building Highlight**: Golden border and glow effect
- **Decision Card Layout**: Icons, titles, and impact summaries
- **Impact Display**: Visual emoji+value for happiness, budget, environment, resources
- **Responsive Buttons**: Play Again and Back to Courses
- **Full Screen Instructions**: Game Over modal with result summary

## Technical Implementation

### Architecture
```
CitySimGame Class
├── Constructor & Initialization
│   ├── setupCanvasSize()
│   ├── setupClickHandlers()
│   ├── setupMouseTracking()
│   └── initializeCity()
│
├── City Generation
│   ├── initializeCity() - Creates all buildings
│   ├── createPeople() - Spawns citizens
│   └── Building data array with 20+ entries
│
├── Interaction System
│   ├── setupClickHandlers() - Click detection
│   ├── selectBuilding() - Building selection
│   ├── showDecisions() - Display decision options
│   ├── makeDecision() - Process player choice
│   ├── getDecisionsForCategory() - Building-specific options
│   └── setupMouseTracking() - Hover detection
│
├── Rendering Pipeline
│   ├── animate() - Main game loop (60 FPS)
│   ├── drawRoads() - Road grid system
│   ├── drawBuildings() - Render all buildings
│   ├── drawBuilding() - Individual building rendering
│   ├── drawBuildingHighlight() - Selection effect
│   ├── drawPeople() - Citizen sprites
│   ├── drawParticles() - Effect particles
│   ├── isMouseOverBuilding() - Hover detection
│   └── updatePeople() - Movement & collision
│
├── Game State Management
│   ├── updateSidebar() - Stat display updates
│   ├── endGame() - Game conclusion
│   ├── showGameOver() - Result modal
│   └── Particle system (updateParticles)
│
└── Event Handling
    ├── Click events (selectBuilding)
    ├── Restart events (Play Again button)
    └── Mouse tracking (hover effects)
```

### Click Detection Algorithm
```javascript
1. Get canvas bounding rectangle (getBoundingClientRect)
2. Calculate click coordinates relative to canvas
   - offsetX = e.clientX - rect.left
   - offsetY = e.clientY - rect.top
3. Loop through all buildings
4. For each building, check if:
   - clickX >= building.x AND clickX <= building.x + building.width
   - clickY >= building.y AND clickY <= building.y + building.height
5. If match found, select building and show decisions
6. Otherwise, log "Miss" to console
```

### Performance Optimizations
- Single canvas for all rendering (efficient GPU usage)
- RequestAnimationFrame for smooth 60 FPS animation
- Particle pooling with lifecycle management
- Efficient collision detection (no grid needed)
- Minimal DOM updates (only stats panel changes)

## Educational Value

### Learning Outcomes
Students learn about:
1. **Economic Tradeoffs**: Data centers create jobs but have costs
2. **Environmental Impact**: Power consumption, water usage, emissions
3. **Community Relations**: Balancing local concerns with regional benefits
4. **Civic Leadership**: Making difficult decisions with competing interests
5. **Systems Thinking**: Understanding interconnected city systems
6. **Resource Management**: Managing multiple competing priorities

### Real-World Connections
- Based on actual data center impacts (Google, Apple, Meta, etc.)
- Reflects real community concerns: noise, water, power, jobs
- Shows that most decisions have tradeoffs
- Demonstrates that there's rarely a "perfect" solution

## Controls
- **Mouse Click**: Select a building to view decision options
- **Click Decision Card**: Confirm your choice for that building
- **Click "Play Again"**: Restart the game
- **Hover**: Golden border shows clickable buildings

## Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (12+)
- Mobile browsers: ✅ Touch events supported

## Future Enhancement Ideas
- Multiple difficulty levels
- Persistent leaderboard
- Community challenges ("Can you balance growth and environment?")
- Advanced building customization
- Multi-player scenarios
- Historical data center impacts
- Regional variations (desert, urban, coastal settings)
