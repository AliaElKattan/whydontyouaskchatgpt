
// "Seek out news from sources you find trustworthy and credible. Local reporting varies based on where you are, but some examples are <a href='https://themarkup.org/' target='_blank'>The Markup</a>, <a href='https://www.404media.co/' target='_blank'>404 Media</a>, <a href='https://theintercept.com/'>The Intercept</a>, or <a href='http://dropsitenews.com/' target='_blank'>Dropsite News</a>. Even college newsrooms can be better than what I tell you."

const buttonData = {
  1: {
    question: "Personal advice",
    answer: "Have you tried speaking to a friend, family member, or other community member? If more pressing, have you tried consulting a licensed professional? Or perhaps, maybe this is something you need to think about long and hard on your own. A journal could help."
  },
  2: {
    question: "Food recipe",
    answer: "I can give you the average of all the recipes people posted on the internet, or you can go read or watch them yourself directly, and support the people actually helping you cook."
  },
  3: {
    question: "Read the news",
    answer: 'Seek out news from sources you find trustworthy and credible. Local reporting varies based on where you are, but some examples are The Markup, 404 Media, The Intercept, or Dropsite News. Even college newsrooms can be better than what I tell you.'
  },
  4: {
    question: "Weather forecast",
    answer: "Chatbots cannot tell you the weather. Look up the actual weather forecast."
  },
    5: {
    question: "Music recs",
    answer: "Music discovery is a beautiful journey in on and of itself. Ask your friends what they've been enjoying lately, find other fans' favorites on Rate Your Music or Album of the Year, read a music blog, or ask the barista what song is playing. When in doubt, show up to a record store and explore!"
  },
    6: {
    question: "What to watch",
    answer: "Movie and TV show recommendations can be sought from your friends and folks in your community, from other people's reviews such as on apps like Letterboxd, from the abundance of film review blogs on the internet, or simply by checking your nearest movie theatre."
  },
    7: {
    question: "Write a story",
    answer: "A great way to use your imagination. You can start by thinking of things in your head, writing them down, and then editing. You can even get advice from a few friends on what works and what doesn't!"
  },
    8: {
    question: "Coding help",
    answer: "Coding can be very difficult at times! Great resources include Stack Overflow and a million other sites on the internet, aggregating the collective knowledge, expertise, and continuous growth of millions of coders around the world."
  },
    9: {
    question: "Write a letter",
    answer: "Letter writing is meaningful and important for many purposes. I recommend finding a pen and paper, freeing up some time, and thinking carefully about what you want to say in your own voice."
  },
    10: {
    question: "Design a logo",
    answer: "Great idea! Have you tried hiring an artist, or using free design tools like Gimp, Inkspace, or Excalidraw?"
  }
};

// const menuContainer = document.querySelector(".menu");
const allButtonKeys = Object.keys(buttonData);
let shownButtons = [];
const visibleCount = 3;

// Helper function
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


// Render buttons
function renderButtons() {
  const menuContainer = document.getElementsByClassName("menu")[0];
  menuContainer.innerHTML = "";

  // Reset if all buttons have been shown
  if (shownButtons.length === allButtonKeys.length) {
    shownButtons = [];
  }

  const remainingButtons = allButtonKeys.filter(key => !shownButtons.includes(key));
  const buttonsToShow = [];

  while (buttonsToShow.length < visibleCount) {
    const key = getRandomElement(remainingButtons);
    if (!buttonsToShow.includes(key)) {
      buttonsToShow.push(key);
      shownButtons.push(key);
    }
  }

  buttonsToShow.forEach(key => {
    const btn = document.createElement("button");
    btn.className = "menu-option";
    btn.dataset.key = key;
    btn.textContent = buttonData[key].question;

    // btn.addEventListener("click", () => handleClick(key, btn));

    btn.onclick = (e) => handleClick(e.currentTarget.dataset.key, e.currentTarget);

    menuContainer.appendChild(btn);
  });
}


function handleClick(key, btnElement) {

  let newKey = '';

  console.log("key: ",key);
  console.log("btnElement: ", btnElement);

  if (!shownButtons.includes(key)) {
    shownButtons.push(key);
  }

  // Display chat log
  const chat_log = document.getElementById("chat-log");
  const intro = document.getElementsByClassName("intro")[0];
  const title = document.getElementsByClassName("title")[2];
  const container = document.getElementsByClassName("container")[0];

  chat_log.style.display = "inline-block";
  intro.classList.add("answer");
  container.classList.add("active");
  if (title) title.classList.add("hide-title");

  const data = buttonData[key];
  if (!data) return;

  const chatResponse = document.createElement("div");
  chatResponse.className = "chat-response active";

  const questionDiv = document.createElement("div");
  questionDiv.className = "chat-question";
  questionDiv.innerHTML = data.question;

  const answerDiv = document.createElement("div");
  answerDiv.className = "chat-answer";

  chatResponse.appendChild(questionDiv);
  chatResponse.appendChild(answerDiv);

  chat_log.appendChild(chatResponse);

  typeText(answerDiv, data.answer, 25);

  // Replace clicked button
  const remainingButtons = allButtonKeys.filter(k => !shownButtons.includes(k));

  if (remainingButtons.length === 0) {
    // Reset if all buttons shown
    shownButtons = [];
    renderButtons();
    return;
  }

  newKey = getRandomElement(remainingButtons);
  // shownButtons.push(newKey);

  btnElement.dataset.key = newKey;
  btnElement.textContent = buttonData[newKey].question;
  console.log("newKey: ", newKey);
  console.log("btnElement: ", btnElement);  

  btnElement.onclick = (e) => {
    handleClick(e.currentTarget.dataset.key, e.currentTarget);
};


  // btnElement.onclick = () => handleClick(newKey, btnElement);
}


function typeText(element, text, speed = 30) {
  element.innerHTML = "";
  let index = 0;

  const interval = setInterval(() => {
    element.innerHTML += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}


 // Grab the dropdown elements
const moreToggle = document.getElementById("more-toggle");
const moreDropdown = document.getElementById("more-dropdown");

// Toggle the dropdown visibility
moreToggle.addEventListener("click", () => {
  moreDropdown.style.display = moreDropdown.style.display === "none" ? "block" : "none";
});

// Populate the dropdown with all buttons
function renderMoreDropdown() {
  moreDropdown.innerHTML = "";

  allButtonKeys.forEach(key => {
    const btn = document.createElement("button");
    btn.textContent = buttonData[key].question;
    btn.dataset.key = key;

    // btn.addEventListener("click", () => {
    //   handleClick(key, btn); // reuse main handleClick
    // });

    btn.onclick = (e) => handleClick(e.currentTarget.dataset.key, e.currentTarget);



    moreDropdown.appendChild(btn);
  });
}

renderButtons();
renderMoreDropdown();
