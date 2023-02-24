<p align="center"> <img src="https://user-images.githubusercontent.com/64274316/221059329-e3778a0e-31a8-4f42-9dcb-22185c113f99.png" height="150"/> </p>

# Overview 
🌟 Spotify Match is a music sharing website that lets you compare and match music with your friends to find new tracks together 🌟

## Login ⚙️

![image](https://user-images.githubusercontent.com/64274316/221060453-d8768fc6-bb35-4047-b858-53d3d0d83e4a.png)

<img align="left" src="https://user-images.githubusercontent.com/64274316/221055373-65fc7114-6418-44a2-a846-e3fcebef7de7.png" height="300"/>
Spotify Match implements the official Spotify Login framework to ensure OAuth 2.0 Authorization standards.
Logging in is as easy as hitting "Login" on the homepage and logging in with your Spotify account!

<br><br/>
There are a few things we ask for when you log in:


- View your Spotify Data
    - This is to view your name and email for account security
- View your activity on Spotify
    - This is to see the tracks in your Library to make playlists
- Take Actions in Spotify on your behalf
    - This is so the site can create new custom playlists for you

## Comparing Playlists 🔀

When you first log in to Spotify Match, you'll be brought to the Playlists Page. Comparing playlists with a friend is as easy as finding two playlists you'd like to compare!


![image](https://user-images.githubusercontent.com/64274316/221057227-c434b563-8758-4f14-ab85-7e5fea748477.png)

After you paste a playlist link into one of the two columns, Spotify Match will find all of the songs in that playlist and generate a scrollable preview of the playlist for you to view.

Afterwards, you just have to hit "Similarities" or "Differences" to generate your new playlist.

<div align="center">

| **Similarities** | **Differences** |
| --------------- | --------------- |
| Generates a playlist with all the songs **common** to both playlists | Generates a playlist with all the songs in one or the other but not **both**.| 

</div>


## Generating playlists

Once you're done comparing, you should see your new playlist appear in the third column. 
Once you give it a name, you're ready to generate the playlist!

![image](https://user-images.githubusercontent.com/64274316/221060158-65ba11c2-5cc7-450d-aa8e-cb852b9e9216.png)

Hit make playlist and Spotify Match will create the playlist under your account. You'll get a handy notice in the site when it's done. Check your Spotify account and you'll see your new awesome playlist waiting for you!

![image](https://user-images.githubusercontent.com/64274316/221060209-3dad151c-8297-4f89-abc0-f179ec1774b0.png)


# Install Guide 🛠️
1. Clone this repo by running ```git clone https://github.com/a22yuen/spotify-match.git```
2. in your terminal, navigate to the install directory 
3. run ```npm install```
4. run ```npm run dev```
5. Open up ```localhost:3000``` in your browser

# The Future 🔮

- We have a recommendations system and a genre analysis tool currently in the works, for even more tools to compare with! 
- We're currently working hard to get Spotify Match approved by the official Spotify Dev team
    - Once this happens we won't be rate limited and login auth will be open for any Spotify Account. 
- We're also happy to hear any suggestions. Please comment on the repo to let us know what features you want to see!
