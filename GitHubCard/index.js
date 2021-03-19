import axios from 'axios';
import { gsap } from "gsap";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

let cardsDiv = document.querySelector('.cards');
axios.get('https://api.github.com/users/LambSarah')
    .then(response => {
        let myInfo = response.data;
        let myCard = cardMaker(myInfo);
        cardsDiv.appendChild(myCard);
    })
    .catch(error => console.log(error));

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/


/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
    
    /* Instead of manually creating a list of followers, do it programmatically. Create a function that requests the followers data from the API after it has received your data and create a card for each of your followers. Hint: you can chain promises.*/

axios.get('https://api.github.com/users/LambSarah/following')
    .then(response => {
        let followers = response.data;
        followers.forEach((follower) => {
            axios.get(`https://api.github.com/users/${follower.login}`)
                .then(response => {
                    let followerData = response.data;
                    let newCard = cardMaker(followerData);
                    cardsDiv.appendChild(newCard);
                    //     let cards = document.getElementsByClassName('card-info');
                    //               console.log(cards);
                    //             let cardArray = Array.from(cards);
                    //           cardArray.forEach((card) => {
                    //                 let expBtn = document.g
                    //               console.log(expBtn);
                    //             expBtn.setEventListener("click", (event) => {

                    //           });
                })
                .catch(error => console.log(error));
        });
    })
    .catch(err => {
        console.log(err);
    })

/*const followersArray =
    'mstolley',
    'hex337',
    'torvalds',
    'lordshivering',
    'Wilo',
    'andrewrk',
    'LaPingvino',
    'malcolmstill',
    'LinkFly',
    'jukamonk',
    'ritschmaster'
];
*/
/*followersArray.forEach((follower) => {
    axios.get(`https://api.github.com/users/${follower}`)
        .then(res => {
            let newCard = cardMaker(res.data);
            cardsDiv.append(newCard);
        })
        .catch(err => {
            console.log(err);
        });
});
*/
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
let index = 1;

function cardMaker({ avatar_url, name, login, location, html_url, followers, following, bio, public_repos, following_url }) {
    let newCard = document.createElement('div');
    newCard.classList.add('card');

    let userImg = document.createElement('img');
    userImg.src = avatar_url;
    newCard.prepend(userImg);

    let cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');
    newCard.appendChild(cardInfo);

    let userName = document.createElement('h3');
    userName.classList.add('name');
    userName.textContent = name;
    cardInfo.appendChild(userName);

    let userUserName = document.createElement('p');
    userUserName.classList.add('username');
    userUserName.textContent = login;
    cardInfo.appendChild(userUserName);

    let userLocation = document.createElement('p');
    userLocation.textContent = location;
    cardInfo.appendChild(userLocation);

    let userGithubUrl = document.createElement('a');
    userGithubUrl.href = `${html_url}`;
    userGithubUrl.textContent = html_url;

    let userProfile = document.createElement('p');
    //userProfile.textContent = `Profile: ${userGithubUrl}`;
    userProfile.innerHTML = `Profile: ${userGithubUrl}`;
    cardInfo.appendChild(userProfile);

    let userFollowers = document.createElement('p');
    userFollowers.textContent = `Followers: ${followers}`;
    cardInfo.appendChild(userFollowers);

    let userFollowing = document.createElement('p');
    userFollowing.textContent = `Following: ${following}`;
    cardInfo.appendChild(userFollowing);

    let userBio = document.createElement('p');
    userBio.textContent = bio;
    cardInfo.appendChild(userBio);
    newCard.id = index;
    index++;

    let userPublicRepos = document.createElement('p');
    userPublicRepos.classList.add('retracted');
    userPublicRepos.textContent = `Public Repositories:${public_repos}`;
    cardInfo.appendChild(userPublicRepos);

    let followingUrl = document.createElement('p');
    followingUrl.classList.add('retracted');
    followingUrl.textContent = `See who I'm following: `;
    let link = document.createElement('a');
    link.href = `${html_url}?tab=following`;
    link.textContent = `${login} follows`;
    followingUrl.appendChild(link);
    cardInfo.appendChild(followingUrl);

    let followersUrl = document.createElement('p');
    followersUrl.classList.add('retracted');
    followersUrl.textContent = 'See my followers: ';
    let followerLink = document.createElement('a');
    followerLink.href = `${html_url}?tab=followers`;
    followerLink.textContent = 'My followers';
    followersUrl.appendChild(followerLink);
    cardInfo.appendChild(followersUrl);




    let expandButton = document.createElement('button');
    expandButton.classList.add('btn');
    expandButton.textContent = '+';
    expandButton.addEventListener('click', (e) => {
        newCard.classList.toggle('card--open');
        let anim = gsap.to(newCard, {
            duration: 1,
            ease: "expo",
            x: 150,
            y: -200,
            height: 750,
        });
        anim.play();
        expandButton.textContent = '-';
        userPublicRepos.classList.remove('retracted');
        followingUrl.classList.remove('retracted');
        followersUrl.classList.remove("retracted");

        userPublicRepos.classList.add('expanded');
        expandButton.addEventListener('click', (e) => {
            anim.reverse();
            expandButton.textContent = "+";
            userPublicRepos.classList.add('retracted');
            followingUrl.classList.add('retracted');
            followersUrl.classList.add('retracted');
        });
    });
    cardInfo.appendChild(expandButton);

    return newCard;

}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

/* Look into adding more info as an expanding card. You will need to create some new CSS and a button that expands and contracts the card. */