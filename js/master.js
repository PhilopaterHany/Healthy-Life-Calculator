// Declaring Variables
const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const gend = document.querySelector("select");
const nums = document.querySelectorAll("input[type=number");
const calc = document.querySelector("input[type=submit]");
const result = document.getElementById("result");
const invalidChars = ["-", "+", "e"];
const ageHolder = document.getElementById("age-holder");
const heightHolder = document.getElementById("height-holder");
const weightHolder = document.getElementById("weight-holder");
const ageB = document.getElementById("a-inp-border");
const heightB = document.getElementById("h-inp-border");
const weightB = document.getElementById("w-inp-border");
const scrllBtn = document.getElementById("to-top");
let bmr, prot, carb, fat;

// Removing [- + e] from input[type="number"]
for (let i = 0; i < nums.length; i++) {
    nums[i].addEventListener("input", () => {
        nums[i].value = nums[i].value.replace(/[e\+\-]/gi, "");
    });
    nums[i].addEventListener("keydown", (e) => {
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    });
}

// Max Characters Function
function limit(element, max) {
    let maxChars = max;
    if (element.value.length > maxChars) {
        element.value = element.value.substr(0, maxChars);
    }
}
age.onkeyup = limit(age, 2);
age.onkeydown = limit(age, 2);
height.onkeyup = limit(height, 3);
height.onkeydown = limit(height, 3);
weight.onkeyup = limit(weight, 3);
weight.onkeydown = limit(weight, 3);

// Controlling Inputs, Placeholders, focus & blur
age.onfocus = () => {
    ageHolder.classList.add("has-data");
    ageB.classList.add("active");
};
age.onblur = () => {
    if (age.value === "") {
        ageHolder.classList.remove("has-data");
        ageB.classList.remove("active");
    }
    height.focus();
};
height.onfocus = () => {
    heightHolder.classList.add("has-data");
    heightB.classList.add("active");
};
height.onblur = () => {
    if (height.value === "") {
        heightHolder.classList.remove("has-data");
        heightB.classList.remove("active");
    }
    weight.focus();
};
weight.onfocus = () => {
    weightHolder.classList.add("has-data");
    weightB.classList.add("active");
};
weight.onblur = () => {
    if (weight.value === "") {
        weightHolder.classList.remove("has-data");
        weightB.classList.remove("active");
    }
};
ageHolder.onclick = () => age.focus();
heightHolder.onclick = () => height.focus();
weightHolder.onclick = () => weight.focus();

// Main Function For Creating Result
calc.onclick = (e) => {
    // Preventing The Button From Submitting Data
    e.preventDefault();

    // Removing All Previous Results
    document.querySelectorAll(".remove").forEach((ele) => {
        ele.remove();
    });

    if (age.value === "" || height.value === "" || weight.value === "") {
        // Checking If All The Fields Are Filled In And Creating Error Message
        let pRes = document.createElement("p");
        pRes.className = "result-er  remove";
        pRes.innerHTML = `<i class="fas fa-times"></i>Please Fill In All The Fields<i class="fas fa-times"></i>`;
        document.forms[0].appendChild(pRes);
    } else {
        if (gend.value === "xy") {
            // If All Fields Are Filled & Gender Is Male
            bmr = 10 * weight.value + 6.25 * height.value - 5 * age.value + 5;
            prot = Math.round(weight.value * 1.5);
            carb = Math.round(weight.value * 6.8);
            fat = "30% Of Your Total Calories (1g of fat = 9 kCal)";
        } else if (gend.value === "xx") {
            // If All Fields Are Filled & Gender Is Female
            bmr = 10 * weight.value + 6.25 * height.value - 5 * age.value - 161;
            prot = Math.round(weight.value * 1.5);
            carb = Math.round(weight.value * 6.8);
            fat = "30% Of Your Total Calories (1g of fat = 9 kCal)";
        }

        // Creating BMR Result
        let pRes = document.createElement("p");
        pRes.className = "result remove";
        pRes.innerHTML = `Your BMR Result Is <span>${bmr}</span>`;
        document.forms[0].appendChild(pRes);

        // Creating Table For Total Calorie Need Daily
        let table = document.createElement("table");
        table.className = "calories remove";
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        table.appendChild(thead);
        table.appendChild(tbody);

        let row_1 = document.createElement("tr");

        let heading_1 = document.createElement("th");
        heading_1.innerHTML = "Activity Level";

        let heading_2 = document.createElement("th");
        heading_2.innerHTML = "Total Calorie Need Daily";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);

        thead.appendChild(row_1);

        let row_2 = document.createElement("tr");
        let row_2_data_1 = document.createElement("td");
        row_2_data_1.innerHTML = "Sedentary (Little or No exercise)";

        let row_2_data_2 = document.createElement("td");
        row_2_data_2.innerHTML = `<span>${(bmr * 1.2).toFixed(2)}</span> kCal`;

        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);

        tbody.appendChild(row_2);

        let row_3 = document.createElement("tr");
        let row_3_data_1 = document.createElement("td");
        row_3_data_1.innerHTML =
            "Lightly active (Light exercise 3-5 days a week)";

        let row_3_data_2 = document.createElement("td");
        row_3_data_2.innerHTML = `<span>${(bmr * 1.375).toFixed(
            2
        )}</span> kCal`;

        row_3.appendChild(row_3_data_1);
        row_3.appendChild(row_3_data_2);

        tbody.appendChild(row_3);

        let row_4 = document.createElement("tr");
        let row_4_data_1 = document.createElement("td");
        row_4_data_1.innerHTML =
            "Moderately active (Moderate exercise 3-5 days a week)";

        let row_4_data_2 = document.createElement("td");
        row_4_data_2.innerHTML = `<span>${(bmr * 1.55).toFixed(2)}</span> kCal`;

        row_4.appendChild(row_4_data_1);
        row_4.appendChild(row_4_data_2);

        tbody.appendChild(row_4);

        let row_5 = document.createElement("tr");
        let row_5_data_1 = document.createElement("td");
        row_5_data_1.innerHTML = "Very active (Hard exercise 6-7 days a week)";

        let row_5_data_2 = document.createElement("td");
        row_5_data_2.innerHTML = `<span>${(bmr * 1.725).toFixed(
            2
        )}</span> kCal`;

        row_5.appendChild(row_5_data_1);
        row_5.appendChild(row_5_data_2);

        tbody.appendChild(row_5);

        let row_6 = document.createElement("tr");
        let row_6_data_1 = document.createElement("td");
        row_6_data_1.innerHTML =
            "Extra active (Hard exercise 6-7 days a week + physical job)";

        let row_6_data_2 = document.createElement("td");
        row_6_data_2.innerHTML = `<span>${(bmr * 1.9).toFixed(2)}</span> kCal`;

        row_6.appendChild(row_6_data_1);
        row_6.appendChild(row_6_data_2);

        tbody.appendChild(row_6);

        document.forms[0].appendChild(table);

        // Creating Result For Daily Need Of Protein & Carb
        let needs = document.createElement("div");
        needs.className = "needs remove";
        let need_1 = document.createElement("p");
        need_1.innerHTML = `Daily Protein Need = <span>${prot} grams</span>`;
        needs.appendChild(need_1);
        let need_2 = document.createElement("p");
        need_2.innerHTML = `Daily Carbohydrate Need = <span>${carb} grams</span>`;
        needs.appendChild(need_2);
        let need_3 = document.createElement("p");
        need_3.innerHTML = `Daily Fat Need = <span>${fat}</span>`;
        needs.appendChild(need_3);
        document.forms[0].appendChild(needs);

        // Creating Note Of Bulking & Cutting
        let note = document.createElement("div");
        note.className = "note remove";
        note.innerHTML = `
        <p><span>Note:</span> If you're on a <span>bulking diet</span>, <span>add 500 ~ 700 kCal</span> to your Total Calorie Need Daily.</p>
        <p><span>Note:</span> If you're on a <span>cutting diet</span>, <span>subtract 500 ~ 700 kCal</span> from your Total Calorie Need Daily.</p>
        `;
        document.forms[0].appendChild(note);
    }
};

// Scroll To Top Button
window.onscroll = () => {
    window.scrollY >= 100
        ? (scrllBtn.style.right = "30px")
        : (scrllBtn.style.right = "-1000px");
};
scrllBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};
