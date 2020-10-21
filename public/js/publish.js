// Blocks are the sections that contain different forms
//  
// Height is the amount pixels from block to the bottom
// 
window.blockOneTop = 0
window.blockTwoTop = 100
window.blockThreeTop = 200
window.blockFourTop = 300

// Increasing height makes page goes up

const IncreaseHeight = () => {
    if (window.blockOneTop < 0) {
        window.blockOneTop += 100
        window.blockTwoTop += 100
        window.blockThreeTop += 100
        window.blockFourTop += 100
        const blockOne = document.getElementById("property-information")
        const blockTwo = document.getElementById("facilities")
        const blockThree = document.getElementById("pricing")
        const blockFour = document.getElementById("photos")
        blockOne.style.top = window.blockOneTop + "%"
        blockTwo.style.top = window.blockTwoTop + "%"
        blockThree.style.top = window.blockThreeTop + "%"
        blockFour.style.top = window.blockFourTop + "%"
    }

    // Set the step value in header
    let stepValue = Number(document.getElementById("stepNumber").innerHTML)
    if (stepValue > 1) {
        document.getElementById("stepNumber").innerHTML = stepValue - 1;
    }
    CheckFields()
}

const DecreaseHeight = () => {
    if (window.blockFourTop > 0) {
        window.blockOneTop -= 100
        window.blockTwoTop -= 100
        window.blockThreeTop -= 100
        window.blockFourTop -= 100
        const blockOne = document.getElementById("property-information")
        const blockTwo = document.getElementById("facilities")
        const blockThree = document.getElementById("pricing")
        const blockFour = document.getElementById("photos")
        blockOne.style.top = window.blockOneTop + "%"
        blockTwo.style.top = window.blockTwoTop + "%"
        blockThree.style.top = window.blockThreeTop + "%"
        blockFour.style.top = window.blockFourTop + "%"
    }

    // Set the step value in header
    let stepValue = Number(document.getElementById("stepNumber").innerHTML)
    if (stepValue < 4) {
        document.getElementById("stepNumber").innerHTML = stepValue + 1;
    }

    CheckFields()
}

// Assigning borders to box-btns

document.getElementById("heatBox").style.border = "2px solid rgb(230, 230, 230)"
document.getElementById("waterBox").style.border = "2px solid rgb(230, 230, 230)"
document.getElementById("gasBox").style.border = "2px solid rgb(230, 230, 230)"
document.getElementById("airConditioningBox").style.border = "2px solid rgb(230, 230, 230)"

const SelectBox = (value) => {
    let checkBox = document.getElementById(value)
    if (checkBox.checked) {
        checkBox.checked = false
    } else {
        checkBox.checked = true
    }

    let checkBoxBtn = document.getElementById(value + "Box")
    if (checkBoxBtn.style.border == "2px solid rgb(230, 230, 230)") {
        checkBoxBtn.style.border = "2px solid rgb(55, 213, 224, 0.5)"
    } else {
        checkBoxBtn.style.border = "2px solid rgb(230, 230, 230)"
    }

}

const Navigate = (step) => {
    // Find where the screen should navigate 
    let position = window.blockOneTop / 100
    let move = position + step

    // Navigate 
    if (move > 0) {
        for (let i = 0; i < move; i++) {
            DecreaseHeight()
        }
    } else if (move < 0) {
        for (let i = 0; i < -move; i++) {
            IncreaseHeight()
        }
    }
}

// Every time position changes, check if the fields are valid
const CheckFields = () => {
    // Blocks
    const blockOne = document.getElementById("property-information")
    const blockTwo = document.getElementById("facilities")
    const blockThree = document.getElementById("pricing")
    const blockFour = document.getElementById("photos")

    // Fields 
    const descriptionField = document.getElementById("description").value
    const priceField = document.getElementById("price").value
    const photoField = document.getElementById("image").value
    const heat = document.getElementById("heat").checked
    const water = document.getElementById("water").checked
    const gas = document.getElementById("gas").checked
    const airConditioning = document.getElementById("airConditioning").checked
    let facilities = [
        heat,
        water,
        gas,
        airConditioning
    ]



    let messages = []

    // Record of correct/incorrect blocks
    let correctBlocks = {
        propertyInformation: {
            description: false,
        },
        facilities: {
            enoughFacilities: false,
        },
        pricingDetails: {
            price: false,
        },
        propertyPhotos: {
            photo: false,
        }
    }

    // Validations to record them into the correctBlocks list
    // Property information validation
    if (descriptionField.length == 0) {
        messages.push("Description can't be empty \n")
        correctBlocks.propertyInformation.description = false
    } else {
        correctBlocks.propertyInformation.description = true
    }

    // Facilities validation
    let facilitiesNumber = 0
    facilities.forEach(facility => {
        if (facility) {
            facilitiesNumber++
        }
        if (facilitiesNumber > 1) {
            correctBlocks.facilities.enoughFacilities = true
        } else {
            correctBlocks.facilities.enoughFacilities = false
        }
    });

    // Pricing details validation
    if (priceField.length == 0) {
        messages.push("Price can't be empty \n")
        correctBlocks.pricingDetails.price = false
    } else {
        correctBlocks.pricingDetails.price = true
    }

    // Property photos validation
    if (photoField.length == 0) {
        messages.push("Please include a photo \n")
        correctBlocks.propertyPhotos.photo = false
    } else {
        correctBlocks.propertyPhotos.photo = true
    }

    // Block 1:
    if (correctBlocks.propertyInformation.description) {
        document.getElementById("completedBlockOne").classList.remove("d-none")
        document.getElementById("notCompletedBlockOne").classList.add("d-none")
    } else {
        document.getElementById("completedBlockOne").classList.add("d-none")
        document.getElementById("notCompletedBlockOne").classList.remove("d-none")
    }

    // Block 2
    if (correctBlocks.facilities.enoughFacilities) {
        document.getElementById("completedBlockTwo").classList.remove("d-none")
        document.getElementById("notCompletedBlockTwo").classList.add("d-none")
    } else {
        document.getElementById("completedBlockTwo").classList.add("d-none")
        document.getElementById("notCompletedBlockTwo").classList.remove("d-none")
    }

    // Block 3
    if (correctBlocks.pricingDetails.price) {
        document.getElementById("completedBlockThree").classList.remove("d-none")
        document.getElementById("notCompletedBlockThree").classList.add("d-none")
    } else {
        document.getElementById("completedBlockThree").classList.add("d-none")
        document.getElementById("notCompletedBlockThree").classList.remove("d-none")
    }

    // Block 4
    if (correctBlocks.propertyPhotos.photo) {
        document.getElementById("completedBlockFour").classList.remove("d-none")
        document.getElementById("notCompletedBlockFour").classList.add("d-none")
    } else {
        document.getElementById("completedBlockFour").classList.add("d-none")
        document.getElementById("notCompletedBlockFour").classList.remove("d-none")
    }

    // Check if all of the fields are correct
    // Then, change Next button to Submit
    if (
        correctBlocks.propertyPhotos.photo
        && correctBlocks.propertyInformation.description
        && correctBlocks.facilities.enoughFacilities
        && correctBlocks.pricingDetails.price 
        && Number(document.getElementById("stepNumber").innerHTML) == 4
    ) {
        // document.getElementById("submitBtn").classList.add = "d-none"
        // document.getElementById("submitBtnFake").classList.remove = "d-none"
        setTimeout(() => { 
            document.getElementById("nextSubmitBtn").innerHTML = "Submit"
        }, 10)
    } else {
        // document.getElementById("submitBtn").classList.remove = "d-none"
        // document.getElementById("submitBtnFake").classList.add = "d-none"
        document.getElementById("nextSubmitBtn").innerHTML = "Next"
    }

}

const nextToSubmit = () => {
    if (document.getElementById("nextSubmitBtn").innerHTML == "Submit" && Number(document.getElementById("stepNumber").innerHTML) == 4) {
        document.getElementById('submitBtn').click()
    }
}

const displayErrors = () => {
    let errors = []
    if (document.getElementById("completedBlockOne").classList.contains("d-none")) {
        errors.push("property info")
    }
    if (document.getElementById("completedBlockTwo").classList.contains("d-none")) {
        errors.push("facilities")
    }
    if (document.getElementById("completedBlockThree").classList.contains("d-none")) {
        errors.push("pricing")
    }
    if (document.getElementById("completedBlockFour").classList.contains("d-none")) {
        errors.push("photos")
    }
    if (errors.length > 0) {
        if (errors.length==1) {
            document.getElementsByClassName("text-danger")[0].innerHTML = "Missing: " + errors[0]
        }else{
            let message = "Missing: "
            for (let i = 0; i < errors.length; i++) {
                if (i == errors.length-1) {
                    message += errors[i]
                } else {
                    message += errors[i] + ", "
                }
            }
            document.getElementsByClassName("text-danger")[0].innerHTML = message
        }
    }else{
        document.getElementById('submitBtn').click()
    }
}
