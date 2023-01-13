# README.md

<a name="readme-top"></a>

<br />

<h3 align="center">App Wishlist Widget</h3>

<div align="center">
	<img src="images/AppWishlistWidget-ExampleScreenshot.png" title="Example image" alt="Example Screenshot" align="center"/>

  <p align="center">
    An interactive widget for displaying an editable list of iPhone apps on the homescreen.
  </p>
  <p align="center">
   ◊ <a href="https://github.com/gavinggordon/app-wishlist-widget"><strong>Explore the docs »</strong></a>
    <br />
   ◊ <a href="https://github.com/gavinggordon/app-wishlist-widget/issues">Report a Bug</a>
    <br />
   ◊ <a href="https://github.com/gavinggordon/app-wishlist-widget/issues">Request a Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project" title="Go to the 'About the Project' section of the 'App Wishlist Widget' repository">About The Project</a>
      <ul>
        <li><a href="#built-with" title="Go to the 'Built With' sub-section of the 'App Wishlist Widget' repository">Built With</a></li>
      </ul>
    </li>
    <li><a href="#use-cases" title="Go to the 'Use Cases' section of the 'App Wishlist Widget' repository">Use Cases</a></li>
		<li>
		  <a href="#prerequisites" title="Go to the 'Prerequisites' section of the 'App Wishlist Widget' repository">Prerequisites</a>
	    <ul>
			  <li><a href="#prerequisites-hardware" title="Go to the 'Hardware Prerequisites' sub-section of the 'App Wishlist Widget' repository">Hardware</a></li>
				<li><a href="#prerequisites-software" title="Go to the 'Software Prerequisites' sub-section of the 'App Wishlist Widget' repository">Software</a></li>
			</ul>
		</li>
		<li>
      <a href="#getting-started" title="Go to the 'Getting Started' section of the 'App Wishlist Widget' repository">Getting Started</a>
      <ul>
	      <li>
	        <a href="#installation" title="Go to the 'Installation' sub-section of the 'App Wishlist Widget' repository">Installation</a>
	        <ul>
		        <li><a href="#installation-shortcuts-app-shortcuts" title="Go to the 'Shortcuts Shortcuts Installation' sub-section of the 'App Wishlist Widget' repository">Shortcuts App Shortcuts</a></li>
		        <li><a href="#installation-scriptable-app-scripts" title="Go to the 'Scriptable Scripts Installation' sub-section of the 'App Wishlist Widget' repository">Scriptable App Scripts</a></li>
	        </ul>
	      </li>
      </ul>
    </li>
    <li><a href="#contributing" title="Go to the 'Contributing' section of the 'App Wishlist Widget' repository">Contributing</a></li>
    <li><a href="#license" title="Go to the 'License' section of the 'App Wishlist Widget' repository">License</a></li>
    <li><a href="#contact" title="Go to the 'Contact' section of the 'App Wishlist Widget' repository">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## <a name="about-the-project" title="The 'About the Project' section of the 'App Wishlist Widget' repository">About the Project</a>

This displays app icons in an interactive and editable list within a large widget on the homescreen of an iPhone running iOS 15 (or above).

I designed this widget with the purpose of providing users with a uncomplicated visual interface that allows simple and fast management of a list of apps.

  ![App Wishlist Widget](images/AppWishlistWidget-ExampleScreenshot.png)

### <a name="built-with" title="The 'Built With' sub-section of the 'App Wishlist Widget' repository">Built With</a>

* JavaScript 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USE CASES-->
## <a name="use-cases" title="The 'Use Cases' section of the 'App Wishlist Widget' repository">Use Cases</a>

Perhaps you have discovered an app that you really like, but you can't afford to purchase it until next payday...

Perhaps you are comparing the capabilities of several different apps, in order to find the one that will best suit your needs... 

Or, perhaps you are creating a list of possible gift ideas, while searching for an app to send to a friend or a family member...

So, for _whatever_ your reason might be, the **App Wishlist Widget** makes it quicker and easier, than ever before, for you to fulfilling _whatever_ you need. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## <a name="prerequisites" title="The 'Prerequisites' section of the 'App Wishlist Widget' repository">Prerequisites</a>

In order to utilize the **App Wishlist Widget**, there are some requirements, regarding hardware and some software. 

### <a name="prerequisites-hardware" title="The 'Hardware Prerequisites' sub-section of the 'App Wishlist Widget' repository">Hardware</a>
> - iPhone running iOS 15 (or above)

### <a name="prerequisites-software" title="The 'Software Prerequisites' sub-section of the 'App Wishlist Widget' repository">Software</a>
> - Shortcuts app
> - Scriptable app



<!-- GETTING STARTED -->
## <a name="getting-started" title="The 'Getting Started' section of the 'App Wishlist Widget' repository">Getting Started</a>

When the above-mentioned requirements have been satisfied, begin by installing the necessary shortcuts into the Shortcuts app, by following the instructions in the <a href="#installation-shortcuts-app-shortcuts" title="Go to the 'Shortcuts Shortcuts Installation' sub-section of the 'App Wishlist Widget' repository">first sub-section</a> below.

_Important Note: As previously noted, remember to add the "**AddAppToWishlist**" shortcut action to the list of available actions on the ShareSheet. This can be enabled by tapping the "Add to ShareSheet" toggle-switch to the **on** position (lime-green) within the "**AddAppToWishlist**" shortcut's settings panel (tap the "toggles" icon in the bottom left corner of the shortcut flow/editing screen)._

Next, add the necessary scripts to the Scriptable app, by following the instructions in the <a href="#installation-scriptable-app-scripts" title="Go to the 'Scriptable Scripts Installation' sub-section of the 'App Wishlist Widget' repository">second sub-section</a> below.

Lastly, go ahead and add a large widget to your homescreen, and select  "AppWishlistWidget" as the Scriptable script that the widget will use.

To add an app to the wishlist:
1. Open the Apple App Store
2. Find an app that you like
3. Tap the "share" icon located near the top of the app's 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### <a name="installation" title="The 'Installation' sub-section of the 'App Wishlist Widget' repository">Installation</a>

#### <a name="installation-shortcuts-app-shortcuts" title="The 'Shortcuts App Shortcuts Installation' sub-section of the 'App Wishlist Widget' repository">Shortcuts App Shortcuts</a>

First, you must add the necessary shortcuts to the Shortcuts app. You can acquire both of these shortcuts via the following 2 links:

![Add App To Wishlist Shortcut](/gavinggordon/app-wishlist-widget/images/AddAppToWishlist-ShortcutScreenshot.png)

1. [AppWishlistWidget.shortcut](https://www.dropbox.com/s/p5g0qlofz1aok7f/AddAppToWishlist.shortcut?dl=0)

_Important Note: As previously noted, remember to add the "**AddAppToWishlist**" shortcut action to the list of available actions on the ShareSheet. This can be enabled by tapping the "Add to ShareSheet" toggle-switch to the **on** position (lime-green) within the "**AddAppToWishlist**" shortcut's settings panel (tap the "toggles" icon in the bottom left corner of the shortcut flow/editing screen)._

![App Wishlist Widget Refresh Shortcut](gavinggordon/app-wishlist-widget/images/AppWishlistWidget-Refresh-ShortcutScreenshot.png)

2. [AppWishlistWidget-Refresh.shortcut](https://www.dropbox.com/s/fhezkj2vw5ionyd/AppWishlistWidget-Refresh.shortcut?dl=0)

#### <a name="installation-scriptable-app-scripts" title="The 'Scriptable App Scripts Installation' sub-section of the 'App Wishlist Widget' repository">Scriptable App Scripts</a>

Lastly, you must add the 3 javascript documents, included within this repository, to your Scriptable app.

*Note: It is important that you name each script in the Scriptable app the same name as the relative javascript document, excluding the file extension.*

1. AppWishlistWidget.js
2. AppWishlistWidget-Add.js
3. AppWishlistWidget-Remove.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## <a name="contributing" title="The 'Contributing' section of the 'App Wishlist Widget' repository">Contributing</a>

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## <a name="license" title="The 'License' section of the 'App Wishlist Widget' repository">License</a>

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## <a name="contact" title="The 'Contact' section of the 'App Wishlist Widget' repository">Contact</a>

Gavin Gordon - [@GavinGGordon](https://twitter.com/GavinGGordon) - me@gavingordon.com

Project Link: [https://github.com/gavinggordon/app-wishlist-widget](https://github.com/gavinggordon/app-wishlist-widget)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[product-screenshot]: /gavinggordon/app-wishlist-widget/images/AppWishlistWidget-ExampleScreenshot.png