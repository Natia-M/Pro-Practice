// ხშირად დასმული კითხვები
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.classList.contains("open");

      if (isOpen) {
        answer.classList.remove("open");
        question.classList.remove("active");
        answer.style.marginTop = "0px";
      } else {
        answer.classList.add("open");
        question.classList.add("active");
        answer.style.marginTop = "3px";
      }
    });

    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        question.click();
      }
    });
  });
});
