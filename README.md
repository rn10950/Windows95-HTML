# Windows95-HTML
A Windows 95 experience written in HTML5.

This documentation is a work-in-progress and will be updated more later. Be sure to read the known issues section before you test it out. You can view a recent version by visiting this link. http://win95-html.webuda.com/ (update frequency based on how much work is being done)

####Programs:
At this point, the only program that I have created is the Run dialog (Start -> Run) I plan to create most of the shell dialogs (winver, standard error message template) before I start working on the more complex applications. I plan to start work on a debug application very soon. After that, We should focus on Notepad and the calculator.

####Known Issues:
* Webkit/Blink (Chrome, it's derivatives, and Safari) support is limited. I've done most of the development up to this point in Firefox. I am working on improving it, but for now I advise you use a Gecko-based browser such as Firefox or SeaMonkey.
* You can only hide the Start Menu by clicking the Start Button in the taskbar. This will be fixed shortly.
* I don't have very good access to later versions of IE, so if anyone has IE11 or Edge, please let me know how it looks compared to the Firefox/Gecko rendering.

####Desktop
I have not started work on the Desktop yet, but I plan for it to be just like a standard application window that stays at a z-index of 1, running root-level JS execution (index.htm and desktop.js)

####MS-DOS Prompt
I plan to use the JS port of DOSBox in the "MS-DOS Prompt" application inside the emulator. This feature will be one of the last implemented, but I figure just put this here as something to look forward to.
