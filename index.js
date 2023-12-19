const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("slider-value");

// Update the current slider value (displayed next to "Character Length")
slider.addEventListener("input", function() {
  sliderValue.textContent = this.value;
});