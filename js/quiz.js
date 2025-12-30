const quizData = [
  {
    id: 1,
    question: "Apa hukum menuntut ilmu agama bagi setiap muslim?",
    options: [
      "Fardhu Kifayah",
      "Fardhu 'Ain (Wajib)",
      "Sunnah Muakkad"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Manakah yang termasuk adab terhadap guru?",
    options: [
      "Memotong pembicaraannya",
      "Mendoakan kebaikan untuknya",
      "Bergurau saat pelajaran"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Apa niat utama dalam menuntut ilmu?",
    options: [
      "Agar dipuji orang lain",
      "Mencari gelar dunia",
      "Menghilangkan kebodohan dari diri sendiri"
    ],
    correct: 2
  },
  {
    id: 4,
    question: "Bagaimana cara mencatat ilmu yang benar?",
    options: [
      "Diikat dengan tulisan",
      "Cukup diingat saja",
      "Direkam tanpa didengarkan"
    ],
    correct: 0
  },
  {
    id: 5,
    question: "Barangsiapa menempuh jalan menuntut ilmu, Allah akan...",
    options: [
      "Menambah hartanya",
      "Mudahkan jalannya ke Surga",
      "Menjadikannya pemimpin"
    ],
    correct: 1
  }
];

const form = document.getElementById('quizForm');
const questionsContainer = document.getElementById('questionsContainer');

// 1. Render Questions
function renderQuiz() {
  questionsContainer.innerHTML = '';

  quizData.forEach((item, index) => {
    const step = document.createElement('div');
    step.className = 'quiz-step animate-on-scroll';
    step.style.animationDelay = `${index * 0.1}s`;

    // Header
    const qTitle = document.createElement('p');
    qTitle.className = 'quiz-question';
    qTitle.textContent = `${index + 1}. ${item.question}`;
    step.appendChild(qTitle);

    // Options
    const grid = document.createElement('div');
    grid.className = 'options-grid';

    item.options.forEach((optText, optIndex) => {
      const label = document.createElement('label');
      label.className = 'quiz-option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${item.id}`; // Group by question ID
      input.value = optIndex;
      input.required = true;

      const span = document.createElement('span');
      span.className = 'option-content';
      span.textContent = optText;

      label.append(input, span);
      grid.appendChild(label);
    });

    step.appendChild(grid);
    questionsContainer.appendChild(step);
  });
}

// 2. Handle Submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let score = 0;
  let userAnswers = [];

  const formData = new FormData(form);

  quizData.forEach((item) => {
    const selectedVal = formData.get(`q${item.id}`);
    const selectedIndex = parseInt(selectedVal);

    const isCorrect = selectedIndex === item.correct;
    if (isCorrect) score++;

    userAnswers.push({
      question: item.question,
      options: item.options,
      selected: selectedIndex,
      correct: item.correct,
      isCorrect: isCorrect
    });
  });

  // Calculate Percentage
  const finalScore = Math.round((score / quizData.length) * 100);

  // Save to LocalStorage
  const resultData = {
    score: finalScore,
    details: userAnswers
  };

  localStorage.setItem('quizResult', JSON.stringify(resultData));

  // Redirect
  window.location.href = 'score.html';
});

// Init
renderQuiz();
