export default (feedBackElement: HTMLHeadingElement): NodeJS.Timeout => {
  feedBackElement.innerText = "Loading";
  let dotCount = 0;
  return setInterval(() => {
    if (dotCount === 3){
      feedBackElement.innerText = "Loading";
      dotCount = 0;
    }

    feedBackElement.innerText += ".";
    dotCount++;
  }, 500);

}