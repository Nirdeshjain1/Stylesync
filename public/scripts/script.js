document.addEventListener("DOMContentLoaded", () => {
    // Visual representations for body shape and skin tone
    const bodyShapeDropdown = document.getElementById("body_shape");
    const skinToneDropdown = document.getElementById("skin_tone");
    const bodyShapePreview = document.getElementById("body_shape_preview");
    const skinTonePreview = document.getElementById("skin_tone_preview");
  
    // Object mapping for visual previews
    const bodyShapeImages = {
      hourglass: "hourglass.png",
      rectangle: "rectangle.png",
      pear: "pear.png",
      apple: "apple.png",
    };
  
    const skinToneImages = {
      warm: "warm_veins.png",
      cool: "cool_veins.png",
      neutral: "neutral_veins.png",
    };
  
    // Update the visual representation of body shapes
    if (bodyShapeDropdown) {
      bodyShapeDropdown.addEventListener("change", (event) => {
        const selectedShape = event.target.value;
        bodyShapePreview.src = `/images/${bodyShapeImages[selectedShape]}`;
      });
    }
  
    // Update the visual representation of skin tones
    if (skinToneDropdown) {
      skinToneDropdown.addEventListener("change", (event) => {
        const selectedTone = event.target.value;
        skinTonePreview.src = `/images/${skinToneImages[selectedTone]}`;
      });
    }
  
    // Highlight selected clothing items and accessories
    const itemCheckboxes = document.querySelectorAll(".item-checkbox");
    const selectedItems = [];
  
    itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const itemName = event.target.dataset.itemName;
        if (event.target.checked) {
          selectedItems.push(itemName);
        } else {
          const index = selectedItems.indexOf(itemName);
          if (index > -1) selectedItems.splice(index, 1);
        }
        console.log("Selected items:", selectedItems);
      });
    });
  
    // Submit preferences
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (event) => {
        // Optional: Add client-side validation or other features
        console.log("Form submitted with preferences!");
      });
    }
  });
// Dynamic previews for body shape and skin tone
document.getElementById('body_shape').addEventListener('change', function () {
    const shape = this.value;
    document.getElementById('body_shape_preview').src = `/images/body_shapes/${shape}.png`;
  });
  
  document.getElementById('skin_tone').addEventListener('change', function () {
    const tone = this.value;
    document.getElementById('skin_tone_preview').src = `/images/skin_tones/${tone}.png`;
  });
  