// Declaring Variables
const qArrowDown = document.querySelectorAll(".ques i");
const qAns = document.querySelectorAll(".ans");
const convWeight = document.getElementById("convWeight");
const convHeight = document.getElementById("convHeight");
const convWHolder = document.getElementById("convW-holder");
const convHHolder = document.getElementById("convH-holder");
const convWB = document.getElementById("convW-inp-border");
const convHB = document.getElementById("convH-inp-border");
const conv = document.getElementById("conv");
const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const gend = document.querySelector("select");
const nums = document.querySelectorAll("input[type=number");
const calc = document.getElementById("calc");
const result = document.getElementById("result");
const invalidChars = ["-", "+", "e"];
const ageHolder = document.getElementById("age-holder");
const heightHolder = document.getElementById("height-holder");
const weightHolder = document.getElementById("weight-holder");
const ageB = document.getElementById("a-inp-border");
const heightB = document.getElementById("h-inp-border");
const weightB = document.getElementById("w-inp-border");
const scrllBtn = document.getElementById("to-top");
let bmr, bmi, bmiClass, bodyFat, prot, carb, fat;

// Arrows Display Answers
for (let i = 0; i < qArrowDown.length; i++) {
    qArrowDown[i].onclick = () => {
        qAns[i].classList.toggle("show");
        qAns[i].classList.contains("show")
            ? (qArrowDown[i].style.cssText =
                  "transform: rotate(180deg);-webkit-transform: rotate(180deg);-moz-transform: rotate(180deg);-ms-transform: rotate(180deg);-o-transform: rotate(180deg);transition: 0.3s;-webkit-transition: 0.3s;-moz-transition: 0.3s;-ms-transition: 0.3s;-o-transition: 0.3s;")
            : (qArrowDown[i].style.cssText =
                  "transform: rotate(0deg);-webkit-transform: rotate(0deg);-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);-o-transform: rotate(0deg);transition: 0.3s;-webkit-transition: 0.3s;-moz-transition: 0.3s;-ms-transition: 0.3s;-o-transition: 0.3s;");
    };
}

// First Question Is Opened By Default
document.querySelectorAll(".intro.bmr .container div p.ques i")[0].click();
document.querySelectorAll(".intro.bmi .container div p.ques i")[0].click();

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

// Max Characters For Inputs
convWeight.oninput = () => (convWeight.value = convWeight.value.slice(0, 5));
convHeight.oninput = () => (convHeight.value = convHeight.value.slice(0, 5));
age.oninput = () => (age.value = age.value.slice(0, 2));
height.oninput = () => (height.value = height.value.slice(0, 5));
weight.oninput = () => (weight.value = weight.value.slice(0, 5));

// Input Focus
function focusing(element, eleHolder, eleBorder) {
    element.onfocus = () => {
        eleHolder.classList.add("has-data");
        eleBorder.classList.add("active");
    };
}
focusing(convWeight, convWHolder, convWB);
focusing(convHeight, convHHolder, convHB);
focusing(age, ageHolder, ageB);
focusing(height, heightHolder, heightB);
focusing(weight, weightHolder, weightB);

// Inputs Blur
function blurring(element, eleHolder, eleBorder) {
    element.onblur = () => {
        if (element.value === "") {
            eleHolder.classList.remove("has-data");
            eleBorder.classList.remove("active");
        }
    };
}
blurring(convWeight, convWHolder, convWB);
blurring(convHeight, convHHolder, convHB);
blurring(age, ageHolder, ageB);
blurring(height, heightHolder, heightB);
blurring(weight, weightHolder, weightB);

// PlaceHolders
convWHolder.onclick = () => convWeight.focus();
convHHolder.onclick = () => convHeight.focus();
ageHolder.onclick = () => age.focus();
heightHolder.onclick = () => height.focus();
weightHolder.onclick = () => weight.focus();

// Main Function For Creating Results Of Conversion
conv.onclick = (e) => {
    // Preventing The Button From Submitting Data
    e.preventDefault();

    // Removing All Previous Results
    document.querySelectorAll(".removeConv").forEach((ele) => ele.remove());

    // Creating Variables For Converting
    const weightKG = convWeight.value / 2.205;
    const heightCM = convHeight.value * 2.54;

    // Checking If Both Fields Are Filled In And Creating Error Message
    if (convWeight.value === "" && convHeight.value === "") {
        let convError = document.createElement("p");
        convError.className = "conv-er  removeConv";
        convError.innerHTML = `<i class="fas fa-times"></i>Please Fill In At Least One Field<i class="fas fa-times"></i>`;
        document.querySelector(".conv .container").append(convError);
    } else if (convWeight.value !== "" && convHeight.value === "") {
        let convResult = document.createElement("p");
        convResult.className = "weightConv  removeConv";
        convResult.innerHTML = `Your Weight Is <span>${
            convWeight.value
        } lbs</span> Which Equals <span>${weightKG.toFixed(1)} kg</span>`;
        document.querySelector(".conv .container").append(convResult);
    } else if (convWeight.value === "" && convHeight.value !== "") {
        let convResult = document.createElement("p");
        convResult.className = "heightConv  removeConv";
        convResult.innerHTML = `Your Height Is <span>${
            convHeight.value
        } inches</span> Which Equals <span>${heightCM.toFixed(1)} cm</span>`;
        document.querySelector(".conv .container").append(convResult);
    } else {
        let convResult = document.createElement("div");
        convResult.className = "allConv  removeConv";
        convResult.innerHTML = `<p>Your Weight Is <span>${
            convWeight.value
        } lbs</span> Which Equals <span>${weightKG.toFixed(
            1
        )} kg</span></p><p>Your Height Is <span>${
            convHeight.value
        } inches</span> Which Equals <span>${heightCM.toFixed(
            1
        )} cm</span></p>`;
        document.querySelector(".conv .container").append(convResult);
    }
};

// Main Function For Creating Results Of BMR & BMI
calc.onclick = (e) => {
    // Preventing The Button From Submitting Data
    e.preventDefault();

    // Removing All Previous Results
    document.querySelectorAll(".removeCalc").forEach((ele) => ele.remove());

    if (age.value === "" || height.value === "" || weight.value === "") {
        // Checking If All The Fields Are Filled In And Creating Error Message
        let pRes = document.createElement("p");
        pRes.className = "result-er  removeCalc";
        pRes.innerHTML = `<i class="fas fa-times"></i>Please Fill In All The Fields<i class="fas fa-times"></i>`;
        document.querySelector(".calc .container").append(pRes);
    } else {
        if (gend.value === "xy") {
            // If All Fields Are Filled & Gender Is Male
            bmr = 10 * weight.value + 6.25 * height.value - 5 * age.value + 5;
            bmi = (weight.value / (height.value / 100) ** 2).toFixed(2);
            bodyFat = (1.39 * bmi + 0.16 * age.value - 10.34 - 9).toFixed(2);
            prot = Math.round(weight.value * 1.5);
            carb = Math.round(weight.value * 6.8);
            fat = "30% Of Your Total Calories (1g of fat = 9 kCal)";
        } else if (gend.value === "xx") {
            // If All Fields Are Filled & Gender Is Female
            bmr = 10 * weight.value + 6.25 * height.value - 5 * age.value - 161;
            bmi = (weight.value / (height.value / 100) ** 2).toFixed(2);
            bodyFat = (1.39 * bmi + 0.16 * age.value - 9).toFixed(2);
            prot = Math.round(weight.value * 1.5);
            carb = Math.round(weight.value * 6.8);
            fat = "30% Of Your Total Calories (1g of fat = 9 kCal)";
        }

        // Creating BMR & BMI Result
        if (bmi < 16) {
            bmiClass = "Underweight (Severe thinness)";
        } else if (bmi >= 16 && bmi < 16.9) {
            bmiClass = "Underweight (Moderate thinness)";
        } else if (bmi >= 17 && bmi < 18.4) {
            bmiClass = "Underweight (Mild thinness)";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            bmiClass = "Normal range";
        } else if (bmi >= 25 && bmi < 29.9) {
            bmiClass = "Overweight (Pre-obese)";
        } else if (bmi >= 30 && bmi < 34.9) {
            bmiClass = "Obese (Class I)";
        } else if (bmi >= 35 && bmi < 39.9) {
            bmiClass = "Obese (Class II)";
        } else if (bmi >= 40) {
            bmiClass = "Obese (Class III)";
        }
        let calcRes = document.createElement("div");
        calcRes.className = "result removeCalc";
        calcRes.innerHTML = `<p>Your <span>BMR</span> Result Is <span>${bmr}</span></p><p>Your <span>BMI</span> Result Is <span>${bmi}</span> kg/m<sup>2</sup><span> (${bmiClass}) </span></p><p>Your <span>Body Fat</span> = <span>${bodyFat}%</span></p>`;
        document.querySelector(".calc .container").append(calcRes);

        // Creating Table For Total Calorie Need Daily
        let table = document.createElement("table");
        table.className = "calories removeCalc";
        let thead = document.createElement("thead");
        let tbody = document.createElement("tbody");
        table.append(thead);
        table.append(tbody);

        let row_1 = document.createElement("tr");

        let heading_1 = document.createElement("th");
        heading_1.innerHTML = "Activity Level";

        let heading_2 = document.createElement("th");
        heading_2.innerHTML = "Total Calorie Need Daily";

        row_1.append(heading_1);
        row_1.append(heading_2);

        thead.append(row_1);

        let row_2 = document.createElement("tr");
        let row_2_data_1 = document.createElement("td");
        row_2_data_1.innerHTML = "Sedentary (Little or No exercise)";

        let row_2_data_2 = document.createElement("td");
        row_2_data_2.innerHTML = `<span>${(bmr * 1.2).toFixed(2)}</span> kCal`;

        row_2.append(row_2_data_1);
        row_2.append(row_2_data_2);

        tbody.append(row_2);

        let row_3 = document.createElement("tr");
        let row_3_data_1 = document.createElement("td");
        row_3_data_1.innerHTML =
            "Lightly active (Light exercise 3-5 days a week)";

        let row_3_data_2 = document.createElement("td");
        row_3_data_2.innerHTML = `<span>${(bmr * 1.375).toFixed(
            2
        )}</span> kCal`;

        row_3.append(row_3_data_1);
        row_3.append(row_3_data_2);

        tbody.append(row_3);

        let row_4 = document.createElement("tr");
        let row_4_data_1 = document.createElement("td");
        row_4_data_1.innerHTML =
            "Moderately active (Moderate exercise 3-5 days a week)";

        let row_4_data_2 = document.createElement("td");
        row_4_data_2.innerHTML = `<span>${(bmr * 1.55).toFixed(2)}</span> kCal`;

        row_4.append(row_4_data_1);
        row_4.append(row_4_data_2);

        tbody.append(row_4);

        let row_5 = document.createElement("tr");
        let row_5_data_1 = document.createElement("td");
        row_5_data_1.innerHTML = "Very active (Hard exercise 6-7 days a week)";

        let row_5_data_2 = document.createElement("td");
        row_5_data_2.innerHTML = `<span>${(bmr * 1.725).toFixed(
            2
        )}</span> kCal`;

        row_5.append(row_5_data_1);
        row_5.append(row_5_data_2);

        tbody.append(row_5);

        let row_6 = document.createElement("tr");
        let row_6_data_1 = document.createElement("td");
        row_6_data_1.innerHTML =
            "Extra active (Hard exercise 6-7 days a week + physical job)";

        let row_6_data_2 = document.createElement("td");
        row_6_data_2.innerHTML = `<span>${(bmr * 1.9).toFixed(2)}</span> kCal`;

        row_6.append(row_6_data_1);
        row_6.append(row_6_data_2);

        tbody.append(row_6);

        document.querySelector(".calc .container").append(table);

        // Creating Result For Daily Need Of Protein & Carb
        let needs = document.createElement("div");
        needs.className = "needs removeCalc";
        let need_1 = document.createElement("p");
        need_1.innerHTML = `Daily <span>Protein</span> Need = <span>${prot} grams</span>`;
        needs.append(need_1);
        let need_2 = document.createElement("p");
        need_2.innerHTML = `Daily <span>Carbohydrate</span> Need = <span>${carb} grams</span>`;
        needs.append(need_2);
        let need_3 = document.createElement("p");
        need_3.innerHTML = `Daily <span>Fat</span> Need = <span>${fat}</span>`;
        needs.append(need_3);
        document.querySelector(".calc .container").append(needs);

        // Creating Note Of Bulking & Cutting
        let note = document.createElement("div");
        note.className = "note removeCalc";
        note.innerHTML = `
        <p><span>Note:</span> If you're on a <span>bulking diet</span>, <span>add 500 ~ 700 kCal</span> to your Total Calorie Need Daily.</p>
        <p><span>Note:</span> If you're on a <span>cutting diet</span>, <span>subtract 500 ~ 700 kCal</span> from your Total Calorie Need Daily.</p>
        `;
        document.querySelector(".calc .container").append(note);
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
