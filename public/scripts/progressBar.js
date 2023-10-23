const progbar = document.querySelector(".prog-bar");

const progress = document.querySelector("progress");
const height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  console.log(progbar.getBoundingClientRect().y);
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  progress.value = (scrollTop / height) * 100;
});
