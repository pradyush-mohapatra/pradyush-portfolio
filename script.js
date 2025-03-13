document.addEventListener("DOMContentLoaded", function () {
    // GSAP animations for text and buttons
    gsap.to(".animate-text", { duration: 1, y: 0, opacity: 1, stagger: 0.3, ease: "power2.out" });
    gsap.to(".animate-btn", { duration: 1, opacity: 1, scale: 1, ease: "back.out(1.7)", delay: 0.5 });

    // GSAP fade-in and slide-up effects
    gsap.utils.toArray(".fade-in").forEach((el, i) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: i * 0.2 });
    });

    gsap.utils.toArray(".slide-up").forEach((el, i) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.5 + i * 0.3 });
    });

    // GSAP animation for project cards
    gsap.from(".project-card", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        stagger: 0.3,
        ease: "power3.out"
    });

    // Step-wise animations
    gsap.fromTo(".step1", { opacity: 0, x: -50, rotateY: 20 }, { opacity: 1, x: 0, rotateY: 0, duration: 1, delay: 0.5 });
    gsap.fromTo(".ladder1", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });
    gsap.fromTo(".step2", { opacity: 0, x: 50, rotateY: -20 }, { opacity: 1, x: 0, rotateY: 0, duration: 1, delay: 1.5 });
    gsap.fromTo(".ladder2", { opacity: 0 }, { opacity: 1, duration: 1, delay: 2 });
    gsap.fromTo(".step3", { opacity: 0, x: -50, rotateY: 20 }, { opacity: 1, x: 0, rotateY: 0, duration: 1, delay: 2.5 });
    

    // Default active tab
    document.querySelector(".tab-content").style.display = "block";


    // Visitor count
    updateVisitCount();

    // Contact form handling
    document.addEventListener("DOMContentLoaded", function () {
        // Initialize EmailJS with your public key
        emailjs.init("iwx4DKqHW42hGKQRG"); // Replace with your actual EmailJS public key
    
        document.getElementById("message-form").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
    
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();
            let statusMessage = document.getElementById("status-message");
    
            // Validate input fields
            if (name === "" || email === "" || message === "") {
                statusMessage.innerHTML = "All fields are required!";
                statusMessage.style.color = "red";
                return;
            }
    
            // Sending email using EmailJS
            emailjs.send("service_51c6rl9", "template_0kkmxym", {
                from_name: name,
                from_email: email,
                message: message
            }).then(
                function (response) {
                    statusMessage.innerHTML = "Message sent successfully!";
                    statusMessage.style.color = "green";
                    document.getElementById("message-form").reset();
                },
                function (error) {
                    statusMessage.innerHTML = "Failed to send. Try again!";
                    statusMessage.style.color = "red";
                    console.error("EmailJS Error:", error);
                }
            );
        });
    });
    
});

// Function for tab switching
function openTab(event, tabName) {
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    let tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
}

// Function to update visit count
function updateVisitCount() {
    let count = localStorage.getItem("visitCount");

    if (!count) {
        count = 1;  // First-time visitor
    } else {
        count = parseInt(count) + 1; // Increment count
    }

    localStorage.setItem("visitCount", count);

    // Ensure the element exists before updating
    let visitElement = document.getElementById("visit-count");
    if (visitElement) {
        visitElement.textContent = count;
    } else {
        console.warn("⚠️ Visit count element not found!");
    }
}

// Ensure the function runs when the page loads
document.addEventListener("DOMContentLoaded", updateVisitCount);


function downloadCV() {
    // Replace 'your-cv.pdf' with the actual file path
    var cvUrl = "pradyushcv.pdf";
    var link = document.createElement("a");
    link.href = cvUrl;
    link.download = "pradyushcv.pdf"; // Change filename as needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    chatPopup.style.display = chatPopup.style.display === 'none' ? 'block' : 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    sendQuestion(userInput);
}

function sendQuestion(question) {
    const chatBody = document.getElementById('chatBody');

    const userMessage = `<div class="user-message">${question}</div>`;
    chatBody.innerHTML += userMessage;

    const botResponse = getBotResponse(question);
    const botMessage = `<div class="bot-message">${botResponse}</div>`;
    chatBody.innerHTML += botMessage;

    document.getElementById('userInput').value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("who is pradyush")) {
        return "I am Pradyush Mohapatra, a Computer Science Engineer with expertise in IoT, Machine Learning, and Web Development.";
    } else if (lowerInput.includes("projects")) {
        return "My projects include an AI Sign Language Translator, Smart Home Automation, and an ADAS system using YOLO and Raspberry Pi.";
    } else if (lowerInput.includes("skills")) {
        return "I specialize in Python, Java, IoT systems, Machine Learning, and Web Development.";
    } else if (lowerInput.includes("contacts")) {
        return "You can reach me at pradyushmohapatra9@gmail.com or visit my LinkedIn profile.";
    } else {
        return "Please choose one of the predefined questions or ask about my projects, skills, or contact information.";
    }
}



