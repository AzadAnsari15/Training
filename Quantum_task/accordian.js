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
                <div class="course  " id=${course.course_p}>
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
          coursesContainer.appendChild(courseElement);
        });
      }

      // Call the function to render the courses
      renderCourses();