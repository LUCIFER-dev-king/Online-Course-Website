# E LEARN

E LEARN is a online course selling web app built with React and Firebase.

## Project Overview

E LEARN is a online course selling web app built with React and Firebase. This E LEARN fetches a list of courses and shows it to the user. The user can buy the courses, add coruses to his cart list, write review, filter courses based on level and rating and user can view the course videos. This project has contains admin panel from where courses can be uploaded.

- The courses encryption and payment are handled by cloud-functions.
- Encryption is done by Publitio Api, the video uploaded to cloud storage and from that cloud functions get triggered and upload it to publitio, where the video is compressed, encrypted and returns a url.
- Since HLS encryption is paid in Publitio, So I've written an NPM package for HLS encryption [https://github.com/LUCIFER-dev-king/FFmpeg-HLS-Encryption](FFmpeg-HLS-encryption).

## Functionlity

- Buy a course.
- Filter courses
- Add course to cart.
- Write review to course.
- View course videos.

## Tech Stack

<b>Frontned</b>: Reactjs
<br>
<b>Styling</b>: CSS and Bootstrap
<br>
<b>Database</b>: Firestore
<br>
<b>Authentication and Authorisation</b>: Firebase Auth
<br>
<b>State Management</b>: Context
<br>
<b>Payment</b>: Razorpay
<br>

## Application Links

Deployed URL -> [https://elearnreactsite.netlify.app](https://elearnreactsite.netlify.app)
<br>

## Devloped and Maintained By

📸 [Instagram](https://www.instagram.com/lucifer_the_king/?hl=en) <br />
🧳 [LinkedIn](https://www.linkedin.com/in/nihal-ahamed-m-s-7b6808190/)
<br>

**MADE WITH 💖, HAPPY CODING!**
