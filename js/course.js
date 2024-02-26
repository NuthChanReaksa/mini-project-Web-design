let isSearched = false;
const url = "https://cms.istad.co/api/cstad-courses?populate=%2A";
const getData = async () => {
  const data = await fetch(url);
  const result = await data.json();
  return result;
};
const { data: courses } = await getData();
const backend_courses = courses.filter(
  (course) =>
    course?.attributes?.category?.data?.attributes?.name ==
    "Back-end development"
);
const design_courses = courses.filter(
  (course) => course?.attributes?.category?.data?.attributes?.name == "Design"
);
const program_courses = courses.filter(
  (course) =>
    course?.attributes?.category?.data?.attributes?.name ==
    "Programming Language"
);
const database_courses = courses.filter(
  (course) => course?.attributes?.category?.data?.attributes?.name == "Database"
);
const web_courses = courses.filter(
  (course) =>
    course?.attributes?.category?.data?.attributes?.name == "Web Development"
);
const app_courses = courses.filter(
  (course) =>
    course?.attributes?.category?.data?.attributes?.name == "App Development"
);
const cyber_courses = courses.filter(
  (course) =>
    course?.attributes?.category?.data?.attributes?.name == "Cyber Security"
);

// get all section
const cat_backend = document.getElementById("backend");
const cat_database = document.getElementById("database");
const cat_programming = document.getElementById("programming");
const cat_web = document.getElementById("web");
const cat_app = document.getElementById("app");
const cat_cyber = document.getElementById("cyber");
const cat_design = document.getElementById("design");

// all data and categories
const all_courses = [
  [backend_courses, cat_backend],
  [database_courses, cat_database],
  [program_courses, cat_programming],
  [web_courses, cat_web],
  [app_courses, cat_app],
  [cyber_courses, cat_cyber],
  [design_courses, cat_design],
];

for (let course of all_courses) {
  for (let each_course of course[0]) {
    const card = document.createElement("a");
    console.log(each_course.attributes.courseOffers.split(","));
    card.setAttribute(
      "href",
      `
    coursedetail.html?id=${each_course.id}
    `
    );
    card.classList =
      "max-w-xl bg-white overflow-hidden shadow-lg rounded-2xl flex flex-col sm:flex-row hover:scale-[1.1] duration-300";
    card.innerHTML = `
                        <div class="w-5/6 p-4">
                        <h2 class="text-xl pl-4 font-semibold mb-4 custom-text-color" style="font-size: 24px">${
                          each_course.attributes.name
                        }</h2>
                        <span
                          class="inline-block pl-4 ml-4 text-center  text-sm align-baseline leading-none  rounded-full py-1 px-3 bg-red-600 text-white hover:bg-red-700 pb-1 font-bold"
                          style="font-size: 16px;">20% Scholarship
                        </span>
                        <p class="text-gray-700 pt-3 pl-4">${each_course.attributes.description.slice(
                          0,
                          64
                        )}...</p>
                        <p class="text-gray-700 pt-3 pl-4"><i class='bx bxs-hourglass-top'></i>${
                          each_course.attributes.duration
                        } hours<span
                            class="text-gray-700 pt-3 pl-4"><i class='bx bxs-layer'></i>Advanced</span>
                        </p>
                      </div>
                      <!-- Image on the left side -->
                      <div class="w-1/2 max-[640px]:w-full flex items-center justify-center">
                        <img src=${
                          "https://cms.istad.co/uploads/" +
                          each_course.attributes.logo.data.attributes.formats
                            .small.hash +
                          ".png"
                        } alt="Image"
                          class="w-4/5 max-[640px]:w-2/5 object-cover">
                      </div>
`;
    course[1].appendChild(card);
  }
}

let course_wrapper = document.getElementById("course");

//course_wrapper.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "gap-6");
let filtered = "";
const input = document.getElementById("search");
let course_filter = courses;
var clonedElement = course_wrapper.cloneNode(true);

input.addEventListener("input", (e) => {
  console.log(e.target.value);
  filtered = e.target.value.trim();

  if (filtered) {
    let tempWrapper = course_wrapper.cloneNode(true);
    course_wrapper.parentNode.replaceChild(tempWrapper, course_wrapper);
    course_wrapper = tempWrapper;

    course_filter = courses.filter((c) =>
      c.attributes.name.trim().toLowerCase().includes(filtered.toLowerCase())
    );

    course_wrapper.innerHTML = ``;
    course_wrapper.classList.add(
      "bg-blue",
      "grid",
      "grid-cols-1",
      "gap-6",
      "md:grid-cols-2",
      "py-8",
      "mx-auto",
      "max-w-screen-xl"
    );

    // adding message to show when there is no data or the
    if (course_filter.length == 0) {
      var noDataFoundDiv = document.createElement("div");

      noDataFoundDiv.classList.add(
        "text-center",
        "d-flex",
        "flex-column",
        "align-items-center",
        "col-span-2"
      );

      noDataFoundDiv.innerHTML = `
    <img width="250px" class="mx-auto" src="https://cdn3d.iconscout.com/3d/premium/thumb/no-results-found-5732789-4812665.png?f=webp" alt="No Data Image"></img>
    <h1 class="text-xl pb-11 text-red-600 font-bold" style="margin-top: 10px;">There is no record</h1>
`;

      course_wrapper.appendChild(noDataFoundDiv);

      //       course_wrapper.replaceChild(noDataFoundDiv);
    } else {
      for (let c of course_filter) {
        const card = document.createElement("a");
        card.setAttribute(
          "href",
          `
        coursedetail.html?id=${c.id}
        `
        );
        card.classList =
          "max-w-xl bg-blue overflow-hidden shadow-lg rounded-2xl flex flex-col sm:flex-row hover:scale-[1.1] duration-300";
        card.innerHTML = `
                            <div class="w-5/6 p-4  ">
                            <h2 class="text-xl pl-4 font-semibold mb-4 custom-text-color" style="font-size: 24px">${
                              c.attributes.name
                            }</h2>
                            <span
                              class="inline-block pl-4 text-center  text-sm align-baseline leading-none  rounded-full py-1 px-3 bg-red-600 text-white hover:bg-red-700 pb-1 font-bold"
                              style="font-size: 16px;">20% Scholarship
                            </span>
                            <p class="text-gray-700 pt-3 pl-4">${c.attributes.description.slice(
                              0,
                              64
                            )}...</p>
                            <p class="text-gray-700 pt-3 pl-4"><i class='bx bxs-hourglass-top'></i>${
                              c.attributes.duration
                            } hours<span
                                class="text-gray-700 pt-3 pl-4"><i class='bx bxs-layer'></i>Advanced</span>
                            </p>
                          </div>
                          <!-- Image on the left side -->
                          <div class="w-1/2 flex items-center justify-center">
                            <img src=${
                              "https://cms.istad.co/uploads/" +
                              c.attributes.logo.data.attributes.formats.small
                                .hash +
                              ".png"
                            } alt="Image"
                              class="w-4/5 object-cover">
                          </div>
    `;
        course_wrapper.appendChild(card);
      }
    }
  } else {
    console.log("Search is not performed !!!");
    //course_wrapper.replaceWith(clonedElement);
    course_wrapper.parentNode.replaceChild(clonedElement, course_wrapper);
    course_wrapper = clonedElement;
  }
});
