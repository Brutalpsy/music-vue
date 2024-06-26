export const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.round(time - (minutes * 60) || 0);

    return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
};

export const seekAndPlayFromPossition = ($this, callback) => {
    $this.sound.pause();
    callback();
    $this.sound.play();
}