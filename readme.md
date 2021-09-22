# Deployed app
<p> can be found here </p>
<a href="https://lab-instruments-bookings.herokuapp.com/" > link </a>

# Frontend Stack

<br/>
<ul> 
<li><h5>Vanilla Js</h5></li>
<li><h5>JQuery</h5></li>
<li><h5>CSS</h5></li>
<li><h5>HTML</h5></li>
</ul>

<br/>

# Backend Stack

<br/>

<ul> 
<li><h5>Node Js with Express</h5></li>
</ul>

<br/>

# Data Base

<br/>

<h5>MongoDB</h5>
<br/>

# JS Frame works and External API's

<br/>
<ul> 
<li><a href="https://getbootstrap.com/">Bootstrap</a></li>
<li><a href="https://jqueryui.com/">JQuery UI</a></li>
<li><a href="https://console.developers.google.com/">Google Oauth</a></li>
<li><a href="https://sendgrid.com/">Send Grid</a></li>
<li><a href="https://icons8.com/">Icons8</a></li>
</ul>
<br/>

# Web Pack for compiling JS

<br/>

<a href="https://laravel-mix.com/">Laravel Mix</a>
<ul>
<li> compiling src/admin.js to public/js/admin.js </li>
<li> compiling src/home.js to public/js/home.js </li>
<li>compiling src/app.js to public/js/sign.js </li>

</ul>
<br/>

# View Engine

<br/>
 <a href="https://ejs.co/">EJS</a>
<br/>


## Summary

<h1> Controllers </h1>

<p> Controllers consists main logic , currently we have five controllers  </p>



<ol> 
<li>  admin Contoller </li>
<p> Responsible for All Admin operations like add,update,delete,manage admin roles
<li> Availability Controller </li>
<p> Responsible for checking whether the specified category is available at specified date and time ranges ,which are chosen by Users

<li> Booking Controller </li>
<p> If Specific Item is available ,Users can book ,this controller saves corresponding booking in bookings collection and send booking submit summary to user mail using sendGriD mailing Api</p>
</ol>

## Role based Authentication

<h5> Used Role authetications ,middlewares are responsible for authenticating the requests </h5>

## Used moment.js in backend ,which has to replced with luxon  (in timeAndDateConroller.js)

<p> In frontend , instead of moment ,used luxon.js </p>
