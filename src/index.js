const axios = require('axios')

const friendList = document.getElementById('friendList')

const displayFriends = async () => {
  try {
    const response= await axios.get('/api/friends');
    let friends = response.data;
    friends.sort((a,b) => b.rating - a.rating)
    friends.map(friend => {
      let newFriend = document.createElement('li')
      newFriend.className  = `${friend.id}`
      let newFriendName = document.createElement('p')
      newFriendName.innerText = `${friend.name}`
      newFriendName.classList = 'friendName'
      let newFriendLikes = document.createElement('span')
      newFriendLikes.innerText = `${friend.likes}`
      let increaseButton = document.createElement('button')
      increaseButton.innerText  = '+'
      increaseButton.className = `${friend.id}`
      let decreaseButton = document.createElement('button')
      decreaseButton.innerText  = '-'
      decreaseButton.className  = `${friend.id}`
      let deleteButton = document.createElement('button')
      deleteButton.innerText  = 'x'
      deleteButton.className  = `${friend.id}`
      friendList.appendChild(newFriend)
      newFriend.appendChild(newFriendName)
      newFriend.appendChild(newFriendLikes)
      newFriend.appendChild(increaseButton)
      newFriend.appendChild(decreaseButton)
      newFriend.appendChild(deleteButton)
    })
    } catch(err) {console.log(err)}
}

displayFriends();

friendList.addEventListener('click', async (event)  => {
  if (event.target.tagName === "BUTTON") {
    const response= await axios.get('/api/friends');
    let friends = response.data;
    let friendId = parseInt(event.target.className, 10)
    let friend = friends.filter(f => f.id === friendId)[0] 
    if (event.target.innerText === '+') {
      friend.likes += 1
      await axios.put(`api/friends/${friend.id}`)
    } else if (event.target.innerText === '-') {
      friend.likes -= 1
      await axios.put(`api/friends/${friend.id}`)
    } else if (event.target.innerText === 'x') {
      await axios.delete(`api/friends/${friend.id}`)
    }
  }
  })

document.getElementById('form').addEventListener('submit', async (event)=> {
  try {
    event.preventDefault()
    const name = document.getElementById('name')
    await axios.post('/api/friends')
  } catch(err) {console.log(err)}
});