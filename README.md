# SimpleTwitchBotJS
A dead-simple skeleton project to play local sound files when chat commands trigger them in Twitch

To use:
- Drop this folder onto your desktop or another local folder on your computer
- Create a folder called "Sounds" within the project folder
- Drop any number of MP3 sound files into the Sounds folder, ensuring they have no spaces in the filenames
- Open the index.htm file in a browser by double-clicking it
- Log in by setting the channel to listen to, and a valid OAuth (which can be acquired by clicking the ? symbol on the login screen)
- In the chat of the selected channel, use the sound command  ('!' plus the file name, minus '.mp3') ... i.e. to play bruh.mp3, use '!bruh'

Notes:
- If you want to have the channel and oauth set by default, you can put them into the URL by adding &channel=XXX&token=YYY into the URL after .htm, where XXX is the channel name in lowercase, and YYY is your oauth without the "oauth:" part at the beginning of the string. Those values should be automatically filled out when you click login if you used the URL correctly. Then you can just bookmark that URL and you won't have to fill out that data anymore.
- If you want to auto login with the given channel and token provided, you can add &autoLogin=true at the end of the URL vars and it will auto-login. This can be used to supply a browser URL in OBS that will let you load the sound player there instead of having to open it manually each stream.
