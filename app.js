showNotes();

// if user adds note then store to localStorage
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function (e) {
  let addText = document.getElementById("addText");
  console.log(addText);
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(addText.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += ` 
    <div  class="noteCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">Note ${index + 1}</h5>
    <p class="card-text" id="text-inside">${element}</p>
    <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
    </div>
    </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show. Please add a note.`;
  }
}

function deleteNote(index) {
  console.log("d", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

let textInside = document.getElementById("text-inside").innerHTML;
textInside.toLowerCase();
console.log(textInside);
let search = document.getElementById("SearchBar");

search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
