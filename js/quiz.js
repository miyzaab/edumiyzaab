const form = document.getElementById('quizForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let score = 0;

  const answers = new FormData(form);
  for (let value of answers.values()) {
    score += Number(value);
  }

  localStorage.setItem('quizScore', score);
  window.location.href = 'score.html';
});
