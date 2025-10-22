console.log("Lets Start JS");
let songs;
let currFolder;
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
  currFolder = folder;
  
  // Define song lists for each folder
  const songLists = {
    "Songs/english": [
      "Bones.mp3",
      "CalmDowm.mp3", 
      "Cradles.mp3",
      "Heat_Waves.mp3",
      "Mockingbird.mp3",
      "No_Lie.mp3",
      "Shape_of_You.mp3"
    ],
    "Songs/hindi": [
      "AArambh.mp3",
      "Adharam.mp3",
      "Chalisa.mp3",
      "Hum_Katha_Sunate.mp3",
      "Kaun_Hain_Voh.mp3",
      "Kruishna.mp3",
      "Narayan.mp3",
      "radhaKrish.mp3",
      "Ram_Darshan.mp3",
      "Ram_Siya.mp3",
      "Rudra.mp3",
      "shiva_maha.mp3",
      "ShivStro.mp3"
    ],
    "Songs/tamil": [
      "AppaUn.mp3",
      "Enjoy_Enjaami.mp3",
      "Jorthaale.mp3",
      "Kedi_Billa.mp3",
      "MeghamKaruka.mp3",
      "OovaruPookalume.mp3",
      "Pathala_Pathala.mp3",
      "Ponni_Nadhi.mp3",
      "PunniyamThedi.mp3",
      "Thaikelavi.mp3",
      "Thalakodum.mp3",
      "Thee_Thalapathy.mp3",
      "Theivathhuku.mp3",
      "Thenmozhi.mp3",
      "Vaa_Thalaivaa.mp3",
      "vaasamoola.mp3"
    ],
    "Songs/englishAlpha": [
      "hare-krishna.mp3",
      "hare-raama.mp3"
    ]
  };
  
  songs = songLists[folder] || [];
  console.log("Loaded songs for folder:", folder, songs);

  let songUl = document
    .querySelector(".songsList")
    .getElementsByTagName("ul")[0];
  songUl.innerHTML = "";
  for (const song of songs) {
    console.log("Rendering song:", song);
    songUl.innerHTML =
      songUl.innerHTML +
      `
             <li><img class="invert" src="Images/music.svg" alt="">
              <div class="info">
                <div>${song}</div>
                <div>Maruthu</div>
              </div>
              <div class="playnow">
                <span>Play Now</span>
                <svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="play-circle.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28px" height="28px" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path17111" inkscape:connector-curvature="0" d="M600,0C268.65,0,0,268.65,0,600c0,331.35,268.65,600,600,600 c331.35,0,600-268.65,600-600C1200,268.65,931.35,0,600,0z M600,139.16c254.499,0,460.84,206.341,460.84,460.84 S854.499,1060.84,600,1060.84S139.16,854.499,139.16,600S345.501,139.16,600,139.16z M450,300.439V899.56L900,600L450,300.439z"></path> </g></svg>
              </div>
            </li> `;
  }
  
  // Attach click listeners to the newly rendered song list items
  const songListItems = document.querySelector(".songsList").getElementsByTagName("li");
  console.log("Found song list items:", songListItems.length);
  
  Array.from(songListItems).forEach((e, index) => {
    console.log(`Attaching listener to song ${index + 1}`);
    e.addEventListener("click", (element) => {
      console.log("Song clicked!");
      const songName = e.querySelector(".info").firstElementChild.innerHTML;
      console.log("Clicked song:", songName);
      console.log("Current folder:", currFolder);
      console.log("Full path will be:", `/${currFolder}/${songName}`);
      playMusic(songName.trim());
    });
  });
}

// Function to re-attach song click listeners
function attachSongListeners() {
  const songListItems = document.querySelector(".songsList").getElementsByTagName("li");
  console.log("Re-attaching listeners to song list items:", songListItems.length);
  
  Array.from(songListItems).forEach((e, index) => {
    // Remove any existing listeners first
    e.replaceWith(e.cloneNode(true));
  });
  
  // Re-query after cloning
  const newSongListItems = document.querySelector(".songsList").getElementsByTagName("li");
  Array.from(newSongListItems).forEach((e, index) => {
    e.addEventListener("click", (element) => {
      console.log("Song clicked!");
      const songName = e.querySelector(".info").firstElementChild.innerHTML;
      console.log("Clicked song:", songName);
      console.log("Current folder:", currFolder);
      console.log("Full path will be:", `/${currFolder}/${songName}`);
      playMusic(songName.trim());
    });
  });
}

const playMusic = (track, pause = false) => {
  const audioPath = `/${currFolder}/${track}`;
  console.log("Setting audio source to:", audioPath);
  
  currentSong.src = audioPath;
  
  // Add event listeners for debugging
  currentSong.addEventListener('loadstart', () => {
    console.log('Audio loading started');
  });
  
  currentSong.addEventListener('canplay', () => {
    console.log('Audio can start playing');
  });
  
  currentSong.addEventListener('error', (e) => {
    console.error('Audio loading error:', e);
    console.error('Failed to load:', audioPath);
  });
  
  if (!pause) {
    currentSong.play().then(() => {
      console.log('Audio started playing successfully');
      play.innerHTML = `<!-- Pause Button -->
                  <svg viewBox="0 0 48 48" width="48" height="48" class="pause-icon">
                  <circle cx="24" cy="24" r="22" fill="white" />
                  <g fill="black">
                  <rect x="17" y="16" width="5" height="16" />
                  <rect x="26" y="16" width="5" height="16" />
                  </g>
                  </svg>
                  `;
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
  }
  
  document.querySelector(".songinfo").innerHTML = track;
  document.querySelector(".songtime").innerHTML = "00.00 / 00.00";
};

// async function displayAlbums() {
//   let a = await fetch(`http://192.168.1.5:5500/Songs/`);
//   let response = await a.text();
//   let div = document.createElement("div");
//   div.innerHTML = response;
//   let anchors = div.getElementsByTagName("a");
//   // console.log(anchors);
//   let cardContainer = document.querySelector(".cardContainer");
// //   let array = Array.from(anchors);
// //   for (let index = 0; index < array.length; index++) {
//     Array.from(anchors).forEach(async e =>{

    
//     // const e = array[index];
//     if (e.href.includes("/Songs")) {
//       let folder = e.href.split("/").slice(-1)[0];
//       let a = await fetch(`http://192.168.1.5:5500/Songs/${folder}/info.json`);
//       let response = await a.json();
//       cardContainer.innerHTML =
//         cardContainer.innerHTML +
//         `<div data-folder="englishAlpha" class="card"> 
//               <div class="play">
//                 <svg viewBox="0 0 24 24" width="42" height="42" fill="#1DB954">
//                   <circle
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="#1DB954"
//                     stroke-width="1.5"
//                   />
//                   <path
//                     d="M15.95 12.4c-.18.63-1.01 1.08-2.68 1.97-1.61.85-2.42 1.27-3.09 1.1a1.33 1.33 0 0 1-.71-.39C9 14.6 9 13.75 9 12s0-2.6.47-3.07c.2-.18.45-.31.71-.38.67-.18 1.48.25 3.09 1.1 1.67.88 2.5 1.34 2.68 1.96.08.26.08.53 0 .79z"
//                     fill="#000"
//                   />
//                 </svg>
//               </div>
//               <img
//                 src="/Songs/${folder}/cover.jpeg"
//                 alt="Happy Hits"
//               />
//               <h1>${response.title}</h1>
//               <p>${response.description}</p>
//             </div>`;
//     }
//   })
// }

async function main() {
  await getSongs("Songs/english");
  console.log("Loaded songs:", songs);
  if (songs.length > 0) {
    playMusic(songs[0], true); // Load first song but don't play it yet
  }
  
  // Ensure song listeners are attached
  attachSongListeners();

//   displayAlbums();

  const playButton = document.getElementById("play");
  if (!playButton) {
    console.error("Play button not found!");
    return;
  }
  
  playButton.addEventListener("click", () => {
    console.log("Play button clicked, current song paused:", currentSong.paused);
    if (currentSong.paused) {
      currentSong.play().then(() => {
        console.log("Song started playing");
        playButton.innerHTML = `
              <svg viewBox="0 0 48 48" width="48" height="48" class="pause-icon">
              <circle cx="24" cy="24" r="22" fill="white" />
              <g fill="black">
              <rect x="17" y="16" width="5" height="16" />
              <rect x="26" y="16" width="5" height="16" />
              </g>
              </svg>
              `;
      }).catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      currentSong.pause();
      console.log("Song paused");
      playButton.innerHTML = `<svg viewBox="0 0 48 48" class="play-icon">
                        <circle cx="24" cy="24" r="22" fill="white" />
                        <polygon points="20,16 32,24 20,32" fill="black" />
                      </svg>`;
    }
  });

  // currentSong.addEventListener("timeupdate", ()=>{
  //     console.log(currentSong.currentTime, currentSong.duration);
  //     document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
  // })

  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-130%";
  });

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  
  if (previousButton) {
    previousButton.addEventListener("click", () => {
      console.log("Previous button clicked");
      currentSong.pause();
      let currentTrack = currentSong.src.split("/").slice(-1)[0];
      let index = songs.indexOf(currentTrack);
      console.log("Current track:", currentTrack, "Index:", index);
      if (index - 1 >= 0) {
        playMusic(songs[index - 1]);
      }
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      console.log("Next button clicked");
      currentSong.pause();
      let currentTrack = currentSong.src.split("/").slice(-1)[0];
      let index = songs.indexOf(currentTrack);
      console.log("Current track:", currentTrack, "Index:", index);
      if (index + 1 < songs.length) {
        playMusic(songs[index + 1]);
      }
    });
  }

  document
    .querySelector(".volumecontrol")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log("Setting Volume to " + e.target.value + " / 100");
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      console.log("Card clicked:", item.currentTarget.dataset.folder);
      await getSongs(`Songs/${item.currentTarget.dataset.folder}`);
      // Re-render the song list after loading new songs
      let songUl = document
        .querySelector(".songsList")
        .getElementsByTagName("ul")[0];
      songUl.innerHTML = "";
      for (const song of songs) {
        songUl.innerHTML =
          songUl.innerHTML +
          `
             <li><img class="invert" src="Images/music.svg" alt="">
              <div class="info">
                <div>${song}</div>
                <div>Maruthu</div>
              </div>
              <div class="playnow">
                <span>Play Now</span>
                <svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="play-circle.svg" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28px" height="28px" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="path17111" inkscape:connector-curvature="0" d="M600,0C268.65,0,0,268.65,0,600c0,331.35,268.65,600,600,600 c331.35,0,600-268.65,600-600C1200,268.65,931.35,0,600,0z M600,139.16c254.499,0,460.84,206.341,460.84,460.84 S854.499,1060.84,600,1060.84S139.16,854.499,139.16,600S345.501,139.16,600,139.16z M450,300.439V899.56L900,600L450,300.439z"></path> </g></svg>
              </div>
            </li> `;
      }
      
      // Re-attach song listeners after rendering new songs
      setTimeout(() => {
        attachSongListeners();
      }, 100);
    });
  });

  document.querySelector(".volumecontrol>img").addEventListener("click", e=>{
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".volumecontrol").getElementsByTagName("input")[0].value = 0
        }else {
            e.target.src = e.target.src.replace("mute.svg" ,"volume.svg");
            currentSong.volume = 1;
            document.querySelector(".volumecontrol").getElementsByTagName("input")[0].value = 100
        }
  })
}

main();
