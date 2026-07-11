import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore,collection,addDoc,getDocs,getDoc,doc,setDoc,updateDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";


const songNameLabel = document.getElementById("song-name-h1")
const firebaseConfig = {
    apiKey: "AIzaSyA7u2dT6s1ZBelW_oeanodY43wbz3tmC3I",
    authDomain: "music-player-d0d27.firebaseapp.com",
    projectId: "music-player-d0d27",
    storageBucket: "music-player-d0d27.firebasestorage.app",
    messagingSenderId: "83527880959",
    appId: "1:83527880959:web:74c3dcbdfb0c6224283cca",
    measurementId: "G-H1W19EVV2D"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

let snapshot = await getDocs(collection(db, "Music"))
let audio = document.createElement("audio")
let currentAudioName = ""
let currentVolume = 1;
document.body.appendChild(audio)



const currentPath = window.location.href

function spaceFuntionality(event) {
    if (event.code == "Space") {
        event.preventDefault()
    const playStopButton = document.getElementById("stop-button")
    const loopButton = document.getElementById("loop-button")

    if (audio.paused) {
            audio.play()
            playStopButton.textContent = "⏸"
        }
    else {
            audio.pause()
            playStopButton.textContent = "▶"
        }
    }
}
function addingSpaceFunctionality () {
    window.addEventListener("keydown" ,spaceFuntionality)
}
function removeSpaceFunctionality () {
    window.removeEventListener("keydown",spaceFuntionality)
}
function LFunctionality(event) {
    if (event.code == "KeyL") {
        event.preventDefault()
    const playStopButton = document.getElementById("stop-button")
    const loopButton = document.getElementById("loop-button")

    if (audio.loop) {
            audio.loop = false
            loopButton.textContent = "↻"
        }
    else {
            audio.loop = true
            loopButton.textContent = "⟲"
        }
    }
}
function addingLFunctionality () {
    window.addEventListener("keydown",LFunctionality)
}
function removeLFunctionality () {
    window.removeEventListener("keydown",LFunctionality)
}
function upButtonFunctionality() {
    const bottombar = document.getElementById("bottombar")
    const pictureDiv = document.getElementById("picture-div")
    const colorDiv = document.getElementById("color-div")
    const upButton = document.getElementById("up-button")
    const bottombarControls = document.getElementById("bottombar-controls")
    const buttonsDiv = document.getElementById("buttons-div")
    const songsContainer = document.getElementById("songs-container")
    

    let barUp = false

    upButton.onclick = () => {

        if (currentPath.includes("main.html")) {
            const dataDiv = document.getElementById("dataDiv")
            if (barUp == false) {
            pictureDiv.style.height = "80vh"
        colorDiv.style.height = "80vh"

        bottombar.style.height = "15vh"
        bottombar.style.bottom = 15

        upButton.textContent = "▼"

        barUp = true
        bottombarControls.style.marginTop = "2rem"
        dataDiv.style.bottom = "15vh"
        }
        else {
            pictureDiv.style.height = "90vh"
        colorDiv.style.height = "90vh"

        bottombar.style.height = "5vh"
        bottombar.style.bottom = 0

        upButton.textContent = "▲"

        bottombarControls.style.marginTop = "0rem"
        dataDiv.style.bottom = "5vh"

        barUp = false
        }
        }
        else if (currentPath.includes("songs.html")) {

        if (barUp == false) {
            songsContainer.style.height = "75vh"
            bottombar.style.height = "15vh"
            bottombar.style.bottom = 15
            upButton.textContent = "▼"  
            bottombarControls.style.marginTop = "2rem"
            barUp = true
            }
        
        else {
            songsContainer.style.height = "85vh"
            bottombar.style.height = "5vh"
            bottombar.style.bottom = 0
            upButton.textContent = "▲"
            bottombarControls.style.marginTop = "0rem"
            barUp = false
        }
    }
    }
}
function topbarImport () {
    const topbarContainer = document.getElementById("topbar-container")
    async function importingTopbar() {
        const response = await fetch("topbar.html")
        const html = await response.text()
        topbarContainer.innerHTML = html

        const mainButton = document.getElementById("main-button")
        const songsButton = document.getElementById("songs-button")
        const adminButton = document.getElementById("admin-button")
        const topbar = document.getElementById("topbar")

        if (currentPath.includes("main.html")) {
            mainButton.classList.add("on")
            console.log("added on")
        }
        else if (currentPath.includes("songs.html")) {
           songsButton.classList.add("on") 
           topbar.classList.add("songs")
        }
        else {
            adminButton.classList.add("on")
            const songReminder = document.createElement("h1")
            
            let totalSongs = 0
            snapshot.forEach((doc) => {
                totalSongs ++
            })
            songReminder.textContent = totalSongs
            songReminder.id = "nameLabel"
            topbar.appendChild(songReminder)
        }
        mainButton.onclick = () => {
            window.location.href ="main.html"
        }
        songsButton.onclick= () => {
            window.location.href = "songs.html"
        }
        adminButton.onclick = () => {
            window.location.href = "admin.html"
        }

    }

    importingTopbar()
}
async function loadingSongs () {
    let number = 0
    const songsContainer = document.getElementById("songs-container")
    const stopPlayButton = document.getElementById("stop-button")
    snapshot.forEach((doc) => {

        const songName = doc.data().songName
        const songUrl = doc.data().songUrl
        let songImage;
        if (doc.data().songUrl) {
                    songImage = doc.data().songImage
                }
        const imageBlur = doc.data().imageBlur

        const songDiv = document.createElement("div")
        songDiv.id = "songDiv"

        const songImageDiv = document.createElement("div")
        songImageDiv.id = "songImageDiv"

        const songNameDiv = document.createElement("div")
        songNameDiv.id = "songNameDiv"

        const songNameLabel = document.createElement("h1")
        songNameLabel.id = "songNameLabel"
        songNameLabel.textContent = songName

        const playSongButton = document.createElement("button")
        playSongButton.id = "playSongButton"
        playSongButton.textContent = "▶"

        playSongButton.onclick = () => {
            audio.src = songUrl
            audio.play()
            setSongName(songName)
            stopPlayButton.textContent = "⏸"
        }

        songDiv.appendChild(songImageDiv)
        songDiv.appendChild(songNameDiv)
        songNameDiv.appendChild(songNameLabel)
        songNameDiv.appendChild(playSongButton)

        songsContainer.appendChild(songDiv)
        console.log(`added Song ${songName}`)

        if (songImage == null || songImage === "undefined") {
            songImageDiv.style.setProperty(
                "--bg-image","url(https://w0.peakpx.com/wallpaper/327/1001/HD-wallpaper-music-alone-badboy-cartoon-iphone-love-music-on-night-pubg-thumbnail.jpg)"
            )
            console.log("It aint Null")
        }
        else {
            songImageDiv.style.setProperty(
                "--bg-image",`url(${songImage})`
            )
        }
    })
    console.log(number)
}
function savingAudioDetails () {
    window.addEventListener("beforeunload", (event) => {
        const audioURL = audio.src
        const looped = audio.looped
        const audioName = currentAudioName
        const volume = currentVolume
        const time = audio.currentTime

        const data = {
            songName : audioName,
            songUrl : audioURL,
            songLooping : audio.loop,
            songVolume : audio.volume,
            songTime : time
        }
        localStorage.setItem("songDetails", JSON.stringify(data));

    })
    
}
function setSongName(event) {
    currentAudioName = event
    songNameLabel.textContent = event

}
function loadingSavedSongs () {
    const raw = localStorage.getItem("songDetails")
    if (!raw) return

    const songs = JSON.parse(raw)

    if (!songs) return;

    audio.src = songs.songUrl
    setSongName(songs.songName)
    audio.volume = songs.songVolume
    audio.currentTime = songs.songTime
    audio.loop = songs.songLooping
}
function bottombarButtons () {
    const playStopButton = document.getElementById("stop-button")
    const loopButton = document.getElementById("loop-button")

    if (!audio.paused) {
        playStopButton.textContent = "⏸"
    }
    else {
        playStopButton.textContent = "▶"
    }
    if (audio.loop) {
        loopButton.textContent = "⟲"
    }
    else {
        loopButton.textContent = "↻"
    }

    playStopButton.onclick = () => {
        if (audio.paused) {
            audio.play()
            playStopButton.textContent = "⏸"
        }
        else {
            audio.pause()
            playStopButton.textContent = "▶"
        }
    }
    loopButton.onclick = () => {
        if (audio.loop) {
            audio.loop = false
        loopButton.textContent = "↻"
        }
        else {
            audio.loop = true
            loopButton.textContent = "⟲"
        }
        
    }
}
function barsFunctionality () {
    
    const progressBar = document.getElementById("progress-bar");

    audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;
    volumebar.value = audio.volume * 100
})
    const volumebar = document.getElementById("volume-bar")
    volumebar.addEventListener("input", ()=> {
        audio.volume = volumebar.value /100
    })
    audio.addEventListener("timeupdate", () => {
        progressBar.value = audio.currentTime;
    });
    progressBar.addEventListener("input", () => {
        audio.currentTime = progressBar.value;
    });
}
function searchFunctionality () {
    const searchbar = document.getElementById("searchbar")
    const searchButton = document.getElementById("searchbar-button")
    const songsContainer = document.getElementById("songs-container")
    const stopPlayButton = document.getElementById("stop-button")


    searchButton.onclick = () => {
        const searched = searchbar.value
        songsContainer.innerHTML = ""

        snapshot.forEach((snap) => {
            if (snap.data().songName.toLowerCase().includes(searched.toLowerCase())) {
        const songName = snap.data().songName
        const songUrl = snap.data().songUrl
        const songImage = snap.data().songImage
        const imageBlur = snap.data().imageBlur

        const songDiv = document.createElement("div")
        songDiv.id = "songDiv"

        const songImageDiv = document.createElement("div")
        songImageDiv.id = "songImageDiv"

        const songNameDiv = document.createElement("div")
        songNameDiv.id = "songNameDiv"

        const songNameLabel = document.createElement("h1")
        songNameLabel.id = "songNameLabel"
        songNameLabel.textContent = songName

        const playSongButton = document.createElement("button")
        playSongButton.id = "playSongButton"
        playSongButton.textContent = "▶"

        playSongButton.onclick = () => {
            audio.src = songUrl
            audio.play()
            setSongName(songName)
            stopPlayButton.textContent = "⏸"
        }

        songDiv.appendChild(songImageDiv)
        songDiv.appendChild(songNameDiv)
        songNameDiv.appendChild(songNameLabel)
        songNameDiv.appendChild(playSongButton)

        songsContainer.appendChild(songDiv)
        console.log(`added Song ${songName}`)

        if (songImage == null || songImage === "undefined") {
            songImageDiv.style.setProperty(
                "--bg-image","url(https://w0.peakpx.com/wallpaper/327/1001/HD-wallpaper-music-alone-badboy-cartoon-iphone-love-music-on-night-pubg-thumbnail.jpg)"
            )
            console.log("It aint Null")
        }
        else {
            songImageDiv.style.setProperty(
                "--bg-image",`url(${songImage})`
            )
        }
            }
        })
    }
    searchbar.addEventListener("focusin", () => {
        removeSpaceFunctionality()
        removeLFunctionality()
    })
    searchbar.addEventListener("focusout", () => {
        addingLFunctionality()
        addingSpaceFunctionality()
    })
    searchbar.addEventListener("keydown", (event) => {
        if (event.code == "Enter") {
            searchButton.click()
        }
    })
}
function mainSongMetadata () {
    const colorDiv = document.getElementById("color-div")
    const bottombarH1 = document.getElementById("song-name-h1")
    const pictureDiv = document.getElementById("picture-div")

    audio.addEventListener("loadedmetadata", () => {

        let songImage

        snapshot.forEach((doc) => {
            if (audio.src == doc.data().songUrl) {
                if (doc.data().songUrl) {
                    songImage = doc.data().songImage
                }
            }
        }) 

        const dataDiv = document.createElement("div")
        dataDiv.id = "dataDiv"

        const picDiv = document.createElement("div")
        picDiv.id = "songImageDiv"

        const nameDiv = document.createElement("div")
        nameDiv.id = "songNameDiv"

        const nameLabel = document.createElement("h1")
        nameLabel.id = "songNameLabel"

        const labeled = bottombarH1.textContent
        nameLabel.textContent = labeled

        dataDiv.appendChild(picDiv)
        dataDiv.appendChild(nameDiv)
        nameDiv.appendChild(nameLabel)
        
        document.body.appendChild(dataDiv)

        if (songImage == null || songImage === "undefined") {
            picDiv.style.setProperty(
                "--bg-image","url(https://w0.peakpx.com/wallpaper/327/1001/HD-wallpaper-music-alone-badboy-cartoon-iphone-love-music-on-night-pubg-thumbnail.jpg)")
                console.log("the image was null")
        }
        else {
            picDiv.style.setProperty(
                "--bg-image",`url(${songImage})`
            )
            pictureDiv.style.setProperty(
                "--bg-pictureImage",`url(${songImage})`
            )
        }
    })
}
async function addingSongs () {
    const nameInput = document.getElementById("admin-name-input")
    const urlInput = document.getElementById("admin-url-input")
    const imageInput = document.getElementById("admin-image-input")
    const confirmButton = document.getElementById("admin-confirm-button")
    
    confirmButton.onclick = () => {

            const songNamed = nameInput.value
    const songUrld = urlInput.value
    const songImaged  = imageInput.value

    async function imageNull () {
        const docRef = await addDoc(collection(db,"Music"), {
            songName : songNamed,
            songUrl : songUrld,
        })
        window.location.href = "main."
    }
    async function imaged () {
        const docRef = await addDoc(collection(db,"Music"), {
            songName : songNamed,
            songUrl : songUrld,
            songImage : songImaged
        })
        window.location.href = "main.html"
    }

        if (!songImaged) {
            imageNull()
        }
        else {
            imaged()
        }
    }
}
async function editingSongs () {
    const editSongsDiv = document.getElementById("edit-songs-div")

    snapshot.forEach((doc) => {

        const songName = doc.data().songName
        const songImaged = doc.data().songImage

        const listDiv = document.createElement("div")
        listDiv.id = "listDiv"

        const listImage = document.createElement("div")
        listImage.id = "listImage"

        const nameLabel = document.createElement("h1")
        nameLabel.id = "nameLabel"

        const editButton = document.createElement("button")
        editButton.id = "edit-button"
        editButton.textContent = "Edit"

        editButton.onclick = () => {
            changingToEditPage(songName)
        }

        nameLabel.textContent = songName
        if (!songImaged || songImaged == null || songImaged == "undefined") {
            listImage.style.backgroundImage = `url("https://w0.peakpx.com/wallpaper/327/1001/HD-wallpaper-music-alone-badboy-cartoon-iphone-love-music-on-night-pubg-thumbnail.jpg")`
        }
        else {
            listImage.style.backgroundImage = `url("${songImaged}")`
        }

        listDiv.appendChild(listImage)
        listDiv.appendChild(nameLabel)
        listDiv.appendChild(editButton)
        editSongsDiv.appendChild(listDiv)

    })
}
async function changingToEditPage (event) {
    localStorage.setItem("editName",event)
    window.location.href = "edit.html"
}
async function changingSongProperties () {
    const goBackButton = document.getElementById("go-back-button")
    goBackButton.onclick = () => {
        window.location.href = "index.html"
    }

    const songNameInput = document.getElementById("edit-name-input")
    const songUrlInput = document.getElementById("edit-url-input")
    const songImageInput = document.getElementById("edit-image-input")

    const confirmButton = document.getElementById("edit-confirm-button")
    const savedName = localStorage.getItem("editName")
    let docRef

    snapshot.forEach((songdoc) => {
        
        if (songdoc.data().songName === savedName) {
            songNameInput.value = songdoc.data().songName
            songUrlInput.value = songdoc.data().songUrl
            songImageInput.value = songdoc.data().songImage

            docRef = doc(db,"Music", songdoc.id)
        }
    })
    async function saving() {
        await updateDoc(docRef, {
            songName : songNameInput.value,
            songUrl : songUrlInput.value,
            songImage : songImageInput.value
        })
        window.location.href = "index.html"
    }
    confirmButton.onclick = () => {
        saving()
    }
}
function adminSearch() {
    const searchbar = document.getElementById("admin-search-input")
    const searchbutton = document.getElementById("admin-search-button")
    const editSongsDiv = document.getElementById("edit-songs-div")

    searchbar.addEventListener("keydown", (event) => {
        if (event.code == "Enter") {
            searchbutton.click()
        }
    })

    searchbutton.onclick = () => {
        const searchVariable = searchbar.value
        editSongsDiv.innerHTML = ""

        snapshot.forEach((doc) => {
            const requestedSearchVariable = doc.data().songName

            if (requestedSearchVariable.toLowerCase().includes(searchVariable.toLowerCase())) {
                const songName = doc.data().songName
        const songImaged = doc.data().songImage

        const listDiv = document.createElement("div")
        listDiv.id = "listDiv"

        const listImage = document.createElement("div")
        listImage.id = "listImage"

        const nameLabel = document.createElement("h1")
        nameLabel.id = "nameLabel"

        const editButton = document.createElement("button")
        editButton.id = "edit-button"
        editButton.textContent = "Edit"

        editButton.onclick = () => {
            changingToEditPage(songName)
        }

        nameLabel.textContent = songName
        if (!songImaged || songImaged == null || songImaged == "undefined") {
            listImage.style.backgroundImage = `url("https://w0.peakpx.com/wallpaper/327/1001/HD-wallpaper-music-alone-badboy-cartoon-iphone-love-music-on-night-pubg-thumbnail.jpg")`
        }
        else {
            listImage.style.backgroundImage = `url("${songImaged}")`
        }

        listDiv.appendChild(listImage)
        listDiv.appendChild(nameLabel)
        listDiv.appendChild(editButton)
        editSongsDiv.appendChild(listDiv)
            }
        })
    }

}

if (!currentPath.includes("edit.html")  ) {
    topbarImport()
}

if (currentPath.includes("main.html")){
    upButtonFunctionality()
    console.log("something")
    loadingSavedSongs()
    savingAudioDetails()
    bottombarButtons()
    addingSpaceFunctionality()
    addingLFunctionality()
    barsFunctionality()
    mainSongMetadata()
}
else if (currentPath.includes("songs.html")) {
    const songsContainer = document.getElementById("songs-container")
    const bottombarControls = document.getElementById("bottombar-controls")
    const buttonsDiv = document.getElementById("buttons-div")

    loadingSavedSongs()
    savingAudioDetails()
    bottombarButtons()
    addingSpaceFunctionality()
    addingLFunctionality()
    upButtonFunctionality()
    barsFunctionality()
    searchFunctionality()

    await loadingSongs()
}
else if (currentPath.includes("admin.html")) {
    await addingSongs()
    await editingSongs()
    adminSearch()
}
else if (currentPath.includes("edit.html")) {
    changingSongProperties()
}