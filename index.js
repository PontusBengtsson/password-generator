const slider = document.getElementById('range1');
const sliderValue = document.getElementById('slider-value');

// Uppdaterad händelselyssnare för slidern
slider.addEventListener('input', function() {
  const value = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = `linear-gradient(to right, #A638F6 ${value}%, #2e233d ${value}%)`;
  sliderValue.textContent = this.value;
});

// Uppdatera sliderns värde vid start
slider.value = 1;

const generatedPasswordDiv = document.getElementById("generated-password");
const generateButton = document.getElementById("generate-password");

generateButton.addEventListener("click", function () {
  console.log("Button clicked");
  const inkluderaVersalerCheckbox = document.getElementById('include-uppercase');
  const inkluderaGemenerCheckbox = document.getElementById('include-lowercase');
  const inkluderaSiffrorCheckbox = document.getElementById('include-numbers');
  const inkluderaSpecialteckenCheckbox = document.getElementById('include-symbols');

  const inkluderaVersaler = inkluderaVersalerCheckbox.checked;
  const inkluderaGemener = inkluderaGemenerCheckbox.checked;
  const inkluderaSiffror = inkluderaSiffrorCheckbox.checked;
  const inkluderaSpecialtecken = inkluderaSpecialteckenCheckbox.checked;

  let tillgangligaTecken = '';
  const gemener = 'abcdefghijklmnopqrstuvwxyz';
  const versaler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const siffror = '0123456789';
  const specialtecken = '!@#$%^&*()_+{}|:<>?-=[];,./';

  if (!inkluderaVersaler && !inkluderaGemener && !inkluderaSiffror && !inkluderaSpecialtecken) {
    alert('Vänligen välj minst ett alternativ för att generera lösenord.');
    return;
  }

  if (inkluderaVersaler) {
    tillgangligaTecken += versaler;
  }

  if (inkluderaGemener) {
    tillgangligaTecken += gemener;
  }

  if (inkluderaSiffror) {
    tillgangligaTecken += siffror;
  }

  if (inkluderaSpecialtecken) {
    tillgangligaTecken += specialtecken;
  }

  const passwordLength = parseInt(slider.value);
  const password = generatePassword(passwordLength, tillgangligaTecken);
  generatedPasswordDiv.textContent = password;

  // Update password strength
  updatePasswordStrength(password);
});

function generatePassword(length, characters) {
  let password = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    password += characters.charAt(randomIndex);
  }

  return password;
}

function updatePasswordStrength(password) {
  const strengthBoxes = [
    document.getElementById('box-1'),
    document.getElementById('box-2'),
    document.getElementById('box-3'),
    document.getElementById('box-4')
  ];
  const strengthText = document.getElementById('strength-text');

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  strengthBoxes.forEach((box, index) => {
    if (index < strength) {
      box.style.backgroundColor = '#4ABEA0';
    } else {
      box.style.backgroundColor = 'white';
    }
  });

  if (strength <= 1) {
    strengthText.textContent = 'Very Weak';
  } else if (strength == 2) {
    strengthText.textContent = 'Weak';
  } else if (strength == 3) {
    strengthText.textContent = 'Medium';
  } else if (strength == 4) {
    strengthText.textContent = 'Strong';
  } else {
    strengthText.textContent = 'Very Strong';
  }
}

// Här är din befintliga kod...

// Händelselyssnare för SVG-klick
document.querySelector('svg').addEventListener('click', function() {
  // Hämta texten från #generated-password
  const generatedPassword = document.getElementById('generated-password').textContent;

  // Skapa ett temporärt input-element för att kopiera texten till urklipp
  const tempInput = document.createElement('input');
  tempInput.value = generatedPassword;
  document.body.appendChild(tempInput);

  // Markera texten och kopiera den till urklipp
  tempInput.select();
  document.execCommand('copy');

  // Ta bort temporärt input-element
  document.body.removeChild(tempInput);

  // Visa en meddelanderuta för användaren
  const copyMessage = document.getElementById('copy-message');
  copyMessage.classList.remove('hidden');
  setTimeout(function() {
    copyMessage.classList.add('hidden');
  }, 2000); // Dölj meddelanderutan efter 2 sekunder
});
