const searchButton = document.getElementById('search-btn');
const usernameInput = document.getElementById('username');
const userSection = document.getElementById('user-section');
const reposSection = document.getElementById('repos-section');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const nextButton1 = document.getElementById('currentPage');


document.getElementById('prev-btn').style.display = 'none';
document.getElementById('next-btn').style.display = 'none';
document.getElementById('currentPage').style.display='none';
let currentPage = 1;
const itemsPerPage = 10;
prevButton.disabled=true; 
searchButton.addEventListener("click",()=>{
    console.log(usernameInput.value);
    
    if(usernameInput.value.trim()!=""){
      fetchUserInfo(usernameInput.value.trim());
      fetchReposPage(usernameInput.value.trim(),currentPage);
    }
    if (usernameInput.value) {
      document.getElementById('prev-btn').style.display = 'inline-block';
      document.getElementById('next-btn').style.display = 'inline-block';
      document.getElementById('currentPage').style.display='inline';
      currentPage.innerHTML= currentPage;
  } else {
      document.getElementById('prev-btn').style.display = 'none';
      document.getElementById('next-btn').style.display = 'none';
  }

})

async function  fetchUserInfo(username){
  
     fetch(`https://api.github.com/users/${username}`)
     .then(response=>response.json())
     .then(user=>{
      const data=
      `<img src=${user.avatar_url} alt=Avatar.png class="avatar"/>
      <h2>${user.name}</h2>
      <p>${user.bio || 'No bio available'}</p>
      <p><img src="./image.png" class="location"/> ${user.location||'Not Available '}</p>
      <p><img src="./image3.png" class="location"/> ${user.html_url}</p>
      <span class="Twitter" >
      <img src="./image1.png" class="location"/> ${user.twitter_username||'Not Available'}
      
      </span >
      `;
      userSection.innerHTML=data;
     })
     .catch(error => console.error('Error fetching user:', error));


}


async function fetchReposPage(username,page){
  

   fetch(`https://api.github.com/users/${username}/repos?per_page=${itemsPerPage}&page=${page}`)
   .then(response=>response.json())
   .then(repos=>{
     document.getElementById('nextBtn');
            if (repos.length === 0) {
              nextButton.disabled = true;
            } else {
              nextButton.disabled = false;
            }

            if (repos.length < 10) {
              nextButton.style.display = 'none';
            } else {
              nextButton.style.display = 'inline';
            }
    const data=repos.map((repo)=>
    
      `<div class="repo-item">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description available'}</p>
        <p id="ptag">${repo.language}</p><br>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
       </div>`

    ).join('')

    reposSection.innerHTML = data;
   })
   .catch(error => console.error('Error fetching repositories:', error));
}






nextButton.addEventListener("click",()=>{
    currentPage++;
    fetchReposPage(usernameInput.value.trim(),currentPage);
    nextButton1.innerHTML=currentPage;
    update();

})
prevButton.addEventListener("click",()=>{
  if(currentPage>1){    
    currentPage--;
    nextButton1.innerHTML=currentPage;
    fetchReposPage(usernameInput.value.trim(),currentPage);
    update();
  }  
})

function update(){
  prevButton.disabled=currentPage==1;
  nextButton.disabled=reposSection.children.length < itemsPerPage; 

} 
