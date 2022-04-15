export const getYoutubeId = (url: string) => {
  if (!url) {
    return '';
  }
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  const id = match ? match[1] : '';
  return id;
};
