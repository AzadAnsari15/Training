"use strict";
var _a;
document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll(".menu-items1 .accordion-item");
    accordionItems.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");
        const arrow = item.querySelector(".material-symbols-outlined.arrow");
        header === null || header === void 0 ? void 0 : header.addEventListener("click", function () {
            // Toggle the active class to expand or collapse the content
            item.classList.toggle("active");
            // Check if the item is active (expanded) or not and display/hide the content accordingly
            if (item.classList.contains("active")) {
                content.style.display = "block"; // Non-null assertion operator (!) used here
                arrow.innerHTML = "expand_less"; // Non-null assertion operator (!) used here
            }
            else {
                content.style.display = "none"; // Non-null assertion operator (!) used here
                arrow.innerHTML = "expand_more"; // Non-null assertion operator (!) used here
            }
        });
    });
});
let menuOpen = false; // Add a new variable to track the state of the menu
// JavaScript to toggle the mobile menu on button press
(_a = document.getElementById("menu-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    const navItems1 = document.querySelector(".menu-items1");
    // Toggle the menuOpen variable
    menuOpen = !menuOpen;
    if (menuOpen) {
        // Change the src attribute to the "unhamburger-menu.svg" when the menu is open
        const menuButton = document.getElementById("menu-button");
        menuButton.src = "icons/unhamburger-menu.svg";
        navItems1.style.display = "flex"; // Non-null assertion operator (!) used here
    }
    else {
        // Change the src attribute back to the "hamburger-menu.svg" when the menu is closed
        const menuButton = document.getElementById("menu-button");
        menuButton.src = "icons/hamburger-menu.svg";
        navItems1.style.display = "none"; // Non-null assertion operator (!) used here
    }
});
// JSON data for courses
const coursesData = [
    {
        title: "Acceleration",
        subject: "Physics",
        grade: "Grade 7",
        units: 4,
        lessons: 18,
        topics: 24,
        class: "Mr. Frank's Class B",
        students: "50 students",
        duration: "21-Jan-2020 to 21-Aug-2020",
        image: "images/imageMask-1.svg",
        favourite: "icons/favourite.svg",
        expired: "unexpired",
        course_p: "course_p",
    },
    {
        title: "Displacement, Velocity, and Speed",
        subject: "Physics 2",
        grade: "Grade 6",
        units: 2,
        lessons: 15,
        topics: 20,
        class: "No Classes",
        students: "",
        duration: "",
        image: "images/imageMask-2.svg",
        favourite: "icons/favourite.svg",
        obesity: "obesity",
        expired: "unexpired",
        course_p: "course_p",
    },
    {
        title: "Introduction to Biology: Microorganisms and their Effects",
        subject: "Biology",
        grade: "Grade 4",
        units: 5,
        lessons: 16,
        topics: 22,
        class: "No Classes",
        students: "300 students",
        duration: "",
        image: "images/imageMask-3.png",
        favourite: "icons/favourite.svg",
        obesity: "obesity",
        expired: "unexpired",
        course_p: "course_p",
    },
    {
        title: "Introduction to High School Mathematics",
        subject: "Mathematics",
        grade: "Grade 8",
        units: 6,
        lessons: 22,
        topics: 28,
        class: "Mr. Frank's Class A",
        students: "44 students",
        duration: "14-Oct-2019 to 20-Oct-2020",
        image: "images/imageMask-3.svg",
        favourite: "icons/unfavourite.svg",
        expired: "expired",
    },
];
// Function to create a course element
function createCourseElement(course) {
    const courseElement = document.createElement("div");
    courseElement.classList.add("box");
    const courseContent = `
    <p class=${course.expired}><span>EXPIRED</span></p>
    <div class="course" id=${course.course_p}>
      <img src="${course.image}" />
    <div class="content">
                        <div class="flex-fvt">
                            <h3>${course.title}</h3>
                            <img src="${course.favourite}" />
                        </div>
                        <div class="grade">
                            <p>${course.subject}</p>
                            <p>|</p>
                            <p>${course.grade} <span class="two">+2</span></p>
                        </div>
                        <div class="syllabus">
                            <p class="p"> <strong>${course.units}</strong> Units</p>
                            <p class="p"> <strong>${course.lessons}</strong> Lessons</p>
                            <p class="p"> <strong>${course.topics}</strong> Topics</p>
                        </div>
                        <div class="dropdowns">
                            <div>
                                <div class="custom-select">
                                    <select name="state" id="state">
                                        <option value disabled selected>${course.class}</option>
                                    </select>
                                    <span> <img src="./icons/arrow-down.svg" /></span>
                                </div>
                            </div>
                        </div>
                        <div class="date">
                            <p>${course.students} </p>
                            <div class="footer-divider"></div>
                            <p style="padding-left: 10px;">${course.duration}</p>
                        </div>
                    </div>
    </div>
    <hr>
    <div class="icon">
      <img src="icons/preview.svg" />
      <img class=${course.obesity} src="icons/manage course.svg" />
      <img class=${course.obesity} src="icons/grade submissions.svg" />
      <img src="icons/reports.svg" />
    </div>
  `;
    courseElement.innerHTML = courseContent;
    return courseElement;
}
// Function to render all courses
function renderCourses() {
    const coursesContainer = document.getElementById("courses-container");
    coursesData.forEach((course) => {
        const courseElement = createCourseElement(course);
        coursesContainer === null || coursesContainer === void 0 ? void 0 : coursesContainer.appendChild(courseElement);
    });
}
// Call the function to render the courses
renderCourses();
let showAnnouncementNotifications = true; // Set to true to initially show the Announcement Notifications
function toggleAnnouncementNotifications() {
    const announcementNotifications = document.querySelector(".announcement-notification");
    const notiCount = document.querySelector(".noti3");
    // Toggle the state for showing/hiding the announcement notifications
    showAnnouncementNotifications = !showAnnouncementNotifications;
    if (showAnnouncementNotifications) {
        // Show the announcement notifications container
        announcementNotifications.style.display = "block";
        // Hide the notification count
        notiCount.style.display = "none";
    }
    else {
        // Hide the announcement notifications container
        announcementNotifications.style.display = "none";
        // Show the notification count
        notiCount.style.display = "block";
    }
    const alertsIcon = document.getElementById("alerts-icon1");
    const alertsIconSrc = "icons/announcements.svg";
    const unalertsIconSrc = "icons/unannouncements.svg";
    // Change the icon when showing or hiding announcement notifications
    if (showAnnouncementNotifications) {
        alertsIcon.src = unalertsIconSrc;
    }
    else {
        alertsIcon.src = alertsIconSrc;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const announcementContents = document.querySelectorAll(".announcement-content");
    const alertsIcon = document.getElementById("alerts-icon1");
    const notiCount = document.querySelector(".noti3");
    // Calculate the initial unread count based on the number of minus icons
    let unreadCount = 0;
    announcementContents.forEach((content) => {
        const icon = content.querySelector("i");
        if (icon === null || icon === void 0 ? void 0 : icon.classList.contains("fa-circle-minus")) {
            unreadCount++;
        }
    });
    // Function to update the notification count and style
    function updateNotificationCount() {
        // Update the notifications count
        notiCount.textContent = unreadCount > 0 ? unreadCount.toString() : "";
        notiCount.style.display = unreadCount !== 0 ? "block" : "none";
        // Update the alerts icon color to green if there are unread items,
        // or to white if all items are read
        alertsIcon.style.color = unreadCount > 0 ? "#3ea861" : "white";
    }
    // Function to handle minus icon click
    function handleMinusIconClick() {
        const icon = this;
        const content = icon.closest(".announcement-content");
        if (content) {
            if (icon.classList.contains("fa-circle-minus")) {
                icon.classList.replace("fa-circle-minus", "fa-circle-check");
                icon.style.color = "#008000"; // Green color
                content.style.backgroundColor = "#f7f7e1"; // Change background color when active
                unreadCount--;
            }
            else {
                icon.classList.replace("fa-circle-check", "fa-circle-minus");
                icon.style.color = ""; // Reset to default color
                content.style.backgroundColor = ""; // Reset background color to default
                unreadCount++;
            }
        }
        // Call the function to update the notification count and style
        updateNotificationCount();
    }
    // Get all the minus icons and attach the click event listener to each
    announcementContents.forEach((content) => {
        const icon = content.querySelector("i");
        icon === null || icon === void 0 ? void 0 : icon.addEventListener("click", handleMinusIconClick);
    });
    // Set the initial notification count when the DOM is loaded
    updateNotificationCount();
    // Show the announcement notifications on initial load
    toggleAnnouncementNotifications();
});
let showAlarmNotifications = true; // Set to true to initially show the Alarm Notifications
function toggleAlarmNotifications() {
    const alarmNotifications = document.querySelector(".alarm-notification");
    const notiCount = document.querySelector(".noti");
    // Toggle the state for showing/hiding the alarm notifications
    showAlarmNotifications = !showAlarmNotifications;
    if (showAlarmNotifications) {
        // Show the alarm notifications container
        alarmNotifications.style.display = "block";
        // Hide the notification count
        notiCount.style.display = "none";
    }
    else {
        // Hide the alarm notifications container
        alarmNotifications.style.display = "none";
        // Show the notification count
        notiCount.style.display = "block";
    }
    const alertsIcon = document.getElementById("alerts-icon");
    const alertsIconSrc = "icons/alerts.svg";
    const unalertsIconSrc = "icons/unalerts.svg";
    // Change the icon when showing or hiding alarm notifications
    if (showAlarmNotifications) {
        alertsIcon.src = unalertsIconSrc;
    }
    else {
        alertsIcon.src = alertsIconSrc;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const alarmContents = document.querySelectorAll(".alarm-content");
    const alertsIcon = document.getElementById("alerts-icon");
    const notiCount = document.querySelector(".noti");
    // Calculate the initial unread count based on the number of minus icons
    let unreadCount = 0;
    alarmContents.forEach((content) => {
        const icon = content.querySelector("i");
        if (icon === null || icon === void 0 ? void 0 : icon.classList.contains("fa-circle-minus")) {
            unreadCount++;
        }
    });
    // Function to update the notification count and style
    function updateNotificationCount() {
        // Update the notifications count
        notiCount.textContent = unreadCount > 0 ? unreadCount.toString() : "";
        notiCount.style.display = unreadCount !== 0 ? "block" : "none";
        // Update the alerts icon color to green if there are unread items,
        // or to white if all items are read
        alertsIcon.style.color = unreadCount > 0 ? "#3ea861" : "white";
    }
    function handleMinusIconClick() {
        const icon = this;
        const content = icon.closest(".alarm-content");
        if (content) {
            if (icon.classList.contains("fa-circle-minus")) {
                icon.classList.replace("fa-circle-minus", "fa-circle-check");
                icon.style.color = "#008000"; // Green color
                content.style.backgroundColor = "#f7f7e1"; // Change background color when active
                unreadCount--;
            }
            else {
                icon.classList.replace("fa-circle-check", "fa-circle-minus");
                icon.style.color = ""; // Reset to default color
                content.style.backgroundColor = ""; // Reset background color to default
                unreadCount++;
            }
        }
        // Call the function to update the notification count and style
        updateNotificationCount();
    }
    // Get all the minus icons and attach the click event listener to each
    alarmContents.forEach((content) => {
        const icon = content.querySelector("i");
        icon === null || icon === void 0 ? void 0 : icon.addEventListener("click", handleMinusIconClick);
    });
    // Set the initial notification count when the DOM is loaded
    updateNotificationCount();
    // Show the alarm notifications on initial load
    toggleAlarmNotifications();
});
