import { createBPESimulation } from './bpe.js'
import { tokenizeText } from './tokenizer.js'
import './style.css'

const modules = [
  { id: 1, title: 'How LLMs Read Text', time: '4 min', icon: '01', description: 'Discover how ordinary text becomes information an AI model can process.' },
  { id: 2, title: 'Understanding Tokenization', time: '8 min', icon: '02', description: 'Explore tokens, token IDs and how different text is divided.' },
  { id: 3, title: 'How BPE Works', time: '7 min', icon: '03', description: 'Learn how frequent character pairs merge into larger units.' },
  { id: 4, title: 'Understanding Context Windows', time: '6 min', icon: '04', description: 'See how much information an LLM can process in one request.' },
  { id: 5, title: 'Token Budget Management', time: '7 min', icon: '05', description: 'Calculate and allocate tokens efficiently.' },
  { id: 6, title: 'Context Management Strategies', time: '7 min', icon: '06', description: 'Explore summarization, truncation, chunking and RAG.' },
  { id: 7, title: 'Practical Challenge', time: '6 min', icon: '07', description: 'Apply what you learned to a real-world AI assistant.' }
]

// TOKENTRAIL: LEARNER PROGRESS
const STORAGE_KEY = 'tokentrail-progress-v1'

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      completedModules: [],
      lastModule: 1,
      predictions: [],
      challengeScore: null
    }
  } catch {
    return {
      completedModules: [],
      lastModule: 1,
      predictions: [],
      challengeScore: null
    }
  }
}

let learnerProgress = loadProgress()

function saveProgress() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(learnerProgress)
    )
  } catch {
    console.warn('Progress could not be saved in this browser.')
  }
}

const app = document.querySelector('#app')


app.innerHTML = `
  <div class="dashboard-shell">

    <!-- LEFT SIDEBAR -->
    <aside class="sidebar">
      <a class="brand" href="#">
        <span class="brand-icon">T</span>
        <span>TokenTrail</span>
      </a>

      <div class="sidebar-label">LEARNING SPACE</div>

      <nav class="sidebar-nav">
        <a class="sidebar-link active" href="#overview">
          <span>◈</span> Overview
        </a>
        <a class="sidebar-link" href="#journey">
          <span>⌁</span> Learning trail
        </a>
        <a class="sidebar-link" href="#objectives">
          <span>◎</span> Objectives
        </a>
        <a class="sidebar-link" href="#performance">
          <span>▤</span> My performance
        </a>
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-course">
          <span class="course-dot"></span>
          <div>
            <strong>TokenTrail Academy</strong>
            <small>Beginner learning path</small>
          </div>
        </div>
        <span class="sidebar-version">INTERACTIVE GENAI COURSE · 2026</span>
      </div>
    </aside>

    <!-- MAIN DASHBOARD -->
    <main class="dashboard-main">

      <!-- TOP BAR -->
      <header class="dashboard-topbar">
        <div>
          <span class="topbar-label">YOUR LEARNING WORKSPACE</span>
          <p>Welcome to your learning journey.</p>
        </div>
        <div class="topbar-right">
          <span class="live-indicator"></span>
          <span>Self-paced learning</span>
          <span class="topbar-time">◷ 45 MIN</span>
        </div>
      </header>

      <!-- OVERVIEW -->
      <section class="dashboard-hero" id="overview">
        <div class="hero-copy">
          <span class="eyebrow">THE LANGUAGE BEHIND AI</span>
          <h1>Think in tokens.<br><span>Understand AI.</span></h1>
          <p>
            Explore how language models process text, manage context
            and make every token count.
          </p>
          <div class="hero-buttons">
            <a class="dashboard-primary-btn" href="#journey">
              Explore learning trail <span>→</span>
            </a>
            <span class="hero-meta">7 modules · 45 minutes · Beginner friendly</span>
          </div>
        </div>

        <div class="hero-visual">
          <div class="visual-topline">
            <span>INSIDE THE MODEL</span>
            <span class="visual-status">● LIVE DEMO</span>
          </div>

          <div class="visual-prompt">
            "Artificial Intelligence is amazing!"
          </div>

          <div class="visual-token-row">
            <span class="visual-token token-a">Artificial</span>
            <span class="visual-token token-b">Intelligence</span>
            <span class="visual-token token-c">is</span>
            <span class="visual-token token-d">amazing</span>
            <span class="visual-token token-e">!</span>
          </div>

          <div class="visual-connector">↓</div>

          <div class="visual-id-label">TEXT BECOMES NUMERICAL IDs</div>
          <div class="visual-id-row">
            <span>4821</span>
            <span>1293</span>
            <span>318</span>
            <span>892</span>
            <span>0</span>
          </div>

          <div class="visual-caption">
            TEXT <span>→</span> TOKENS <span>→</span> NUMBERS <span>→</span> MODEL
          </div>
          <p class="visual-disclaimer">Illustrative token breakdown and IDs</p>
        </div>
      </section>

      <!-- QUICK OVERVIEW -->
      <section class="overview-stats">
        <div class="overview-stat">
          <span class="stat-icon">⌘</span>
          <div>
            <strong>07</strong>
            <small>Learning modules</small>
          </div>
        </div>

        <div class="overview-stat">
          <span class="stat-icon">◷</span>
          <div>
            <strong>45 min</strong>
            <small>Total learning time</small>
          </div>
        </div>

        <div class="overview-stat">
          <span class="stat-icon">⚡</span>
          <div>
            <strong>04+</strong>
            <small>Interactive activities</small>
          </div>
        </div>

        <div class="overview-stat">
          <span class="stat-icon">◇</span>
          <div>
            <strong>01</strong>
            <small>Final practical challenge</small>
          </div>
        </div>
      </section>

      <!-- LEARNING TRAIL -->
      <section class="trail-section" id="journey">
        <div class="section-title-row">
          <div>
            <span class="eyebrow">YOUR LEARNING PATH</span>
            <h2>The TokenTrail journey</h2>
            <p>Seven stops. One journey from text to intelligent AI.</p>
          </div>
          <span class="trail-count">07 STOPS</span>
        </div>

        <div class="trail-layout">
          <div class="trail-main">
            <div class="trail-heading">
              <div>
                <strong>Learning trail</strong>
                <span>Follow the path in sequence</span>
              </div>
              <span class="trail-legend">
                <i class="legend-dot"></i> Ready to explore
              </span>
            </div>

            <div class="module-grid" id="moduleGrid"></div>
          </div>

          <!-- PROGRESS PANEL -->
          <aside class="progress-panel">
            <span class="eyebrow">YOUR PROGRESS</span>
            <h3>Learning overview</h3>

            <div class="progress-ring">
              <svg viewBox="0 0 140 140" aria-label="0 percent course completion">
                <circle class="ring-track" cx="70" cy="70" r="57"></circle>
                <circle class="ring-progress" cx="70" cy="70" r="57"></circle>
              </svg>
              <div class="ring-center">
                <strong>0%</strong>
                <span>Completed</span>
              </div>
            </div>

            <div class="progress-detail">
              <span>Modules completed</span>
              <strong>0 / 7</strong>
            </div>

            <div class="progress-detail">
              <span>Time remaining</span>
              <strong>45 min</strong>
            </div>

            <div class="progress-divider"></div>

            <div class="resume-card">
              <span class="resume-icon">▶</span>
              <div>
                <strong>Ready to begin?</strong>
                <p>Start with the foundations of how LLMs read text.</p>
              </div>
            </div>

            <a class="resume-button" href="#journey">
              Start Module 01 <span>→</span>
            </a>
          </aside>
        </div>
      </section>

      <!-- OBJECTIVES -->
      <section class="dashboard-section" id="objectives">
        <div class="section-title-row">
          <div>
            <span class="eyebrow">WHAT YOU WILL LEARN</span>
            <h2>Learning objectives</h2>
            <p>Skills you will develop throughout this experience.</p>
          </div>
          <span class="objective-total">7 OBJECTIVES</span>
        </div>

        <div class="objectives-grid">
          <div class="objective-item">
            <span class="objective-number">01</span>
            <div>
              <strong>Understand how LLMs read text</strong>
              <p>Explain how text becomes numerical representations.</p>
            </div>
          </div>

          <div class="objective-item">
            <span class="objective-number">02</span>
            <div>
              <strong>Understand tokenization</strong>
              <p>Identify tokens, token boundaries and token IDs.</p>
            </div>
          </div>

          <div class="objective-item">
            <span class="objective-number">03</span>
            <div>
              <strong>Explore BPE</strong>
              <p>Describe how frequent adjacent pairs are merged.</p>
            </div>
          </div>

          <div class="objective-item">
            <span class="objective-number">04</span>
            <div>
              <strong>Understand context windows</strong>
              <p>Explain context capacity and token limitations.</p>
            </div>
          </div>

          <div class="objective-item">
            <span class="objective-number">05</span>
            <div>
              <strong>Manage token budgets</strong>
              <p>Allocate input, output and context tokens.</p>
            </div>
          </div>

          <div class="objective-item">
            <span class="objective-number">06</span>
            <div>
              <strong>Apply context strategies</strong>
              <p>Compare summarization, chunking and RAG.</p>
            </div>
          </div>

          <div class="objective-item">
            <span class="objective-number">07</span>
            <div>
              <strong>Solve a real-world challenge</strong>
              <p>Apply token and context management decisions.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- PERFORMANCE -->
      <section class="dashboard-section performance-section" id="performance">
        <div class="section-title-row">
          <div>
            <span class="eyebrow">LEARNING INSIGHTS</span>
            <h2>Your performance</h2>
            <p>Your learning results will appear here as you complete activities.</p>
          </div>
        </div>

        <div class="performance-grid">
          <div class="performance-card">
            <span class="performance-icon">◎</span>
            <strong>Not attempted</strong>
            <h3>Prediction accuracy</h3>
            <p>Answer prediction questions to build your score.</p>
          </div>

          <div class="performance-card">
            <span class="performance-icon">✦</span>
            <strong>Not started</strong>
            <h3>Final challenge</h3>
            <p>Apply your learning in a practical AI scenario.</p>
          </div>

          <div class="performance-card">
            <span class="performance-icon">⌁</span>
            <strong>0 activities</strong>
            <h3>Hands-on exploration</h3>
            <p>Your completed interactive activities will appear here.</p>
          </div>
        </div>
      </section>

      <!-- REVIEWER PANEL -->
      <section class="reviewer-section">
        <details>
          <summary>
            <span>
              <strong>For Reviewers</strong>
              <small>Instructional design decisions and course structure</small>
            </span>
            <span class="reviewer-arrow">＋</span>
          </summary>

          <div class="reviewer-content">
            <h3>5-minute course review</h3>
            <p>
              This learning experience uses short explanations, predictions,
              interactive simulations and a final practical challenge.
            </p>

            <div class="reviewer-points">
              <div><strong>01 · Foundations</strong><span>Build a mental model of how LLMs process text.</span></div>
              <div><strong>02 · Tokenization</strong><span>Use live tokenizer output to make an abstract concept visible.</span></div>
              <div><strong>03 · BPE</strong><span>Explore pair merging through a simplified simulation.</span></div>
              <div><strong>04 · Context</strong><span>Experiment with context capacity and token allocation.</span></div>
              <div><strong>05 · Budget</strong><span>Connect token allocation with illustrative cost calculations.</span></div>
              <div><strong>06 · Strategies</strong><span>Compare practical context-management decisions.</span></div>
              <div><strong>07 · Application</strong><span>Transfer learning to a customer-support AI scenario.</span></div>
            </div>

            <p class="reviewer-note">
              Accuracy notes, implementation details and learning references
              are documented separately in the project documentation.
            </p>
          </div>
        </details>
      </section>

      <!-- FOOTER -->
      <footer class="dashboard-footer">
        <span class="brand">
          <span class="brand-icon">T</span>
          TokenTrail
        </span>
        <span>Learn the language behind language models.</span>
      </footer>

    </main>
  </div>
`


const grid = document.querySelector('#moduleGrid')

modules.forEach((module, index) => {
  const card = document.createElement('article')
  card.className = 'module-card'
  card.innerHTML = `
    <div class="card-top">
      <span class="module-number">${module.icon}</span>
      <span class="module-time">⏱ ${module.time}</span>
    </div>
    <h3>${module.title}</h3>
    <p>${module.description}</p>
    <button class="module-btn" data-module="${module.id}">
      Explore module <span>→</span>
    </button>
  `
  grid.appendChild(card)
})

function updateDashboardProgress() {
  const completedCount = learnerProgress.completedModules.length
  const totalModules = modules.length

  const percentage = Math.round(
    (completedCount / totalModules) * 100
  )

  const completedTime = modules
    .filter(module => learnerProgress.completedModules.includes(module.id))
    .reduce((total, module) => total + parseInt(module.time), 0)

  const totalTime = modules.reduce(
    (total, module) => total + parseInt(module.time), 0
  )

  const remainingTime = totalTime - completedTime

  const ring = document.querySelector('.ring-progress')
  const ringText = document.querySelector('.ring-center strong')
  const ringSvg = document.querySelector('.progress-ring svg')
  const progressDetails = document.querySelectorAll('.progress-detail strong')

  if (ring) {
    const circumference = 2 * Math.PI * 57
    ring.style.strokeDashoffset =
      circumference - (percentage / 100) * circumference
  }

  if (ringText) {
    ringText.textContent = `${percentage}%`
  }

  if (ringSvg) {
    ringSvg.setAttribute(
      'aria-label',
      `${percentage}% course completion`
    )
  }

  if (progressDetails[0]) {
    progressDetails[0].textContent =
      `${completedCount} / ${totalModules}`
  }

  if (progressDetails[1]) {
    progressDetails[1].textContent =
      `${remainingTime} min`
  }
}

updateDashboardProgress()

  function openIntroModule() {
    const old = document.querySelector('.lesson-overlay')
    if (old) old.remove()
  
    const overlay = document.createElement('div')
    overlay.className = 'lesson-overlay'
  
    overlay.innerHTML = `
      <div class="lesson-panel">
        <button class="close-lesson" aria-label="Close">✕</button>
  
        <span class="eyebrow">MODULE 01 · FOUNDATIONS · 4 MIN</span>
        <h2>How LLMs Read Text</h2>
  
        <div class="bpe-explanation">
          <strong>1. The Hook: A small puzzle</strong>
          <h3>How many times does the letter "r" appear in "strawberry"?</h3>
          <p>
            People can usually answer this by looking at the letters.
            LLMs have been known to struggle with this task. Why?
          </p>
          <p class="token-note">
            This is not a universal failure. Model capabilities vary.
          </p>
        </div>
  
        <div class="bpe-explanation">
          <strong>2. Predict before you explore</strong>
          <p>What do you think an LLM actually receives as input?</p>
  
          <div class="prediction-options">
            <button class="prediction-choice" data-answer="letters">
              A. Letters one by one
            </button>
            <button class="prediction-choice" data-answer="words">
              B. Whole words
            </button>
            <button class="prediction-choice" data-answer="numbers">
              C. Chunks of text converted into numbers
            </button>
          </div>
  
          <div id="introFeedback" class="context-status" hidden></div>
        </div>
  
        <div id="introExplore" hidden>
  
          <h3>3. Explore: From text to numbers</h3>
          <p>
            Edit the sentence or try the presets. Watch how the tokenizer
            divides text into chunks and maps them to numerical IDs.
          </p>
  
          <div class="prediction-options">
            <button class="intro-preset" data-text="Artificial Intelligence is amazing!">
              Plain sentence
            </button>
            <button class="intro-preset" data-text="strawberry">
              Strawberry
            </button>
            <button class="intro-preset" data-text="antidisestablishmentarianism">
              Long word
            </button>
          </div>
  
          <label for="introText">Your text</label>
          <textarea id="introText" rows="3">Artificial Intelligence is amazing!</textarea>
  
          <div class="bpe-explanation">
            <strong>Stage 1 — Your text</strong>
            <p id="introOriginal">Artificial Intelligence is amazing!</p>
          </div>
  
          <div class="flow-arrow">↓ Tokenization</div>
  
          <div class="bpe-explanation">
            <strong>Stage 2 — Token chunks</strong>
            <div id="introTokens" class="token-output"></div>
            <p id="introTokenCount" class="token-note"></p>
          </div>
  
          <div class="flow-arrow">↓ Each token maps to an ID</div>
  
          <div class="bpe-explanation">
            <strong>Stage 3 — Token IDs</strong>
            <div id="introTokenIds" class="token-ids"></div>
          </div>
  
          <p class="token-note">
            The model works with these numerical representations,
            not raw letters.
          </p>
  
          <div class="bpe-explanation">
            <strong>4. What happens next?</strong>
            <p>
              Text is first split into tokens. Each token maps to an ID
              number, and the model processes those numbers.
              The model then predicts the next token, one at a time.
            </p>
            <p>
              Because it works with chunks rather than directly inspecting
              individual letters, letter-counting tasks can be challenging.
              Tokenization is one contributing factor, not the whole explanation.
            </p>
          </div>
  
          <div class="bpe-explanation">
            <strong>5. Myth vs Reality</strong>
            <p><strong>Myth:</strong> LLMs read words just like humans.</p>
            <p>
              <strong>Reality:</strong> They process tokens, which can be
              whole words, parts of words or even individual characters.
            </p>
          </div>
  
          <div class="bpe-explanation">
            <strong>6. Micro-check: Predict and verify</strong>
            <p>
              Which will usually use more tokens: a short common word
              or a long, less common word?
            </p>
  
            <div class="prediction-options">
              <button class="micro-prediction" data-answer="common">
                Short common word
              </button>
              <button class="micro-prediction" data-answer="rare">
                Long, rare word
              </button>
              <button class="micro-prediction" data-answer="same">
                Both use the same
              </button>
            </div>
  
            <div id="microPredictionFeedback" class="context-status" hidden></div>
  
            <label for="compareCommon">Short common word</label>
            <input id="compareCommon" value="the">
  
            <label for="compareRare">Long, less common word</label>
            <input id="compareRare" value="antidisestablishmentarianism">
  
            <button id="verifyWords" class="primary-btn">
              Check actual token counts →
            </button>
  
            <div id="wordComparison" class="context-status" hidden></div>
          </div>
  
          <details class="bpe-explanation">
            <summary><strong>7. See it in code</strong></summary>
            <p>JavaScript example using the gpt-tokenizer library:</p>
            <pre><code id="introCode"></code></pre>
            <button id="copyIntroCode" class="module-btn">Copy code</button>
            <p class="token-note">
              This example uses the package's default o200k_base encoding.
            </p>
          </details>
  
          <div class="bpe-explanation">
            <strong>8. What's next?</strong>
            <p>
              Now that you understand tokens and token IDs,
              let's look closer at how text gets split into tokens.
            </p>
            <p><strong>Next: Module 2 — Understanding Tokenization.</strong></p>
          </div>
        </div>
      </div>
    `
  
    document.body.appendChild(overlay)
  
    // Prediction before revealing the lesson
    const choices = overlay.querySelectorAll('.prediction-choice')
    const feedback = overlay.querySelector('#introFeedback')
    const explore = overlay.querySelector('#introExplore')
  
    choices.forEach(button => {
      button.addEventListener('click', () => {
        choices.forEach(choice => choice.disabled = true)
  
        feedback.hidden = false
  
        if (button.dataset.answer === 'numbers') {
          feedback.className = 'context-status fit'
          feedback.textContent =
            'Correct! Text is tokenized and mapped to numerical IDs before model processing.'
        } else {
          feedback.className = 'context-status overflow'
          feedback.textContent =
            'Not quite. The model processes numerical representations of text called token IDs.'
        }
  
        explore.hidden = false
        updateIntroTokens()
      })
    })
  
    // Real tokenizer demonstration
    const textInput = overlay.querySelector('#introText')
  
    function updateIntroTokens() {
      const result = tokenizeText(textInput.value)
  
      overlay.querySelector('#introOriginal').textContent =
        textInput.value || '(Enter some text)'
  
      const tokenArea = overlay.querySelector('#introTokens')
      const idArea = overlay.querySelector('#introTokenIds')
  
      tokenArea.replaceChildren()
      idArea.replaceChildren()
  
      result.tokens.forEach(token => {
        const chip = document.createElement('span')
        chip.className = 'live-token'
        chip.textContent = JSON.stringify(token.text)
        tokenArea.appendChild(chip)
  
        const id = document.createElement('span')
        id.className = 'live-id'
        id.textContent = token.id
        idArea.appendChild(id)
      })
  
      overlay.querySelector('#introTokenCount').textContent =
        `${result.tokenCount} tokens · Encoding: o200k_base`
    }
  
    textInput.addEventListener('input', updateIntroTokens)
  
    overlay.querySelectorAll('.intro-preset').forEach(button => {
      button.addEventListener('click', () => {
        textInput.value = button.dataset.text
        updateIntroTokens()
      })
    })
  
    // Predict before comparing two real token counts
    let microGuess = null
  
    overlay.querySelectorAll('.micro-prediction').forEach(button => {
      button.addEventListener('click', () => {
        microGuess = button.dataset.answer
  
        overlay.querySelectorAll('.micro-prediction').forEach(choice => {
          choice.disabled = true
        })
  
        const result = overlay.querySelector('#microPredictionFeedback')
        result.hidden = false
        result.className = 'context-status fit'
        result.textContent =
          'Prediction recorded! Now compare the actual token counts below.'
      })
    })
  
    overlay.querySelector('#verifyWords').addEventListener('click', () => {
      if (!microGuess) {
        const result = overlay.querySelector('#wordComparison')
        result.hidden = false
        result.className = 'context-status overflow'
        result.textContent = 'Make your prediction before checking the counts.'
        return
      }
  
      const common = overlay.querySelector('#compareCommon').value
      const rare = overlay.querySelector('#compareRare').value
  
      const commonCount = tokenizeText(common).tokenCount
      const rareCount = tokenizeText(rare).tokenCount
  
      const result = overlay.querySelector('#wordComparison')
      result.hidden = false
  
      result.className = 'context-status fit'
      result.textContent =
        `"${common}" uses ${commonCount} token(s). ` +
        `"${rare}" uses ${rareCount} token(s). ` +
        (rareCount > commonCount
          ? 'The long word used more tokens in this example.'
          : rareCount < commonCount
            ? 'The short word used more tokens in this example. Token counts depend on the encoding and word.'
            : 'Both used the same number of tokens in this example.')
    })
  
    // Copyable JavaScript example
    const codeExample =
  `import { encode, decode } from 'gpt-tokenizer';
  
  const ids = encode("strawberry");
  console.log(ids);        // Token IDs
  console.log(ids.length); // Number of tokens
  console.log(decode(ids)); // Reconstructed text`
  
    overlay.querySelector('#introCode').textContent = codeExample
  
    overlay.querySelector('#copyIntroCode').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeExample)
        overlay.querySelector('#copyIntroCode').textContent = 'Copied!'
      } catch {
        overlay.querySelector('#copyIntroCode').textContent =
          'Select and copy the code above'
      }
    })
  
    overlay.querySelector('.close-lesson').addEventListener('click', () => {
      overlay.remove()
    })
  }

  
function openTokenizationPlayground() {
  const old = document.querySelector('.lesson-overlay')
  if (old) old.remove()

  const overlay = document.createElement('div')
  overlay.className = 'lesson-overlay'

  overlay.innerHTML = `
    <div class="lesson-panel">
      <button class="close-lesson" aria-label="Close">✕</button>
      <span class="eyebrow">MODULE 02 · INTERACTIVE PLAYGROUND</span>
      <h2>Understanding Tokenization</h2>
      <p>Type any text below and see how the tokenizer divides it into tokens.</p>
      <div class="prediction-box">
  <h3>🧠 Predict before you explore</h3>
  <p>How many tokens do you think this sentence contains?</p>
  <strong>"Artificial Intelligence is amazing!"</strong>

  <div class="prediction-options">
    <button class="prediction-choice" data-guess="3">3 tokens</button>
    <button class="prediction-choice" data-guess="5">5 tokens</button>
    <button class="prediction-choice" data-guess="8">8 tokens</button>
  </div>

  <div id="predictionFeedback" class="context-status" hidden></div>
</div>

      <label for="tokenInput">Your text</label>
      <textarea id="tokenInput" rows="4">Artificial Intelligence is amazing!</textarea>

      <div class="token-stats">
        <div><strong id="tokenCount">0</strong><span>Tokens</span></div>
        <div><strong id="wordCount">0</strong><span>Words</span></div>
      </div>

      <h3>Token breakdown</h3>
      <div id="tokenOutput" class="token-output"></div>

      <h3>Token IDs</h3>
      <div id="tokenIds" class="token-ids"></div>

      <p class="token-note">
        Encoding: o200k_base. Token boundaries and counts depend on the tokenizer.
      </p>
    </div>
  `

  document.body.appendChild(overlay)

  const input = overlay.querySelector('#tokenInput')

  function updateTokens() {
    const result = tokenizeText(input.value)

    overlay.querySelector('#tokenCount').textContent = result.tokenCount
    overlay.querySelector('#wordCount').textContent =
      input.value.trim() ? input.value.trim().split(/\s+/).length : 0

    const output = overlay.querySelector('#tokenOutput')
    const ids = overlay.querySelector('#tokenIds')

    output.replaceChildren()
    ids.replaceChildren()

    result.tokens.forEach(token => {
      const chip = document.createElement('span')
      chip.className = 'live-token'
      chip.textContent = JSON.stringify(token.text)
      output.appendChild(chip)

      const id = document.createElement('span')
      id.className = 'live-id'
      id.textContent = token.id
      ids.appendChild(id)
    })
  }

  input.addEventListener('input', updateTokens)
  updateTokens()
    // Hide the token results until the learner makes a prediction
    const tokenStats = overlay.querySelector('.token-stats')
    const tokenOutput = overlay.querySelector('#tokenOutput')
    const tokenIds = overlay.querySelector('#tokenIds')
    const feedback = overlay.querySelector('#predictionFeedback')
  
    tokenStats.hidden = true
    tokenOutput.hidden = true
    tokenIds.hidden = true
  
    const predictionButtons = overlay.querySelectorAll('.prediction-choice')
  
    predictionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const actualCount = tokenizeText('Artificial Intelligence is amazing!').tokenCount
        const guess = Number(button.dataset.guess)
  
        feedback.hidden = false
  
        if (guess === actualCount) {
          feedback.className = 'context-status fit'
          feedback.textContent = `Excellent prediction! The actual count is ${actualCount} tokens.`
        } else {
          feedback.className = 'context-status overflow'
          feedback.textContent = `Good try! The actual count is ${actualCount} tokens. Token counts depend on the encoding.`
        }
  
        predictionButtons.forEach(choice => {
          choice.disabled = true
        })
  
        tokenStats.hidden = false
        tokenOutput.hidden = false
        tokenIds.hidden = false
      })
    })

  overlay.querySelector('.close-lesson').addEventListener('click', () => {
    overlay.remove()
  })
}

function openBPESimulator() {
  const old = document.querySelector('.lesson-overlay')
  if (old) old.remove()

  const simulation = createBPESimulation()
  const overlay = document.createElement('div')
  overlay.className = 'lesson-overlay'

  overlay.innerHTML = `
    <div class="lesson-panel">
      <button class="close-lesson" aria-label="Close">✕</button>
      <span class="eyebrow">MODULE 03 · INTERACTIVE SIMULATOR</span>
      <h2>How Byte Pair Encoding Works</h2>
      <p>
        BPE repeatedly merges frequent adjacent pairs.
        Click Next Merge to watch the process.
      </p>
      <div class="prediction-box">
  <h3>🧠 Predict before you explore</h3>

  <p>
    What happens when BPE repeatedly finds
    frequently occurring adjacent character pairs?
  </p>

  <div class="prediction-options">
    <button class="prediction-choice" data-guess="delete">
      A. It deletes them
    </button>

    <button class="prediction-choice" data-guess="merge">
      B. It merges them into larger units
    </button>

    <button class="prediction-choice" data-guess="sentence">
      C. It converts them into sentences
    </button>
  </div>

  <div id="bpePredictionFeedback" class="context-status" hidden></div>
</div>

      <div class="bpe-explanation">
        <strong>Teaching example</strong>
        <p>Starting corpus: low, low, low, lower, lowest</p>
        <small>This is a simplified character-level demonstration,
        not the exact algorithm or merge vocabulary of a production tokenizer.</small>
      </div>

      <h3>Current word representations</h3>
      <div id="bpeWords" class="bpe-words"></div>

      <h3>Adjacent pair frequencies</h3>
      <div id="bpePairs" class="bpe-pairs"></div>

      <div id="bpeMessage" class="bpe-message">
        Click Next Merge to begin.
      </div>

      <div class="bpe-controls">
        <button id="nextMerge" class="primary-btn">Next Merge →</button>
        <button id="resetBpe" class="module-btn">↻ Reset</button>
      </div>

      <p class="token-note" id="bpeStep">Step 0</p>
    </div>
  `

  document.body.appendChild(overlay)

  const wordsArea = overlay.querySelector('#bpeWords')
  const pairsArea = overlay.querySelector('#bpePairs')
  const message = overlay.querySelector('#bpeMessage')
  const stepLabel = overlay.querySelector('#bpeStep')
  const nextButton = overlay.querySelector('#nextMerge')
    // Prediction must be answered before starting the BPE simulation
    nextButton.disabled = true

    const bpeChoices = overlay.querySelectorAll('.prediction-choice')
    const bpeFeedback = overlay.querySelector('#bpePredictionFeedback')
  
    bpeChoices.forEach(button => {
      button.addEventListener('click', () => {
        const guess = button.dataset.guess
  
        bpeFeedback.hidden = false
  
        if (guess === 'merge') {
          bpeFeedback.className = 'context-status fit'
          bpeFeedback.textContent =
            'Correct! BPE merges frequent adjacent pairs into larger units.'
        } else {
          bpeFeedback.className = 'context-status overflow'
          bpeFeedback.textContent =
            'Not quite! BPE identifies frequent adjacent pairs and merges them into larger units.'
        }
        button.classList.add('selected')
        bpeChoices.forEach(choice => {
          choice.disabled = true
        })
  
        // Unlock the BPE simulator after the prediction
        nextButton.disabled = false
      })
    })

  function render(state) {
    wordsArea.replaceChildren()
    pairsArea.replaceChildren()

    state.words.forEach(word => {
      const row = document.createElement('div')
      row.className = 'bpe-word'

      const label = document.createElement('strong')
      label.textContent = word.join(' · ')
      row.appendChild(label)

      wordsArea.appendChild(row)
    })

    const pairs = Object.entries(state.pairs)
      .sort((a, b) => b[1] - a[1])

    if (!pairs.length) {
      pairsArea.textContent = 'No adjacent pairs remain.'
    } else {
      pairs.forEach(([pair, frequency]) => {
        const chip = document.createElement('span')
        chip.className = 'live-token'
        chip.textContent = `${pair.replace('|', ' + ')} : ${frequency}`
        pairsArea.appendChild(chip)
      })
    }

    stepLabel.textContent = `Step ${state.step}`
  }

  nextButton.addEventListener('click', () => {
    const state = simulation.nextMerge()

    if (state.merged) {
      message.textContent =
        `${state.message} Frequency: ${state.frequency}.`
    } else {
      message.textContent = 'Simulation complete! No adjacent pairs remain.'
    }

    render(state)

    if (Object.keys(state.pairs).length === 0) {
      nextButton.disabled = true
    }
  })

  overlay.querySelector('#resetBpe').addEventListener('click', () => {
    const state = simulation.reset()
    message.textContent = 'Simulation reset. Click Next Merge to begin.'
    nextButton.disabled = false
    render(state)
  })

  overlay.querySelector('.close-lesson').addEventListener('click', () => {
    overlay.remove()
  })

  render(simulation.getState())
}


function openContextSimulator() {
  const old = document.querySelector('.lesson-overlay')
  if (old) old.remove()

  const overlay = document.createElement('div')
  overlay.className = 'lesson-overlay'

  overlay.innerHTML = `
    <div class="lesson-panel">
      <button class="close-lesson" aria-label="Close">✕</button>

      <span class="eyebrow">MODULE 04 · INTERACTIVE SIMULATOR</span>
      <h2>Understanding Context Windows</h2>

      <p>
        A context window is the maximum amount of information
        a model can process in a request.
      </p>

      <div class="bpe-explanation">
        <strong>Your mission: Manage an AI conversation</strong>
        <p>Adjust the token values and keep the request within the context limit.</p>
      </div>

      <label for="contextCapacity">Context window capacity</label>
      <input id="contextCapacity" type="number" min="1" value="4000">

      <h3>Token allocation</h3>

      <div class="context-input">
        <label for="systemTokens">System instructions</label>
        <input id="systemTokens" type="number" min="0" value="500">
      </div>

      <div class="context-input">
        <label for="userTokens">User prompt</label>
        <input id="userTokens" type="number" min="0" value="300">
      </div>

      <div class="context-input">
        <label for="historyTokens">Conversation history</label>
        <input id="historyTokens" type="number" min="0" value="1200">
      </div>

      <div class="context-input">
        <label for="documentTokens">Retrieved documents</label>
        <input id="documentTokens" type="number" min="0" value="1000">
      </div>

      <div class="context-input">
        <label for="outputTokens">Reserved output tokens</label>
        <input id="outputTokens" type="number" min="0" value="1000">
      </div>

      <h3>Context usage</h3>

      <div class="context-bar">
        <div id="contextFill"></div>
      </div>

      <div class="context-results">
        <div>
          <strong id="totalTokens">4000</strong>
          <span>Total tokens</span>
        </div>
        <div>
          <strong id="remainingTokens">0</strong>
          <span>Remaining</span>
        </div>
        <div>
          <strong id="usagePercent">100%</strong>
          <span>Used</span>
        </div>
      </div>

      <div id="contextStatus" class="context-status"></div>

      <button id="resetContext" class="module-btn">↻ Reset values</button>

      <p class="token-note">
        Educational simulation: values are illustrative. Real context
        limits depend on the model, and the request may include additional
        token overhead.
      </p>
    </div>
  `

  document.body.appendChild(overlay)

  const fields = [
    'systemTokens',
    'userTokens',
    'historyTokens',
    'documentTokens',
    'outputTokens'
  ]

  const capacity = overlay.querySelector('#contextCapacity')

  function updateContext() {
    const limit = Math.max(1, Number(capacity.value) || 1)

    const total = fields.reduce((sum, id) => {
      const field = overlay.querySelector(`#${id}`)
      const value = Math.max(0, Number(field.value) || 0)
      return sum + value
    }, 0)

    const remaining = limit - total
    const percentage = (total / limit) * 100
    const displayedPercentage = Math.round(percentage)
    const visualPercentage = Math.min(100, percentage)

    overlay.querySelector('#totalTokens').textContent =
      total.toLocaleString()

    overlay.querySelector('#remainingTokens').textContent =
      remaining.toLocaleString()

    overlay.querySelector('#usagePercent').textContent =
      `${displayedPercentage}%`

    overlay.querySelector('#contextFill').style.width =
      `${visualPercentage}%`

    const status = overlay.querySelector('#contextStatus')

    if (remaining < 0) {
      status.className = 'context-status overflow'
      status.textContent =
        `Context overflow! Reduce your input by ${Math.abs(remaining).toLocaleString()} tokens.`
    } else if (remaining === 0) {
      status.className = 'context-status full'
      status.textContent = 'Exactly at capacity! No tokens remain.'
    } else {
      status.className = 'context-status fit'
      status.textContent =
        `Fits within the context window. You have ${remaining.toLocaleString()} tokens remaining.`
    }

    overlay.querySelector('#contextFill').style.background =
      remaining < 0 ? '#f87171' : '#a78bfa'
  }

  fields.forEach(id => {
    overlay.querySelector(`#${id}`).addEventListener('input', updateContext)
  })

  capacity.addEventListener('input', updateContext)

  overlay.querySelector('#resetContext').addEventListener('click', () => {
    const defaults = [500, 300, 1200, 1000, 1000]

    fields.forEach((id, index) => {
      overlay.querySelector(`#${id}`).value = defaults[index]
    })

    capacity.value = 4000
    updateContext()
  })

  overlay.querySelector('.close-lesson').addEventListener('click', () => {
    overlay.remove()
  })

  updateContext()
}

function openBudgetCalculator() {
  const old = document.querySelector('.lesson-overlay')
  if (old) old.remove()

  const overlay = document.createElement('div')
  overlay.className = 'lesson-overlay'

  overlay.innerHTML = `
    <div class="lesson-panel">
      <button class="close-lesson" aria-label="Close">✕</button>

      <span class="eyebrow">MODULE 05 · INTERACTIVE CALCULATOR</span>
      <h2>Token Budget Management</h2>

      <p>Allocate tokens, calculate your budget and estimate API costs.</p>

      <div class="bpe-explanation">
        <strong>Your mission: Plan an AI request</strong>
        <p>Adjust the values below to build an efficient token budget.</p>
      </div>

      <h3>1. Input token allocation</h3>

      <div class="context-input">
        <label for="budgetSystem">System instructions</label>
        <input id="budgetSystem" type="number" min="0" value="400">
      </div>

      <div class="context-input">
        <label for="budgetUser">User prompt</label>
        <input id="budgetUser" type="number" min="0" value="300">
      </div>

      <div class="context-input">
        <label for="budgetHistory">Conversation history</label>
        <input id="budgetHistory" type="number" min="0" value="800">
      </div>

      <div class="context-input">
        <label for="budgetDocs">Retrieved documents</label>
        <input id="budgetDocs" type="number" min="0" value="1000">
      </div>

      <h3>2. Output and context limit</h3>

      <div class="context-input">
        <label for="budgetOutput">Reserved output tokens</label>
        <input id="budgetOutput" type="number" min="0" value="1000">
      </div>

      <div class="context-input">
        <label for="budgetLimit">Context window capacity</label>
        <input id="budgetLimit" type="number" min="1" value="5000">
      </div>

      <h3>3. Estimated API pricing</h3>

      <p class="token-note">
        Editable illustrative prices per one million tokens.
        These are examples, not current provider pricing.
      </p>

      <div class="context-input">
        <label for="inputPrice">Input price ($ / 1M tokens)</label>
        <input id="inputPrice" type="number" min="0" step="0.01" value="2">
      </div>

      <div class="context-input">
        <label for="outputPrice">Output price ($ / 1M tokens)</label>
        <input id="outputPrice" type="number" min="0" step="0.01" value="8">
      </div>

      <h3>4. Your token budget results</h3>

      <div class="context-results">
        <div>
          <strong id="budgetInputTotal">2500</strong>
          <span>Input tokens</span>
        </div>
        <div>
          <strong id="budgetGrandTotal">3500</strong>
          <span>Total tokens</span>
        </div>
        <div>
          <strong id="budgetRemaining">1500</strong>
          <span>Remaining</span>
        </div>
      </div>

      <div class="context-bar">
        <div id="budgetFill"></div>
      </div>

      <div class="context-results">
        <div>
          <strong id="budgetPercent">70%</strong>
          <span>Capacity used</span>
        </div>
        <div>
          <strong id="budgetInputCost">$0.005</strong>
          <span>Input cost</span>
        </div>
        <div>
          <strong id="budgetOutputCost">$0.008</strong>
          <span>Output cost</span>
        </div>
      </div>

      <div class="context-status fit" id="budgetStatus"></div>

      <div class="bpe-explanation">
        <strong>Estimated total API cost</strong>
        <h2 id="budgetTotalCost">$0.013</h2>
        <small>Input cost + output cost. Actual billing depends on the provider and model.</small>
      </div>

      <button id="resetBudget" class="module-btn">↻ Reset calculator</button>

      <h3>5. Knowledge check</h3>
      <p>If your input uses 2,000 tokens and output uses 500 tokens, what is the total?</p>

      <div class="budget-quiz">
        <button data-answer="2000">2,000 tokens</button>
        <button data-answer="2500">2,500 tokens</button>
        <button data-answer="3000">3,000 tokens</button>
      </div>

      <div id="budgetFeedback" class="context-status" hidden></div>
    </div>
  `

  document.body.appendChild(overlay)

  const ids = [
    'budgetSystem',
    'budgetUser',
    'budgetHistory',
    'budgetDocs'
  ]

  const output = overlay.querySelector('#budgetOutput')
  const limit = overlay.querySelector('#budgetLimit')
  const inputPrice = overlay.querySelector('#inputPrice')
  const outputPrice = overlay.querySelector('#outputPrice')

  const getNumber = element =>
    Math.max(0, Number(element.value) || 0)

  function calculate() {
    const inputTokens = ids.reduce((sum, id) => {
      return sum + getNumber(overlay.querySelector(`#${id}`))
    }, 0)

    const outputTokens = getNumber(output)
    const capacity = Math.max(1, getNumber(limit))
    const total = inputTokens + outputTokens
    const remaining = capacity - total
    const percent = total / capacity * 100

    const inputCost =
      inputTokens * getNumber(inputPrice) / 1000000

    const outputCost =
      outputTokens * getNumber(outputPrice) / 1000000

    const totalCost = inputCost + outputCost

    overlay.querySelector('#budgetInputTotal').textContent =
      inputTokens.toLocaleString()

    overlay.querySelector('#budgetGrandTotal').textContent =
      total.toLocaleString()

    overlay.querySelector('#budgetRemaining').textContent =
      remaining.toLocaleString()

    overlay.querySelector('#budgetPercent').textContent =
      `${Math.round(percent)}%`

    overlay.querySelector('#budgetInputCost').textContent =
      `$${inputCost.toFixed(4)}`

    overlay.querySelector('#budgetOutputCost').textContent =
      `$${outputCost.toFixed(4)}`

    overlay.querySelector('#budgetTotalCost').textContent =
      `$${totalCost.toFixed(4)}`

    const fill = overlay.querySelector('#budgetFill')
    fill.style.width = `${Math.min(100, percent)}%`
    fill.style.background = remaining < 0 ? '#f87171' : '#a78bfa'

    const status = overlay.querySelector('#budgetStatus')

    if (remaining < 0) {
      status.className = 'context-status overflow'
      status.textContent =
        `Budget exceeded by ${Math.abs(remaining).toLocaleString()} tokens. Reduce your allocation.`
    } else if (remaining === 0) {
      status.className = 'context-status full'
      status.textContent = 'Your allocation exactly fills the context window.'
    } else {
      status.className = 'context-status fit'
      status.textContent =
        `${remaining.toLocaleString()} tokens are still available. Your budget fits!`
    }
  }

  overlay.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculate)
  })

  overlay.querySelector('#resetBudget').addEventListener('click', () => {
    const defaults = {
      budgetSystem: 400,
      budgetUser: 300,
      budgetHistory: 800,
      budgetDocs: 1000,
      budgetOutput: 1000,
      budgetLimit: 5000,
      inputPrice: 2,
      outputPrice: 8
    }

    Object.entries(defaults).forEach(([id, value]) => {
      overlay.querySelector(`#${id}`).value = value
    })

    calculate()

    overlay.querySelector('#budgetFeedback').hidden = true
  })

  overlay.querySelectorAll('.budget-quiz button').forEach(button => {
    button.addEventListener('click', () => {
      const feedback = overlay.querySelector('#budgetFeedback')
      feedback.hidden = false

      if (button.dataset.answer === '2500') {
        feedback.className = 'context-status fit'
        feedback.textContent =
          'Correct! 2,000 + 500 = 2,500 tokens.'
      } else {
        feedback.className = 'context-status overflow'
        feedback.textContent =
          'Not quite. Add the input tokens and output tokens together.'
      }
    })
  })

  overlay.querySelector('.close-lesson').addEventListener('click', () => {
    overlay.remove()
  })

  calculate()
}



function openContextStrategies() {
  const old = document.querySelector('.lesson-overlay')
  if (old) old.remove()

  const overlay = document.createElement('div')
  overlay.className = 'lesson-overlay'

  overlay.innerHTML = `
    <div class="lesson-panel">
      <button class="close-lesson" aria-label="Close">✕</button>

      <span class="eyebrow">MODULE 06 · CONTEXT OPTIMIZATION LAB · 7 MIN</span>
      <h2>Save the AI Customer Support Assistant</h2>

      <p>
        Your chatbot must answer a customer's question using
        a long conversation and company documents. Learn how
        developers manage limited context without losing important facts.
      </p>

      <div class="bpe-explanation">
        <strong>Your learning objective</strong>
        <p>
          By the end of this activity, you should be able to choose
          context-management strategies, explain their trade-offs
          and preserve important information.
        </p>
      </div>

      <h3>Step 1 · Understand the scenario</h3>

      <div class="bpe-explanation">
        <strong>Customer support conversation</strong>
        <p><b>Message 1:</b> I purchased a laptop last week.</p>
        <p><b>Message 2:</b> The screen is flickering.</p>
        <p><b>Message 3:</b> My order number is #48291.</p>
        <p><b>Message 4:</b> Can I return the laptop?</p>
        <p><b>Message 5:</b> I have already contacted support.</p>
        <p><b>Messages 6–12:</b> More discussion about troubleshooting, delivery and product details.</p>
        <p>
          The assistant must answer the latest question while
          remembering the order number and checking the return policy.
        </p>
      </div>

      <h3>Step 2 · Inspect the context budget</h3>

      <div class="context-results">
        <div><strong id="strategyHistory">3,200</strong><span>Conversation history</span></div>
        <div><strong id="strategyDocs">1,800</strong><span>Company documents</span></div>
        <div><strong>350</strong><span>System instructions</span></div>
        <div><strong>250</strong><span>New question</span></div>
        <div><strong>700</strong><span>Reserved output</span></div>
      </div>

      <div class="context-results">
        <div><strong id="strategyTotal">6,300</strong><span>Total tokens</span></div>
        <div><strong>4,096</strong><span>Context limit</span></div>
        <div><strong id="strategySaved">0</strong><span>Tokens saved</span></div>
      </div>

      <div class="context-bar">
        <div id="strategyFill"></div>
      </div>

      <div id="strategyStatus" class="context-status overflow" aria-live="polite">
        Your request exceeds the context limit by 2,204 tokens.
      </div>

      <h3>Step 3 · Experiment with strategies</h3>

      <p>
        Try the strategies below. Observe the token budget
        and check whether the important order number is preserved.
      </p>

      <div class="strategy-options">
        <button data-action="summarize" aria-pressed="false">
          <strong>1. Summarization</strong>
          <span>Condense the conversation into a shorter summary.</span>
        </button>

        <button data-action="truncate" aria-pressed="false">
          <strong>2. Truncation</strong>
          <span>Remove older messages to reduce the conversation size.</span>
        </button>

        <button data-action="sliding" aria-pressed="false">
          <strong>3. Sliding window</strong>
          <span>Keep only the most recent messages.</span>
        </button>

        <button data-action="pin" aria-pressed="false">
          <strong>4. Pin important facts</strong>
          <span>Preserve the order number even when history is compressed.</span>
        </button>

        <button data-action="chunk" aria-pressed="false">
          <strong>5. Chunking</strong>
          <span>Divide large documents into smaller sections.</span>
        </button>

        <button data-action="rag" aria-pressed="false">
          <strong>6. RAG retrieval</strong>
          <span>Retrieve only the document sections relevant to the question.</span>
        </button>
      </div>

      <div id="strategyExplanation" class="bpe-explanation" aria-live="polite">
        <strong>Experiment instructions</strong>
        <p>
          Start by summarizing the conversation. Then preserve the
          important order number, divide documents into chunks
          and retrieve only relevant information.
        </p>
      </div>

      <div class="bpe-explanation">
        <strong>Important fact check</strong>
        <p id="strategyFact">
          Order number #48291 has not yet been explicitly preserved.
        </p>
      </div>

      <h3>Step 4 · Understand the trade-offs</h3>

      <div class="context-results">
        <div>
          <strong>Summarization</strong>
          <span>Shorter history, but may lose details</span>
        </div>
        <div>
          <strong>Truncation</strong>
          <span>Less content, but older facts disappear</span>
        </div>
        <div>
          <strong>Sliding window</strong>
          <span>Recent messages remain, older facts may disappear</span>
        </div>
        <div>
          <strong>RAG</strong>
          <span>Relevant external information is retrieved</span>
        </div>
      </div>

      <button id="strategyReset" class="module-btn">↻ Reset simulation</button>

      <h3>Step 5 · Knowledge check</h3>

      <p>
        The customer asks: "Can I return order #48291?"
        Which approach best manages both the conversation and company documents?
      </p>

      <div class="budget-quiz">
        <button data-answer="truncate">
          Delete all older messages and send every document.
        </button>
        <button data-answer="best">
          Summarize the conversation, preserve the order number,
          and use RAG to retrieve relevant policy chunks.
        </button>
        <button data-answer="chunk">
          Divide the documents into chunks but send every chunk.
        </button>
      </div>

      <div id="strategyFeedback" class="context-status" hidden aria-live="polite"></div>

      <div id="strategyComplete" hidden>
        <div class="bpe-explanation">
          <strong>Lab completed!</strong>
          <h3>Excellent work!</h3>
          <p id="strategyCompletionText"></p>
          <p id="strategyFinalBudget"></p>
        </div>

        <h3>What you learned</h3>
        <ul>
          <li>Summarization reduces conversation history.</li>
          <li>Truncation and sliding windows can remove useful facts.</li>
          <li>Pinning important facts helps preserve critical details.</li>
          <li>Chunking organizes documents but does not save tokens by itself.</li>
          <li>RAG retrieves relevant document chunks for a question.</li>
        </ul>
      </div>
    </div>
  `

  document.body.appendChild(overlay)

  const limit = 4096

  const originalHistory = 3200
  const originalDocs = 1800

  let historyMode = 'full'
  let pinned = false
  let chunked = false
  let rag = false
  let knowledgeAnswered = false

  function getHistoryTokens() {
    const historySizes = {
      full: 3200,
      summarize: 900,
      truncate: 1200,
      sliding: 1400
    }

    return historySizes[historyMode] + (pinned ? 30 : 0)
  }

  function getDocumentTokens() {
    return rag ? 400 : originalDocs
  }

  function calculateBudget() {
    const history = getHistoryTokens()
    const docs = getDocumentTokens()

    const total = 350 + history + docs + 250 + 700
    const saved = 6300 - total
    const remaining = limit - total

    return {
      history,
      docs,
      total,
      saved,
      remaining,
      factPreserved: historyMode === 'full' || pinned
    }
  }

  function render() {
    const budget = calculateBudget()

    overlay.querySelector('#strategyHistory').textContent =
      budget.history.toLocaleString()

    overlay.querySelector('#strategyDocs').textContent =
      budget.docs.toLocaleString()

    overlay.querySelector('#strategyTotal').textContent =
      budget.total.toLocaleString()

    overlay.querySelector('#strategySaved').textContent =
      budget.saved.toLocaleString()

    const fill = overlay.querySelector('#strategyFill')

    fill.style.width =
      `${Math.min(100, budget.total / limit * 100)}%`

    const status = overlay.querySelector('#strategyStatus')

    if (budget.remaining < 0) {
      status.className = 'context-status overflow'
      status.textContent =
        `Over capacity by ${Math.abs(budget.remaining).toLocaleString()} tokens. Apply more strategies.`
      fill.style.background = '#ef4444'
    } else if (!budget.factPreserved) {
      status.className = 'context-status fit'
      status.textContent =
        `The request fits with ${budget.remaining.toLocaleString()} tokens remaining, but order #48291 is not preserved.`
      fill.style.background = '#a78bfa'
    } else {
      status.className = 'context-status fit'
      status.textContent =
        `The request fits and order #48291 is preserved. ${budget.remaining.toLocaleString()} tokens remain.`
      fill.style.background = '#22c55e'
    }

    overlay.querySelector('#strategyFact').textContent =
      budget.factPreserved
        ? 'Order number #48291 is preserved in the conversation context.'
        : 'Warning: order number #48291 may be lost. Pin this fact before compressing history.'

    overlay.querySelectorAll('[data-action]').forEach(button => {
      const action = button.dataset.action

      const selected =
        (action === 'summarize' && historyMode === 'summarize') ||
        (action === 'truncate' && historyMode === 'truncate') ||
        (action === 'sliding' && historyMode === 'sliding') ||
        (action === 'pin' && pinned) ||
        (action === 'chunk' && chunked) ||
        (action === 'rag' && rag)

      button.setAttribute('aria-pressed', String(selected))
      button.style.borderColor = selected ? '#b69aff' : ''
      button.style.background = selected ? '#49366f' : ''
    })

    return budget
  }

  function explain(title, description) {
    overlay.querySelector('#strategyExplanation').innerHTML = `
      <strong>${title}</strong>
      <p>${description}</p>
    `
  }

  overlay.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action

      if (action === 'summarize') {
        historyMode = 'summarize'

        explain(
          'Summarization applied',
          'The 12-message conversation is condensed from 3,200 to 900 tokens. However, a summary may omit the order number. Preserve important facts separately.'
        )
      }

      if (action === 'truncate') {
        historyMode = 'truncate'
        pinned = false

        explain(
          'Truncation applied',
          'Older messages are removed. Token usage decreases, but the order number from message 3 may disappear.'
        )
      }

      if (action === 'sliding') {
        historyMode = 'sliding'
        pinned = false

        explain(
          'Sliding window applied',
          'Only recent messages are retained. This is useful for recent conversation context, but older information such as the order number may be lost.'
        )
      }

      if (action === 'pin') {
        pinned = !pinned

        explain(
          pinned ? 'Important fact preserved' : 'Pinned fact removed',
          pinned
            ? 'Order #48291 is explicitly kept in the context while the rest of the conversation is compressed.'
            : 'The order number is no longer guaranteed to remain in the compressed history.'
        )
      }

      if (action === 'chunk') {
        chunked = !chunked

        if (!chunked) {
          rag = false
          explain(
            'Chunking turned off',
            'The documents are no longer divided into smaller sections. RAG retrieval has also been reset.'
          )
        } else {
          explain(
            'Documents chunked',
            'The 1,800 document tokens are now organized into smaller sections. Notice that total token usage has not decreased yet. Chunking alone does not remove content.'
          )
        }
      }

      if (action === 'rag') {
        if (!chunked) {
          explain(
            'First, prepare the documents',
            'Divide the documents into smaller chunks before retrieving the relevant sections in this simplified activity.'
          )
          return
        }

        rag = !rag

        explain(
          rag ? 'RAG retrieval applied' : 'RAG retrieval removed',
          rag
            ? 'The assistant retrieves only relevant return-policy chunks. The document allocation falls from 1,800 to 400 tokens.'
            : 'The full document collection is included again. Only selected relevant chunks would reduce the amount sent.'
        )
      }

      render()
    })
  })

  overlay.querySelector('#strategyReset').addEventListener('click', () => {
    historyMode = 'full'
    pinned = false
    chunked = false
    rag = false
    knowledgeAnswered = false

    overlay.querySelector('#strategyFeedback').hidden = true
    overlay.querySelector('#strategyComplete').hidden = true

    explain(
      'Simulation reset',
      'Start again by choosing a strategy. Observe both token usage and whether important information is preserved.'
    )

    render()
  })

  overlay.querySelectorAll('[data-answer]').forEach(button => {
    button.addEventListener('click', () => {
      const feedback = overlay.querySelector('#strategyFeedback')
      feedback.hidden = false

      const budget = calculateBudget()

      if (button.dataset.answer === 'best') {
        if (!chunked || !rag || !pinned || budget.remaining < 0) {
          feedback.className = 'context-status overflow'
          feedback.textContent =
            'Your answer describes the right approach, but first apply summarization, pin the order number, chunk the documents and retrieve relevant chunks. Make sure the request fits.'
          return
        }

        knowledgeAnswered = true
        feedback.className = 'context-status fit'
        feedback.textContent =
          'Correct! You combined summarization, fact preservation, chunking and RAG to build an efficient context.'

        overlay.querySelector('#strategyComplete').hidden = false

        overlay.querySelector('#strategyCompletionText').textContent =
          'You managed the context budget while preserving the information needed to answer the customer.'

        overlay.querySelector('#strategyFinalBudget').textContent =
          `Final usage: ${budget.total.toLocaleString()} / ${limit.toLocaleString()} tokens. ${budget.remaining.toLocaleString()} tokens remain.`
      } else {
        feedback.className = 'context-status overflow'
        feedback.textContent =
          button.dataset.answer === 'truncate'
            ? 'Not quite. Truncation can remove the order number, and sending every document wastes context.'
            : 'Not quite. Chunking organizes documents, but sending every chunk still uses the full document token budget. Use RAG to select relevant chunks.'
      }
    })
  })

  overlay.querySelector('.close-lesson').addEventListener('click', () => {
    overlay.remove()
  })

  render()
}

function openPracticalChallenge() {
  const old = document.querySelector('.lesson-overlay')
  if (old) old.remove()

  const overlay = document.createElement('div')
  overlay.className = 'lesson-overlay'

  overlay.innerHTML = `
    <div class="lesson-panel">
      <button class="close-lesson" aria-label="Close">✕</button>

      <span class="eyebrow">MODULE 07 · FINAL CHALLENGE · 6 MIN</span>
      <h2>Build Your AI Customer Support Assistant</h2>

      <p>
        A company is building an AI assistant that answers customer
        questions using chat history and company documents.
        Your job is to make the request fit the context window
        without losing important information.
      </p>

      <div class="bpe-explanation">
        <strong>Your mission</strong>
        <p>
          Your AI model has a context limit of 4,096 tokens.
          The current request needs 4,300 tokens.
          Make it fit, preserve the customer's order number,
          reserve output tokens and stay within the cost target.
        </p>
      </div>

      <h3>Step 1 · Inspect the context budget</h3>

      <div class="context-results">
        <div><strong>450</strong><span>System instructions</span></div>
        <div><strong>150</strong><span>User question</span></div>
        <div><strong id="historyTokens">1,900</strong><span>Chat history</span></div>
        <div><strong id="documentTokens">1,200</strong><span>Company documents</span></div>
        <div><strong>600</strong><span>Reserved output</span></div>
      </div>

      <div class="context-results">
        <div>
          <strong id="challengeTotal">4,300</strong>
          <span>Total tokens</span>
        </div>
        <div>
          <strong>4,096</strong>
          <span>Context limit</span>
        </div>
      </div>

      <div class="context-bar">
        <div id="challengeFill"></div>
      </div>

      <div id="challengeStatus" class="context-status overflow" aria-live="polite">
        Over the limit by 204 tokens. Your request cannot fit yet.
      </div>

      <h3>Step 2 · Retrieve relevant documents</h3>

      <div class="bpe-explanation">
        <strong>Scenario</strong>
        <p>
          The company knowledge base contains hundreds of pages.
          The customer only needs information about the return policy.
          Which approach should the assistant use?
        </p>
      </div>

      <div class="budget-quiz" id="strategyChoices">
        <button data-strategy="summary">Summarize the entire knowledge base</button>
        <button data-strategy="truncate">Delete the last half of the documents</button>
        <button data-strategy="rag">Use RAG to retrieve relevant sections</button>
      </div>

      <div id="strategyFeedback" class="context-status" hidden aria-live="polite"></div>

      <div id="step3" hidden>
        <h3>Step 3 · Preserve important information</h3>

        <div class="bpe-explanation">
          <strong>New situation</strong>
          <p>
            The customer shared order number #48291 in message 3.
            The conversation contains many unrelated messages.
            The assistant must still remember the order number.
          </p>
        </div>

        <p>What should you do with the conversation history?</p>

        <div class="budget-quiz">
          <button data-history="delete">
            Delete the entire conversation history
          </button>
          <button data-history="preserve">
            Summarize unrelated messages and preserve order #48291
          </button>
          <button data-history="keep">
            Send the entire conversation without changes
          </button>
        </div>

        <div id="historyFeedback" class="context-status" hidden aria-live="polite"></div>
      </div>

      <div id="step4" hidden>
        <h3>Step 4 · Protect the AI response</h3>

        <p>
          Your request now fits. You have 600 tokens reserved
          for the AI's answer. What should you do?
        </p>

        <div class="budget-quiz">
          <button data-output="remove">
            Remove the output reserve to save tokens
          </button>
          <button data-output="keep">
            Keep the 600-token output reserve
          </button>
        </div>

        <div id="outputFeedback" class="context-status" hidden aria-live="polite"></div>
      </div>

      <div id="step5" hidden>
        <h3>Step 5 · Apply your understanding</h3>

        <p>
          Why should developers divide large documents into smaller chunks
          before using RAG?
        </p>

        <div class="budget-quiz">
          <button data-chunk="automatic">
            Chunking automatically reduces all token usage
          </button>
          <button data-chunk="retrieve">
            Smaller chunks make relevant information easier to retrieve
          </button>
          <button data-chunk="ids">
            Chunking converts text into numerical token IDs
          </button>
        </div>

        <div id="chunkFeedback" class="context-status" hidden aria-live="polite"></div>
      </div>

      <div id="challengeComplete" hidden>
        <div class="bpe-explanation">
          <strong>Challenge completed!</strong>
          <h3 id="challengeScore"></h3>
          <p id="completionMessage"></p>
          <p id="finalBudget"></p>
          <p id="finalCost"></p>
        </div>

        <h3>What you demonstrated</h3>
        <ul>
          <li>Managing a limited context window</li>
          <li>Retrieving relevant information using RAG</li>
          <li>Preserving important conversation details</li>
          <li>Reserving output tokens and estimating cost</li>
          <li>Understanding document chunking</li>
        </ul>
      </div>
    </div>
  `

  document.body.appendChild(overlay)

  let score = 0
  const completed = {
    strategy: false,
    history: false,
    output: false,
    chunk: false
  }

  let documentCount = 1200
  let historyCount = 1900
  const limit = 4096
  const outputReserve = 600

  function calculateBudget() {
    const inputTokens =
      450 + 150 + historyCount + documentCount

    const total = inputTokens + outputReserve
    const remaining = limit - total

    overlay.querySelector('#challengeTotal').textContent =
      total.toLocaleString()

    overlay.querySelector('#historyTokens').textContent =
      historyCount.toLocaleString()

    overlay.querySelector('#documentTokens').textContent =
      documentCount.toLocaleString()

    const fill = overlay.querySelector('#challengeFill')
    fill.style.width = `${Math.min(total / limit * 100, 100)}%`

    const status = overlay.querySelector('#challengeStatus')

    if (remaining >= 0) {
      status.className = 'context-status fit'
      status.textContent =
        `Within budget! ${remaining.toLocaleString()} tokens remain.`
      fill.style.background = '#22c55e'
    } else {
      status.className = 'context-status overflow'
      status.textContent =
        `Over the limit by ${Math.abs(remaining).toLocaleString()} tokens.`
      fill.style.background = '#ef4444'
    }

    return { inputTokens, total, remaining }
  }

  function awardPoint(step) {
    if (!completed[step]) {
      score++
      completed[step] = true
    }
  }

  calculateBudget()

  // Step 2: RAG
  overlay.querySelectorAll('[data-strategy]').forEach(button => {
    button.addEventListener('click', () => {
      const feedback = overlay.querySelector('#strategyFeedback')
      feedback.hidden = false

      if (button.dataset.strategy === 'rag') {
        documentCount = 350
        awardPoint('strategy')

        feedback.className = 'context-status fit'
        feedback.textContent =
          'Correct! RAG retrieves relevant document sections instead of sending the entire knowledge base. Documents are reduced from 1,200 to 350 tokens.'

        calculateBudget()
        overlay.querySelector('#step3').hidden = false
      } else {
        feedback.className = 'context-status overflow'

        feedback.textContent =
          button.dataset.strategy === 'summary'
            ? 'Not quite. Summarization condenses information, but RAG is designed to retrieve relevant knowledge-base sections for a question.'
            : 'Not quite. Truncation removes content without identifying which sections are relevant.'
      }
    })
  })

  // Step 3: Preserve the important fact
  overlay.querySelectorAll('[data-history]').forEach(button => {
    button.addEventListener('click', () => {
      const feedback = overlay.querySelector('#historyFeedback')
      feedback.hidden = false

      if (button.dataset.history === 'preserve') {
        historyCount = 900
        awardPoint('history')

        feedback.className = 'context-status fit'
        feedback.textContent =
          'Correct! Summarize unrelated messages while explicitly preserving order #48291. The history is reduced from 1,900 to 900 tokens.'

        calculateBudget()
        overlay.querySelector('#step4').hidden = false
      } else {
        feedback.className = 'context-status overflow'
        feedback.textContent =
          button.dataset.history === 'delete'
            ? 'Deleting the entire history loses the order number needed to answer the customer.'
            : 'Sending everything unchanged wastes tokens and does not manage the context budget.'
      }
    })
  })

  // Step 4: Reserve output tokens
  overlay.querySelectorAll('[data-output]').forEach(button => {
    button.addEventListener('click', () => {
      const feedback = overlay.querySelector('#outputFeedback')
      feedback.hidden = false

      if (button.dataset.output === 'keep') {
        awardPoint('output')

        feedback.className = 'context-status fit'
        feedback.textContent =
          'Correct! The output reserve is part of the context budget. Keeping 600 tokens allows space for the AI response.'

        overlay.querySelector('#step5').hidden = false
      } else {
        feedback.className = 'context-status overflow'
        feedback.textContent =
          'Removing the reserve leaves no planned space for the model response. Always account for output tokens.'
      }
    })
  })

  // Step 5: Chunking knowledge check
  overlay.querySelectorAll('[data-chunk]').forEach(button => {
    button.addEventListener('click', () => {
      const feedback = overlay.querySelector('#chunkFeedback')
      feedback.hidden = false

      if (button.dataset.chunk === 'retrieve') {
        awardPoint('chunk')

        feedback.className = 'context-status fit'
        feedback.textContent = `Correct! Chunking divides large documents into smaller pieces. RAG can then retrieve the chunks relevant to the user's question.`

        const budget = calculateBudget()

        // Illustrative prices, not live API pricing.
        const inputCost = budget.inputTokens * 2 / 1000000
        const outputCost = outputReserve * 8 / 1000000
        const totalCost = inputCost + outputCost

        overlay.querySelector('#challengeComplete').hidden = false
        overlay.querySelector('#challengeScore').textContent =
          `Your score: ${score}/4`

        overlay.querySelector('#completionMessage').textContent =
          score === 4
            ? 'Excellent! You completed all four decisions successfully.'
            : 'You completed the challenge. Review the explanations to strengthen your understanding.'

        overlay.querySelector('#finalBudget').textContent =
          `Final context usage: ${budget.total.toLocaleString()} / ${limit.toLocaleString()} tokens. ${budget.remaining.toLocaleString()} tokens remain.`

        overlay.querySelector('#finalCost').textContent =
          `Illustrative estimated cost: $${totalCost.toFixed(5)} (input: $2 and output: $8 per million tokens). Actual model pricing varies.`
      } else {
        feedback.className = 'context-status overflow'
        feedback.textContent =
          button.dataset.chunk === 'automatic'
            ? 'Not quite. Chunking alone does not reduce total token usage. It makes selective retrieval possible.'
            : 'Not quite. Token IDs are produced by tokenization. Chunking divides documents into smaller sections.'
      }
    })
  })

  overlay.querySelector('.close-lesson').addEventListener('click', () => {
    overlay.remove()
  })
}


document.querySelectorAll('.module-btn').forEach(button => {
  button.addEventListener('click', () => {
    const id = Number(button.dataset.module)

    if (id === 1) {
      openIntroModule()
    } else if (id === 2) {
      openTokenizationPlayground()
    } else if (id === 3) {
      openBPESimulator()
    } else if (id === 4) {
      openContextSimulator()
    } else if (id === 5) {
      openBudgetCalculator()
    } else if (id === 6) {
      openContextStrategies()
    } else if (id === 7) {
      openPracticalChallenge()
    }
    })
    })