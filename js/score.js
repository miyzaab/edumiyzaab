const result = document.getElementById('result');
const score = localStorage.getItem('quizScore') || 0;

result.textContent = score;
