// INIT Github
const github = new Github();

// INIT UI
const ui = new UI();

// Search Input
const searchUser = document.querySelector("#searchUser");

// Search Input Event Listener

searchUser.addEventListener("keyup", (e) => {
  //Get Input Text
  const userText = e.target.value;
  if (userText !== "") {
    // Make HTTP call
    github.getUser(userText).then((data) => {
      if (data.profile.message === "Not Found") {
        // Show Alert
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        // Show Profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
    // Clear Profile
    ui.clearProfile();
  }
});
