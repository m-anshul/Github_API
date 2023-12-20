let username = document.querySelector("#basic-url");
let submit = document.querySelector("#sendId");
let display = document.querySelector("#display");
let user = 0;

const gitHubId = ({ url, username, login, avatar, followers, following, repos }) =>
    `
  <div>
    <div id = "name">${username} (@<i><a href = "${url}">${login}</a></i>)</div>
    <div id = "flex">
      <div id = "image"><img class = "img-thumbnail mx-auto" src = ${avatar}/></div>
      <div id = "details">
        <span id = "fCount">Followers: ${followers} - Following: ${following}</span>
        <br/>
        <span id = "rCount">Repos: ${repos}
      </div>
    </div>
    <br/>
    <h3>Repos List</h3>
    <hr/>
  </div>
  `;

let flag = false;
submit.addEventListener("click", function (event) {
    event.preventDefault();
    if (flag == true) {
        display.removeChild(display.children[0]);
        repolist.innerHTML = "";
    }

    user = username.value;
    flag = true;
    let request = new XMLHttpRequest();
    request.open("GET", `https://api.github.com/users/${user}`, true);
    request.send();
    request.addEventListener("load", function () {
        let posts = JSON.parse(request.responseText);
        console.log(posts);
        addToDom(posts);
    })

    let req = new XMLHttpRequest();
    req.open("GET", `https://api.github.com/users/${user}/repos`, true);
    req.send();

    req.addEventListener("load", function () {
        let elements = JSON.parse(req.responseText);
        console.log(elements);
        elements.forEach(function (element) {
            addRepos(element);
        });
    });
})

function addToDom(post) {
    let input = {
        url: post.html_url,
        username: post.name,
        login: post.login,
        avatar: post.avatar_url,
        followers: post.followers,
        following: post.following,
        repos: post.public_repos
    };

    display.insertAdjacentHTML("afterbegin", gitHubId({ ...input }));
}

// Repository List

let list = document.createElement("div");
list.setAttribute("id", "repolist")

// function reposMaker() {
//   let elements = JSON.parse(req.responseText);
//   elements.forEach(function(element) {
//     addRepos(element);
//   });
// }

function addRepos(element) {
    let button = document.createElement("button");
    button.setAttribute("class", "repobtn");
    button.classList.add("btn");
    button.classList.add("btn-info");

    let a = document.createElement("a");
    a.setAttribute("href", `${element.html_url}`);
    a.setAttribute("class", "links");
    a.innerHTML = `${element.name}`;
    button.appendChild(a);
    list.appendChild(button);
    display.insertAdjacentElement("afterend", list);
}

let body = document.querySelector("#body");
let logo = document.querySelector("#logo");
let theme = document.querySelector("#theme");

theme.addEventListener("click", function () {
    if (theme.checked) {
        logo.classList.remove("fa-moon");
        logo.classList.add("fa-sun");
        body.classList.remove("text-bg-dark");
        body.classList.add("text-bg-light");
    }
    else {
        logo.classList.remove("fa-sun");
        logo.classList.add("fa-moon");
        body.classList.remove("text-bg-light");
        body.classList.add("text-bg-dark");
    }
})