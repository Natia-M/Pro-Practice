// ხშირად დასმული კითხვები
const questions = document.querySelectorAll('.qa');

questions.forEach(qa => {
  const question = qa.querySelector('.question');
  const answer = qa.querySelector('.answer');

  question.addEventListener('click', () => {
    if (qa.classList.contains('active')) {
      qa.classList.remove('active');
      answer.style.opacity = '0';
    } else {
      qa.classList.add('active');
      answer.style.opacity = '1';  
    }
  });
});