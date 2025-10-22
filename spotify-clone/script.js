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
  let a = await fetch(`/${folder}/`);
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]); //.split(".")[0]//Dont do this , because audio function want ".mp3" to play audio files...
    }
  }

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
}

const playMusic = (track, pause = false) => {
  currentSong.src = `/${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.innerHTML = `<!-- Pause Button -->
                <svg viewBox="0 0 48 48" width="48" height="48" class="pause-icon">
                <circle cx="24" cy="24" r="22" fill="white" />
                <g fill="black">
                <rect x="17" y="16" width="5" height="16" />
                <rect x="26" y="16" width="5" height="16" />
                </g>
                </svg>
                `;
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
  await getSongs("Songs/${folder}");
  // console.log(songs);
  playMusic(songs[0], true);

//   displayAlbums();

  Array.from(
    document.querySelector(".songsList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.innerHTML = `
            <svg viewBox="0 0 48 48" width="48" height="48" class="pause-icon">
            <circle cx="24" cy="24" r="22" fill="white" />
            <g fill="black">
            <rect x="17" y="16" width="5" height="16" />
            <rect x="26" y="16" width="5" height="16" />
            </g>
            </svg>
            `;
    } else {
      currentSong.pause();
      play.innerHTML = `<svg viewBox="0 0 48 48" class="play-icon">
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

  previous.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  next.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  document
    .querySelector(".volumecontrol")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log("Setting Volume to " + e.target.value + " / 100");
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getSongs(`Songs/${item.currentTarget.dataset.folder}`);
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
