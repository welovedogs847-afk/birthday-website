function openSurprise() {
  document.getElementById("opening").classList.remove("active");
  document.getElementById("password").classList.add("active");
}

function unlockWebsite() {
  const code = document.getElementById("secretCode").value.trim();
  const error = document.getElementById("error");

  if (code === "123456") {
    document.getElementById("password").classList.remove("active");
    document.getElementById("memories").classList.add("active");
  } else {
    error.textContent = "Wrong code ❤️ Try again!";
  }
}

/* =========================
   MEMORY BALLOONS
========================= */
/* =========================
   MEMORY BALLOONS
========================= */

function popBalloon(balloon, message) {
  // 1. Phutne ka animation trigger karein
  balloon.classList.add("popping");

  // 2. Animation complete hote hi balloon ko completely hide rakhein
  setTimeout(function () {
    balloon.style.display = "none";
  }, 280);

  // 3. Niche ka message reveal karein (purane balloon se nikalte hue)
  const memoryMessage = document.getElementById("memoryMessage");
  if (memoryMessage) {
    memoryMessage.classList.remove("show");

    setTimeout(function () {
      memoryMessage.textContent = message;
      memoryMessage.classList.add("show");
    }, 150);
  }
}


function openGallery() {
  document.getElementById("memories").classList.remove("active");
  document.getElementById("gallery").classList.add("active");
}
/* =========================
   LETTERS FOR YOU
========================= */

function openLetter(number) {

  const box = document.getElementById("letterBox");
  const title = document.getElementById("letterTitle");
  const text = document.getElementById("letterText");
  const icon = document.getElementById("letterIcon");

  if (number === 1) {
    icon.textContent = "💌";
    title.textContent = "For You ❤️";
    text.textContent =
      "You are one of the most special person in my life. " +
      "I hope this little surprise makes your birthday a little more beautiful.";
  }

  if (number === 2) {
    icon.textContent = "💕";
    title.textContent = "About You";
    text.textContent =
      "There is something about you that makes ordinary moments feel special. " +
      "Your smile, your presence and the little things you do mean a lot to me.";
  }

  if (number === 3) {
    icon.textContent = "🌹";
    title.textContent = "A Little Note";
    text.textContent =
      "On your special day, I just want you to know that you deserve happiness, " +
      "beautiful memories and lots of reasons to smile. Happy Birthday ❤️";
  }

  box.classList.remove("hidden");
}


function closeLetter() {

  const box = document.getElementById("letterBox");

  box.classList.add("hidden");

}
function showSection(sectionId) {
  document.querySelectorAll(".screen").forEach(function(section) {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");
}
/* =========================
   OUR SONG
========================= */

// Function to format seconds into mm:ss
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" : "") + secs;
}

document.addEventListener("DOMContentLoaded", function() {
  const audio = document.getElementById("myAudio");
  const timer = document.getElementById("songTimer");

  if (audio && timer) {
    audio.addEventListener("loadedmetadata", function() {
      timer.textContent = "0:00 / " + formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", function() {
      timer.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
    });
  }
});

// Play / Pause Toggle Function
function playSong() {
  const audio = document.getElementById("myAudio");
  const playBtn = document.getElementById("playBtn");
  const message = document.getElementById("songMessage");
  const timer = document.getElementById("songTimer");

  if (!audio) {
    console.error("Audio element not found!");
    return;
  }

  if (audio.paused) {
    audio.play().then(() => {
      if (playBtn) playBtn.innerHTML = "⏸️ Pause Song";
      if (message) message.textContent = "Playing our song... ❤️🎵";
    }).catch(err => {
      console.error("Playback error:", err);
    });
  } else {
    audio.pause();
    if (playBtn) playBtn.innerHTML = "▶️ Play Song";
    if (message) message.textContent = "Song paused ⏸️";
  }

  audio.onended = function() {
    if (playBtn) playBtn.innerHTML = "▶️ Play Song";
    if (message) message.textContent = "This song will always remind me of you ❤️🎵";
    if (timer) timer.textContent = "0:00 / " + formatTime(audio.duration);
  };
}

/* =========================
   MYSTERY GIFT
========================= */

function openGift() {
  const gift = document.querySelector(".gift-box");
  const message = document.getElementById("giftMessage");
  const continueButton = document.getElementById("giftContinue");

  gift.classList.add("opened");

  message.textContent = "A little surprise, made especially for you ❤️✨";

  continueButton.classList.remove("hidden");
}
/* =========================
   CATCH MY HEART
========================= */

/* =========================
   CATCH MY HEART
========================= */

let heartMoveInterval = null;
let isHeartCaught = false;

// Sabhi hearts ko randomly box ke andar ghumane ka function
function moveAllHearts() {
  if (isHeartCaught) return;

  const hearts = document.querySelectorAll(".flying-heart:not(.disappear)");

  hearts.forEach(heart => {
    // 15% se 85% ke andar random coordinate taaki box se bahar na jaye
    const randomX = Math.floor(Math.random() * 70) + 15;
    const randomY = Math.floor(Math.random() * 70) + 15;

    heart.style.left = `${randomX}%`;
    heart.style.top = `${randomY}%`;
  });
}

// 850ms ke interval me lagatar random jagah move hote rahenge
if (heartMoveInterval) clearInterval(heartMoveInterval);
heartMoveInterval = setInterval(moveAllHearts, 850);

// Fake Hearts ko touch karne par gayab hone ka function
function catchFakeHeart(btn) {
  if (isHeartCaught) return;

  btn.classList.add("disappear");

  const message = document.getElementById("heartMessage");
  if (message) {
    message.textContent = "This is not my heart 💔";
  }
}

// Original Red Heart Catch Logic
function catchHeart() {
  isHeartCaught = true;
  clearInterval(heartMoveInterval); // Movement stop

  const heart = document.getElementById("flyingHeart");
  const message = document.getElementById("heartMessage");
  const continueButton = document.getElementById("heartContinue");

  if (heart) {
    heart.style.left = "50%";
    heart.style.top = "50%";
  }

  setTimeout(function () {
    if (message) {
      message.textContent =
        "You caught my heart... and you have had it all along ❤️";
    }

    if (heart) heart.textContent = "💖";
    if (continueButton) continueButton.classList.remove("hidden");
  }, 300);
}


// Main Red Heart pakadne ka function
function catchHeart() {
  isHeartCaught = true;
  clearInterval(heartMoveInterval);

  const heart = document.getElementById("flyingHeart");
  const message = document.getElementById("heartMessage");
  const continueButton = document.getElementById("heartContinue");

  if (heart) {
    heart.style.left = "50%";
    heart.style.top = "50%";
  }

  setTimeout(function () {
    if (message) {
      message.textContent =
        "You caught my heart... and you have had it all along ❤️";
    }

    if (heart) heart.textContent = "💖";
    if (continueButton) continueButton.classList.remove("hidden");
  }, 300);
}


/* =========================
   HEARTS COLLECTION
========================= */

function collectHeart(number) {

  const message = document.getElementById("collectionMessage");

  if (number === 1) {
    message.textContent = "❤️ My love for you is always special.";
  }

  if (number === 2) {
    message.textContent = "💕 I will always care about the little things.";
  }

  if (number === 3) {
    message.textContent = "💖 Your happiness means a lot to me.";
  }

  if (number === 4) {
    message.textContent = "💗 Every memory with you is precious.";
  }
}
/* =========================
   OUR MOVIE
========================= */

function playMovie() {
  const video = document.getElementById("myMovieVideo");
  const posterContent = document.getElementById("posterContent");
  const moviePoster = document.getElementById("moviePoster");
  const playBtn = document.getElementById("playMovieBtn");
  const message = document.getElementById("movieMessage");

  if (!video) return;

  // 1. Agar video abhi hidden hai, to pehle use display karein aur poster hatayein
  if (video.classList.contains("hidden")) {
    video.classList.remove("hidden");
    if (posterContent) posterContent.style.display = "none";
    if (moviePoster) moviePoster.style.padding = "0"; // Video full fit hone ke liye
  }

  // 2. Play / Pause logic
  if (video.paused) {
    // Mobile sound policy fix: pehle unmute try karega, agar block hua to safely handle karega
    video.muted = false;
    
    video.play()
      .then(() => {
        if (playBtn) playBtn.innerHTML = "⏸️ Pause Movie";
        if (message) message.textContent = "Every moment with you deserves its own little movie. 🎬❤️";
      })
      .catch((err) => {
        console.warn("Audio autoplay blocked by mobile policy, playing muted:", err);
        video.muted = true; // Fallback muted play
        video.play();
        if (playBtn) playBtn.innerHTML = "⏸️ Pause Movie";
        if (message) message.textContent = "Every moment with you deserves its own little movie. 🎬❤️";
      });
  } else {
    video.pause();
    if (playBtn) playBtn.innerHTML = "▶️ Play Our Movie";
    if (message) message.textContent = "Movie paused ⏸️";
  }

  // Controls tap sync
  video.onpause = function () {
    if (playBtn) playBtn.innerHTML = "▶️ Play Our Movie";
  };

  video.onplay = function () {
    if (playBtn) playBtn.innerHTML = "⏸️ Pause Movie";
  };

  video.onended = function () {
    if (playBtn) playBtn.innerHTML = "▶️ Replay Movie";
    if (message) message.textContent = "Our story will always continue... ❤️✨";
  };
}



/* =========================
   MAKE A WISH
========================= */

function makeWish() {

  const star = document.getElementById("wishStar");
  const message = document.getElementById("wishMessage");
  const continueButton = document.getElementById("wishContinue");

  star.classList.add("wished");

  message.textContent =
    "May your wish come true, and may your life always be filled with happiness. ✨❤️";

  continueButton.classList.remove("hidden");
}

/* =========================
   ONE LAST SURPRISE
========================= */

function revealSurprise() {

  const lock = document.getElementById("surpriseLock");
  const message = document.getElementById("surpriseMessage");
  const continueButton = document.getElementById("finalContinue");

  lock.textContent = "💝";
  lock.classList.add("revealed");

  message.textContent =
    "The biggest surprise is simply this... I'm grateful that you're part of my story. ❤️";

  continueButton.classList.remove("hidden");
}