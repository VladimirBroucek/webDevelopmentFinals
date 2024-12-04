const packageForm = document.getElementById("package-form");
const errorMessage = document.getElementById("error-message");
const packageTable = document.querySelector("#package-table tbody");

let packages = [];

//Function for validation (inputs)
function validateInput(name, id, address, weight) {
    if (!/^[A-Za-z\s]+$/.test(name)) {
        return "Recipient Name must contain only alphabetic characters.";
    }
    if (!/^\d+$/.test(id)) {
        return "Package ID must be a numeric value.";
    }
    if (!address.trim()) {
        return "Delivery Address cannot be empty.";
    }
    if (!/^\d+(\.\d+)?$/.test(weight) || parseFloat(weight) <= 0) {
        return "Weight must be a positive numeric value.";
    }
    return null;
}
//Function for generating tracking code based on packageId and weight of the package
function generateTrackingCode(packageId, weight) {
    return (packageId << 4 | weight).toString(2);
}

function addPackage(event) {
    event.preventDefault();
    // Here I used trim main reason was to cut the white spaces around the values
    const name = document.getElementById("recipient-name").value.trim();
    const packageId = document.getElementById("package-id").value.trim();
    const address = document.getElementById("delivery-address").value.trim();
    const weight = document.getElementById("weight").value.trim();

    const validationError = validateInput(name, packageId, address, weight);
    if (validationError) {
        errorMessage.textContent = `Error: ${validationError}`;
        return;
    }

    errorMessage.textContent = "";

    const trackingCode = generateTrackingCode(parseInt(packageId, 10), parseInt(weight, 10));
    // Creation of each package
    packages.push({ name, packageId, address, weight: parseFloat(weight), trackingCode });

    displayPackages();
    packageForm.reset();
}
//Function for creation new row in table with data of the package
function displayPackages() {
    //First of all sorting
    packages.sort((a, b) => a.weight - b.weight);
    packageTable.innerHTML = packages
        .map(
            (pkg) => `
    <tr>
      <td>${pkg.name}</td>
      <td>${pkg.packageId}</td>
      <td>${pkg.address}</td>
      <td>${pkg.weight}</td>
      <td>${pkg.trackingCode}</td>
    </tr>
  `
        )
        .join("");
}

packageForm.addEventListener("submit", addPackage);
