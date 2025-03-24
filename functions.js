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
// same function but for lists
function showLists() {
    const lists = document.querySelectorAll('.list');
    lists.forEach((list, index) => {
        setTimeout(() => {
            list.classList.add('visible');
        }, index * 200); // 200ms delay between each list
    }
    );
}
// function to make animation order
async function startAnimation() {
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    
    await typeWriter(text1, 'hello, mate! check which ones you follow');
    await typeWriter(text2, 'from the best coding practices in:');
    await showCards();
    showLists();
}

// Starting the animation when page loads
window.addEventListener('load', startAnimation);

// function for scrolling to the block
function scrollToBlock(blockId) {
    document.getElementById(blockId).scrollIntoView({ behavior: 'smooth' });
  }


// function to fetch a golden retriever
async function showRetriever() {
    try {
        const response = await fetch("https://dog.ceo/api/breed/retriever/golden/images/random");
        const data = await response.json();
        const imageUrl = data.message;
        
        // Creating or getting the image container
        let rewardImage = document.getElementById('reward-image');
        if (!rewardImage) {
            rewardImage = document.createElement('img');
            rewardImage.id = 'reward-image';
            document.getElementById('summarytext').insertAdjacentElement('afterend', rewardImage);
        }
        
        rewardImage.src = imageUrl;
        rewardImage.style.display = 'block';
        rewardImage.style.maxWidth = '300px';
        rewardImage.style.margin = '20px auto';
        rewardImage.style.borderRadius = '10px';
    } catch (error) {
        console.error('Error fetching a golden retriever:', error);
    }
}

// function for updating the summary text based on checked practices
function updateSummary(checkedCount) {
    const summaryElement = document.getElementById("summarytext");
    const barFill = document.getElementById("bar-fill");
    const barText = document.getElementById("bar-text");
    let summaryText = "";
    
    const totalPractices = 15;
    const percentage = (checkedCount / totalPractices) * 100;

    // Checking the progress counter to handle the image visibility
    const rewardImage = document.getElementById('reward-image');
    if (rewardImage) {
        rewardImage.style.display = checkedCount >= 12 ? 'block' : 'none';
    }
    // Checking the progress counter to handle the summary
    if (checkedCount >= 0 && checkedCount <= 5) {
        summaryText = "work harder, as you need to follow at least 12 coding practices to reach the success.";
    } else if (checkedCount >= 6 && checkedCount <= 11) {
        summaryText = "you are on the right track, however, you still need to follow at least 12 coding practices to reach the success.";
    } else if (checkedCount >= 12 && checkedCount <= 15) {
        summaryText = "excellent job! you are following many practices. this is your golden retriever :)";
        showRetriever(); // fetching an image for 12 or more
    }
    // altering the text
    if (summaryElement) {
        summaryElement.textContent = summaryText;
    }
    // altering the bar chart
    if (barFill) {
        barFill.style.width = `${percentage}%`;
    }
    
    if (barText) {
        barText.textContent = `${checkedCount}/${totalPractices}`;
    }
}

// event listener to track and update the progress of checked practices
window.addEventListener('load', () => {
    // Getting all checkboxes
    const checkboxes = document.querySelectorAll('.best-practices-list input[type="checkbox"]');
    
    function updateProgress() {
        const checkedCount = document.querySelectorAll('.best-practices-list input[type="checkbox"]:checked').length;
        const totalCount = document.querySelectorAll('.best-practices-list input[type="checkbox"]').length;
        const progressText = `your progress: ${checkedCount}/${totalCount}`;
        
        // Updating progress in the navbar
        const progressElement = document.getElementById("progress");
        if (progressElement) {
            progressElement.textContent = progressText;
        }
        // Updating summary text
        updateSummary(checkedCount);
    }

    // Loading saved checkbox states from local storage
    checkboxes.forEach(checkbox => {
        // Loading saved state
        const storedState = localStorage.getItem(checkbox.id);
        if (storedState === "true") {
            checkbox.checked = true;
        }

        // Adding the change event listener
        checkbox.addEventListener("change", () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            updateProgress();
        });
    });

    // Initial progress update
    updateProgress();
});