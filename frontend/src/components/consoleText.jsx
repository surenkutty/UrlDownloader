// src/ConsoleText.jsx
import React, { useEffect } from 'react';
import '../assets/css/animation.css';



const ConsoleText = ({ words, id, colors }) => {
  useEffect(() => {
    function consoleText(words, id, colors) {
      if (colors === undefined) colors = ['#fff'];
      let visible = true;
      const con = document.getElementById('console');
      let letterCount = 1;
      let x = 1;
      let waiting = false;
      const target = document.getElementById(id);
      target.setAttribute('style', 'color:' + colors[0]);

      window.setInterval(function() {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          window.setTimeout(function() {
            const usedColor = colors.shift();
            colors.push(usedColor);
            const usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0]);
            letterCount += x;
            waiting = false;
          }, 2000); // Pause between words (increased to 2000ms for a slower effect)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function() {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 2000); // Pause at the end of each word (increased to 2000ms for a slower effect)
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 200); // Typing speed (increased to 200ms for a slower effect)

      window.setInterval(function() {
        if (visible === true) {
          con.className = 'console-underscore hidden';
          visible = false;
        } else {
          con.className = 'console-underscore';
          visible = true;
        }
      }, 400); // Blinking cursor speed
    }

    consoleText(words, id, colors);
  }, [words, id, colors]);

  return (
    <div className="console-container">
      <span id={id}></span>
      <div className="console-underscore" id="console">&#95;</div>
    </div>
  );
};

export default ConsoleText;
