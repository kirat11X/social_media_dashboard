
/* 
The first time the page is loaded, the color mode set on the preference 
is used and set as 'default' in the local storage. 
Changing the default preferences works the same way as changing the 
color mode using the buttons, if the page is loaded.
When the page is reloaded, whatever is the value set on the local storage
has precedence over the values in the preference. If the preference
changed after the page was visited - and the page is not loaded - 
the last value saved on the local storage is loaded. 
*/

const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');

const applyColorMode = (mode) => {
  document.body.classList.remove('dark', 'light');
  document.body.classList.add(mode);

  darkButton.checked = mode === 'dark';
  lightButton.checked = mode === 'light';

  localStorage.setItem('colorMode', mode);
};

const colorModeFromLocalStorage = () => {
  return localStorage.getItem('colorMode');
};

const colorModeFromPreferences = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'; // If preference is set or does not match anything (light is default)
};

const loadAndUpdateColor = () => {
  // local storage has precendence over the prefers-color-scheme
  const color = colorModeFromLocalStorage() || colorModeFromPreferences();
  applyColorMode(color);
};

// when the inputs are clicked, check which radio button is checked and change the color
darkButton.addEventListener('change', () => {
  if (darkButton.checked) {
    applyColorMode('dark');
  }
});

lightButton.addEventListener('change', () => {
  if (lightButton.checked) {
    applyColorMode('light');
  }
});

// when the prefers-color-scheme changes, this event will be emitted
// event reflects the media query, if it matches, the new color is dark, else it is light
window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        applyColorMode(event.matches ? 'dark' : 'light');
      });
      
// Load the right color on startup - localStorage has precedence
loadAndUpdateColor();
