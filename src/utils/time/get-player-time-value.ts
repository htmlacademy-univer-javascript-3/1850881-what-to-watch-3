export const getPlayerTimeValue = (seconds: number): string => {
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor((seconds % (60 * 60)) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  if (seconds / 60 / 60 >= 1) {
    return `-${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  return `-${formattedMinutes}:${formattedSeconds}`;
};
