export const getRemainderTime = function getRemainderTime(startTime) {
  // 请求数据未返回时显示默认，如果不设置则会报错no replace
  if (!startTime) {
    startTime = "2019-4-1 10:00:00";
  }
  let s1 = new Date(startTime.replace(/-/g, "/")),
    s2 = new Date(),
    runTime = parseInt((s2.getTime() - s1.getTime()) / 1000);
  let year = Math.floor(runTime / 86400 / 365);
  runTime = runTime % (86400 * 365);
  let month = Math.floor(runTime / 86400 / 30);
  runTime = runTime % (86400 * 30);
  let day = Math.floor(runTime / 86400);
  runTime = runTime % 86400;
  let hour = Math.floor(runTime / 3600);
  runTime = runTime % 3600;
  let minute = Math.floor(runTime / 60);
  runTime = runTime % 60;
  let second = runTime;
  return {
    year,
    month,
    day,
    hour,
    minute,
    second
  }
};