export const useKoreanAffix = (str: string, type: '은는' | '이가' | '과와' | '을를') => {
  const lastChar = str.charCodeAt(str.length - 1);
  const hasLast = (lastChar - 0xac00) % 28;
  switch (type) {
    case '은는':
      return hasLast ? '은' : '는';
    case '이가':
      return hasLast ? '이' : '가';
    case '과와':
      return hasLast ? '과' : '와';
    case '을를':
      return hasLast ? '을' : '를';
  }
};
