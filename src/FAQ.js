// ხშირად დასმული კითხვები
const questions = document.querySelectorAll('.qa');

questions.forEach(qa => {
  const question = qa.querySelector('.question');
  const answer = qa.querySelector('.answer');

  question.addEventListener('click', () => {
    if (qa.classList.contains('active')) {
      qa.classList.remove('active');
      answer.style.height = '0'; 
      answer.style.opacity = '0';
    } else {
      qa.classList.add('active');
      answer.style.height = '70px';  
      answer.style.opacity = '1';  
    }
  });
});