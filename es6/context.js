import 'colors';

function getLines(src, index, noBefore, noAfter) {
  const beforeLines = [],
    afterLines = [];
  let thisLineStart,
    line,
    column,
    lastCutIndex = index;

  for(let i = index - 1; i >= 0; i--) {
    if (src[i] === '\n') {
      if (thisLineStart === undefined) {
        thisLineStart = i + 1;
        column = index - (i + 1);
      } else {
        beforeLines.push(src.substr(i, lastCutIndex - i));
      }
      lastCutIndex = i;
      if (beforeLines.length >= noBefore) {
        break;
      }
    }
  }
  if (thisLineStart === undefined) {
    thisLineStart = 0;
  }
  for(let i = index; i < src.length; i++) {
    if (src[i] === '\n') {
      if (line === undefined) {
        line = src.substr(thisLineStart, i - thisLineStart);
      } else {
        afterLines.push(src.substr(lastCutIndex, i - lastCutIndex));
      }
      lastCutIndex = i;
      if (afterLines.length >= noAfter) {
        break;
      }
    }
  }
  return {
    line,
    beforeLines,
    afterLines,
    column
  };
}

export default {
  getBlock(src, index, length) {
    var lineInfo = getLines(src, index, 2, 2);
    const info = lineInfo.line.substr(0, lineInfo.column) +
      lineInfo.line.substr(lineInfo.column, length).red +
        lineInfo.line.slice(lineInfo.column + length);
    return {
      info
    };
  }
};