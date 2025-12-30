const resultElement = document.getElementById('result');
const reviewContainer = document.getElementById('reviewContainer');

// Retrieve data
const rawData = localStorage.getItem('quizResult');

if (!rawData) {
    // No data, redirect to quiz
    window.location.href = 'quiz.html';
} else {
    const data = JSON.parse(rawData);

    // 1. Show Total Score
    resultElement.textContent = data.score;

    // Color the score circle based on performance
    const scoreCircle = document.querySelector('.score-circle');
    if (data.score >= 80) {
        scoreCircle.style.background = `conic-gradient(var(--primary) ${data.score}%, #e5e7eb 0)`;
        scoreCircle.style.color = 'var(--primary)';
    } else if (data.score >= 50) {
        scoreCircle.style.background = `conic-gradient(#facc15 ${data.score}%, #e5e7eb 0)`; // Yellow
        scoreCircle.style.color = '#ca8a04';
    } else {
        scoreCircle.style.background = `conic-gradient(#ef4444 ${data.score}%, #e5e7eb 0)`; // Red
        scoreCircle.style.color = '#b91c1c';
    }

    // 2. Render Detailed Review
    renderReview(data.details);
}

function renderReview(details) {
    reviewContainer.innerHTML = '<h3>Pembahasan</h3>';

    details.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `review-card ${item.isCorrect ? 'correct' : 'wrong'}`;

        // Status Icon
        const icon = item.isCorrect ? '✅ Benar' : '❌ Salah';

        // Determine user answer text
        const userAnswerText = item.options[item.selected];
        const correctAnswerText = item.options[item.correct];

        card.innerHTML = `
      <div class="review-header">
        <span class="q-num">Soal ${index + 1}</span>
        <span class="status-badge">${icon}</span>
      </div>
      <p class="review-question">${item.question}</p>
      
      <div class="review-answer">
        <p>Jawaban Anda: <strong>${userAnswerText}</strong></p>
        ${!item.isCorrect ? `<p class="correct-answer">Koreksi: <strong>${correctAnswerText}</strong></p>` : ''}
      </div>
    `;

        reviewContainer.appendChild(card);
    });
}
