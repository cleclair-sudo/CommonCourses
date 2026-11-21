// Course page - Interactive learning experience

class CourseExperience {
    constructor(courseData) {
        this.course = courseData;
        this.currentModuleIndex = -1; // Start with module selection view
        this.currentModule = null;
        this.completedModules = new Set();
        this.selectedAnswer = null;
        this.answered = false;
        this.showingModuleSelection = true;

        this.init();
    }

    async init() {
        await this.loadProgress();
        // ?module=module_3 jumps straight to that module (used by the game's Next Module button)
        const want = new URLSearchParams(location.search).get('module');
        const i = this.course.modules.findIndex(m => m.id === want);
        if (i >= 0) this.loadModule(i);
        else this.showModuleSelection();
    }

    async loadProgress() {
        try {
            const progress = await getProgress(this.course.id);
            if (progress && progress.completed_modules) {
                this.completedModules = new Set(progress.completed_modules);
            }
        } catch (error) {
            console.error('Failed to load progress:', error);
        }
    }

    showModuleSelection() {
        this.showingModuleSelection = true;
        const container = document.getElementById('modulesContainer');
        container.innerHTML = '';
        
        // Create module selection grid
        const selectionGrid = document.createElement('div');
        selectionGrid.className = 'module-selection-grid';

        this.course.modules.forEach((module, index) => {
            const card = document.createElement('div');
            card.className = 'module-card';
            if (this.completedModules.has(module.id)) card.classList.add('completed');
            
            const icon = module.icon || '📚';
            const completedBadge = this.completedModules.has(module.id) 
                ? '<div class="completed-badge">✓</div>' 
                : '';
            
            card.innerHTML = `
                <div class="module-card-header">
                    <div class="module-card-icon">${icon}</div>
                    ${completedBadge}
                </div>
                <h3 class="module-card-title">${module.title}</h3>
                <p class="module-card-description">${module.content || module.description || 'Click to begin'}</p>
                <div class="module-card-footer">
                    <span class="module-number">Module ${index + 1}</span>
                </div>
            `;

            card.addEventListener('click', () => {
                this.loadModule(index);
            });
            
            selectionGrid.appendChild(card);
        });

        const activityPanel = document.getElementById('activityPanel');
        activityPanel.style.display = 'none';
        container.appendChild(selectionGrid);
        
        this.updateProgress();
    }

    renderModules() {
        const container = document.getElementById('modulesContainer');
        const existing = container.parentElement.querySelector('.module-selection-grid');
        if (existing) existing.remove();
        
        container.innerHTML = '';

        this.course.modules.forEach((module, index) => {
            const item = document.createElement('div');
            item.className = 'module-item';
            if (index === this.currentModuleIndex) item.classList.add('active');
            if (this.completedModules.has(module.id)) item.classList.add('completed');

            item.innerHTML = `
                <span class="module-number">${index + 1}</span>
                <span class="module-name">${module.title}</span>
                <span class="module-selector" title="Back to module list">≡</span>
            `;

            const selector = item.querySelector('.module-selector');
            selector.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showModuleSelection();
            });

            item.addEventListener('click', () => this.loadModule(index));
            container.appendChild(item);
        });

        this.updateProgress();
    }

    updateProgress() {
        const total = this.course.modules.length;
        const completed = this.completedModules.size;
        const percentage = (completed / total) * 100;

        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }

    loadModule(index) {
        this.showingModuleSelection = false;
        this.currentModuleIndex = index;
        this.currentModule = this.course.modules[index];
        this.selectedAnswer = null;
        this.answered = false;

        this.renderModules();
        
        const activityPanel = document.getElementById('activityPanel');
        activityPanel.style.display = 'block';
        
        this.displayActivity();
    }

    displayActivity() {
        const module = this.currentModule;
        
        // anything with its own page (city sim, resource simulator) just gets a Start button
        if (module.game_url) {
            const container = document.getElementById('questionTitle');
            const optionsContainer = document.getElementById('optionsContainer');
            
            container.textContent = module.title;
            optionsContainer.innerHTML = '';
            
            const gameLink = document.createElement('div');
            gameLink.style.cssText = 'text-align: center; padding: 2rem;';
            gameLink.innerHTML = `
                <p>${module.description || module.content || ''}</p>
                <a href="${module.game_url}" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">${module.button_text || 'Start Game'}</a>
            `;
            optionsContainer.appendChild(gameLink);

            if (module.learning_outcomes && module.learning_outcomes.length) {
                const outcomes = document.createElement('ul');
                module.learning_outcomes.forEach((outcome) => {
                    const item = document.createElement('li');
                    item.textContent = outcome;
                    outcomes.appendChild(item);
                });
                optionsContainer.appendChild(outcomes);
            }

            if (module.sources && module.sources.length) {
                const sources = document.createElement('details');
                const summary = document.createElement('summary');
                summary.textContent = 'Research behind the simulation';
                sources.appendChild(summary);

                const sourceList = document.createElement('ul');
                module.sources.forEach((source) => {
                    const item = document.createElement('li');
                    if (source.url) {
                        const a = document.createElement('a');
                        a.href = source.url;
                        a.target = '_blank';
                        a.rel = 'noopener';
                        a.textContent = source.title;
                        item.appendChild(a);
                        item.append(`: ${source.finding}`);
                    } else {
                        item.textContent = `${source.title}: ${source.finding}`;
                    }
                    sourceList.appendChild(item);
                });
                sources.appendChild(sourceList);
                optionsContainer.appendChild(sources);
            }
            return;
        }
        
        const container = document.getElementById('questionTitle');
        const optionsContainer = document.getElementById('optionsContainer');

        if (module.activity_type === 'self_assessment' && module.questions) {
            this.answers = [];
            this.askQ(0);
            return;
        }

        // placeholder modules (nothing to answer yet)
        if (!module.options || !module.options.length) {
            container.textContent = module.title;
            optionsContainer.innerHTML = '';
            const p = document.createElement('p');
            p.style.cssText = 'text-align: center; padding: 2rem;';
            p.textContent = module.content || 'Coming soon!';
            optionsContainer.appendChild(p);
            return;
        }

        container.textContent = module.question;
        optionsContainer.innerHTML = '';

        module.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.textContent = option.text;
            btn.setAttribute('data-index', index);
            btn.disabled = this.answered;

            btn.addEventListener('click', () => this.selectAnswer(index, option));
            optionsContainer.appendChild(btn);
        });
    }

    // --- self-assessment: one question at a time, then a personal plan ---
    askQ(i) {
        const m = this.currentModule;
        const q = m.questions[i];
        const title = document.getElementById('questionTitle');
        const box = document.getElementById('optionsContainer');
        const picked = new Set(this.answers[i] || []);

        title.textContent = q.q;
        box.innerHTML = `
            <p class="sa-progress">Question ${i + 1} of ${m.questions.length}${q.multi ? ' - pick all that apply' : ''}</p>
            <div class="sa-bar"><div style="width: ${(i / m.questions.length) * 100}%"></div></div>
        `;

        q.options.forEach((o, j) => {
            const b = document.createElement('button');
            b.className = 'option sa-option';
            b.textContent = o.text;
            if (picked.has(j)) b.classList.add('selected');
            b.addEventListener('click', () => {
                if (!q.multi) {
                    this.answers[i] = [j];
                    return this.nextQ(i);
                }
                picked.has(j) ? picked.delete(j) : picked.add(j);
                b.classList.toggle('selected');
                next.disabled = picked.size === 0;
            });
            box.appendChild(b);
        });

        const nav = document.createElement('div');
        nav.className = 'sa-nav';
        if (i > 0) {
            const back = document.createElement('button');
            back.className = 'btn btn-secondary';
            back.textContent = '← Back';
            back.addEventListener('click', () => this.askQ(i - 1));
            nav.appendChild(back);
        }
        const next = document.createElement('button');
        if (q.multi) {
            next.className = 'btn btn-primary';
            next.textContent = 'Next →';
            next.disabled = picked.size === 0;
            next.addEventListener('click', () => {
                this.answers[i] = [...picked];
                this.nextQ(i);
            });
            nav.appendChild(next);
        }
        box.appendChild(nav);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    nextQ(i) {
        if (i + 1 < this.currentModule.questions.length) this.askQ(i + 1);
        else this.showPlan();
    }

    async showPlan() {
        const m = this.currentModule;
        const tags = new Set();
        this.answers.forEach((a, i) => (a || []).forEach(j =>
            m.questions[i].options[j].tags.forEach(t => tags.add(t))));

        // picked "Nothing" but also picked something else? drop the "nothing" note
        if (tags.has('use_none') && [...tags].some(t => t.startsWith('use_') && t !== 'use_none')) tags.delete('use_none');

        const got = [...tags].map(t => ({ t, ...m.advice[t] })).filter(a => a.sec);
        const lvl = got.find(a => a.sec === 'level');

        const item = a => `
            <div class="sa-tip">
                <strong>${a.title}</strong>
                ${a.text ? `<p>${a.text}</p>` : ''}
                ${a.steps ? `<ol>${a.steps.map(s => `<li>${s}</li>`).join('')}</ol>` : ''}
            </div>`;

        const secs = m.sections.map(s => {
            const tips = got.filter(a => a.sec === s.id);
            return tips.length ? `<section class="sa-section"><h3>${s.title}</h3>${tips.map(item).join('')}</section>` : '';
        }).join('');

        document.getElementById('questionTitle').textContent = m.plan_title || '📝 Your Personal AI Plan';
        document.getElementById('optionsContainer').innerHTML = `
            <div class="sa-plan">
                ${lvl ? `<div class="sa-level"><span>You are:</span> <strong>${lvl.title}</strong><p>${lvl.text}</p></div>` : ''}
                ${secs}
                <div class="sa-nav">
                    <button class="btn btn-secondary" id="saRetake">↺ Start over</button>
                    <button class="btn btn-secondary" id="saPrint">🖨️ Print my plan</button>
                    <button class="btn btn-primary" id="saDone">Back to modules</button>
                </div>
            </div>
        `;
        document.getElementById('saRetake').addEventListener('click', () => { this.answers = []; this.askQ(0); });
        document.getElementById('saPrint').addEventListener('click', () => window.print());
        document.getElementById('saDone').addEventListener('click', () => this.showModuleSelection());
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // finishing it counts as completing the module
        if (!this.completedModules.has(m.id)) {
            this.completedModules.add(m.id);
            this.updateProgress();
            try {
                await saveProgress(this.course.id, m.id);
            } catch (e) {
                console.error('Failed to save progress:', e);
            }
        }
    }

    selectAnswer(index, option) {
        if (this.answered) return;

        this.answered = true;
        this.selectedAnswer = option;

        // Mark selected option
        const options = document.querySelectorAll('.option');
        options.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === index) {
                btn.classList.add('selected');
                if (option.correct) {
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('incorrect');
                }
            }
        });

        // Show result after a brief delay
        setTimeout(() => this.showResult(option), 600);
    }

    showResult(option) {
        const modal = document.getElementById('resultModal');
        const icon = document.getElementById('resultIcon');
        const title = document.getElementById('resultTitle');
        const message = document.getElementById('resultMessage');
        const explanation = document.getElementById('resultExplanation');
        const nextButton = document.getElementById('nextButton');

        if (option.correct) {
            icon.textContent = '✨';
            title.textContent = 'Excellent!';
            message.textContent = 'You got it right!';
        } else {
            icon.textContent = '💡';
            title.textContent = 'Not quite!';
            message.textContent = 'That\'s not the right answer, but you learned something!';
        }

        explanation.textContent = option.explanation;
        modal.classList.add('active');

        nextButton.onclick = () => this.handleNext(option.correct);
    }

    async handleNext(wasCorrect) {
        const modal = document.getElementById('resultModal');
        modal.classList.remove('active');

        if (wasCorrect) {
            // Mark module as completed
            if (!this.completedModules.has(this.currentModule.id)) {
                this.completedModules.add(this.currentModule.id);
                try {
                    await saveProgress(this.course.id, this.currentModule.id);
                } catch (error) {
                    console.error('Failed to save progress:', error);
                }
            }
        }

        // Check if this is the last module
        if (this.currentModuleIndex === this.course.modules.length - 1) {
            // Show completion modal
            if (wasCorrect) {
                this.showCourseComplete();
            } else {
                // Allow retry
                this.loadModule(this.currentModuleIndex);
            }
        } else {
            // Move to next module
            if (wasCorrect) {
                this.loadModule(this.currentModuleIndex + 1);
            } else {
                // Retry current
                this.loadModule(this.currentModuleIndex);
            }
        }
    }

    showCourseComplete() {
        const modal = document.getElementById('completeModal');
        const count = document.getElementById('completedCount');
        count.textContent = this.completedModules.size;

        const retakeBtn = document.getElementById('retakeButton');
        retakeBtn.onclick = () => {
            this.completedModules.clear();
            this.currentModuleIndex = 0;
            modal.classList.remove('active');
            this.init();
        };

        modal.classList.add('active');
    }
}

// Initialize course when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof courseData !== 'undefined') {
        new CourseExperience(courseData);
    }
});
