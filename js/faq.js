document.addEventListener("click", function (event) {
    const question = event.target.closest(".faq-question");
    if (!question) return;

    const item = question.parentElement;
    const answer = item ? item.querySelector(".faq-answer") : null;

    if (!answer) {
        console.error("Found .faq-question but couldn't find its .faq-answer element.");
        return;
    }

    if (item.classList.contains("active")) {
        item.classList.remove("active");
        answer.style.maxHeight = "";
    } else {
        document.querySelectorAll(".faq-item.active").forEach(el => {
            el.classList.remove("active");
            const openAnswer = el.querySelector(".faq-answer");
            if (openAnswer) openAnswer.style.maxHeight = "";
        });

        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
});