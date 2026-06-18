document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            const item = this.parentElement;
            const answer = this.nextElementSibling;

            if (item.classList.contains("active")) {
                item.classList.remove("active");
                answer.style.maxHeight = null;
            } else {
                // Menutup FAQ lain yang sedang terbuka
                document.querySelectorAll(".faq-item").forEach(el => {
                    el.classList.remove("active");
                    el.querySelector(".faq-answer").style.maxHeight = null;
                });

                // Membuka FAQ yang di-klik
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});