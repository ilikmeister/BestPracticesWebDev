// function for typewriting animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.classList.add('typing');
    return new Promise((resolve) => {
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
                resolve();
            }
        }
        type();
    });
}

// function to show cards with fade-in effect
function showCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 200); // 200ms delay between each card
    });
}

async function startAnimation() {
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    
    await typeWriter(text1, 'Hello, mate!');
    await typeWriter(text2, 'These are the Best Coding Practices in:');
    showCards();
}

// Starting the animation when page loads
window.addEventListener('load', startAnimation);