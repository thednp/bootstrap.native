# Native Javascript for Bootstrap
This is a set of scripts formely jQuery Plugins for Bootstap 3, and now dependency free scripts to be used on performance driven apps and websites.

# Bootstrap Affix JS
* works with both JS call and via data attributes
* works with pinning to top <b>only</b>
* when target option is used, will automatically calculate that element position
* readjusts on window resize with a small delay (for performance reasons)

<pre>
//call the affix via js call
var sidemenu = new affix(element, options);

//call via data attributes
&lt;div class="content" data-spy="affix" data-target=".selector">
  //this is when you need to stick to a certain ELEMENT
&lt;/div>
//OR
&lt;div class="content" data-spy="affix" data-offset-top="250">
  //this is when you need to stick to a certain position to top
&lt;/div>
</pre>

# Browser Support
The scripts are developed for modern browsers tah support HTML5, but some may even work with IE8-IE9 as well, especially if  you consider using polyfills.

# More Native Javascript
More plugins are coming on the way: carousel, scrollspy, tabs, toggles

# License
The scripts are released under the MIT license.
