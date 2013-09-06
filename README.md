jquery-html-cycler
==================

jQuery plugin which cycles the content of a defined page element. Rather than show/hiding different elements within the page it loads new content from external files as requires it. Allows you to set the time for a transition (automatic and manual) and the time for a cycle. Can specify forward / backward controls. Cycling pauses if you hover the mouse over the cycling element.

Demo uses AJAX requests and will need to be served via a real webserver (ie not using file://).

Configuration options:
 
* `transitionTime`: time to transition from one element to the next on auto cycle (4000ms)
* `clickTransitionTime`: time to transition from one element to the next on manual cycle (500ms)
* `cycleTime`: delay between transitions (6000ms)
* `elementsFile`: name of file with elements (elements/elementlist.html)
* `elementContainer`: element container (#elements)
* `elementIdentifier`: element to cycle (.element)
* `forwardButton`: manual forward cycle button (#next)
* `backButton`: manual back cycle button (#prev)

Detailed docs can be found here:
https://wiki.bath.ac.uk/display/webservices/HTML+cycle+jquery+plugin

You can see a real example of this here:
http://www.bath.ac.uk/homepage/
