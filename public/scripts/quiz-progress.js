const progressBar = document.getElementById("progress-bar");

function progress(val, maxVal) {
  progressBar.value = val;
  progressBar.max = maxVal;
}

export { progress };
