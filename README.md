jquery-html-cycler
==================

jQuery plugin which cycles the content of a defined page element. Rather than show/hiding different elements within the page it loads new content from external files as requires it. Allows you to set the time for a transition (automatic and manual) and the time for a cycle. Can specify forward / backward controls. Cycling pauses if you hover the mouse over the cycling element.

Demo uses AJAX requests and will need to be served via a real webserver (ie not using file://).

Configuration options:
 
* transitionTime - time to move from one element to the next on auto cycle (4000ms)
* clickTransitionTime - time to move from one element to the next on manual cycle (500ms)
* cycleTime: pause between auto transitions (6000ms)
* elementsFile: name of file with elements (elements/elementlist.html)
* elementContainer: identified for element container (#elements)
* elementIdentifier: identified for element to cycle (.element)
* forwardButton: identified for manual forward cycle button (#next)
* backButton: identified for manual back cycle button (#prev)

Detailed docs can be found here:
https://wiki.bath.ac.uk/display/webservices/HTML+cycle+jquery+plugin

You can see a real example of this here:
http://www.bath.ac.uk/homepage/
