import { defineStore } from 'pinia';
import { Howl } from 'howler';
import { seekAndPlayFromPossition, formatTime } from '@/includes/helper';


export default defineStore('player', {
    state: () => ({
        currentSong: {},
        sound: {},
        seek: '00:00',
        duration: '00:00',
        playerProgress: '0%'
    }),
    getters: {
        playing: (state) => {
            if (state.sound.playing) {
                return state.sound.playing();
            }
            return false;
        },
        isPlayingCurrentSong: (state) => {
            return (song) => {
                if (state.sound.playing && state.sound._src === song.url) {
                    return state.sound.playing();
                }
                return false;
            }
        }
    },
    actions: {
        async newSong(song) {
            if (this.sound instanceof Howl) {
                if (this.sound._src === song.url) {
                    this.toggleAudio();
                    return;
                }
                this.sound.unload();
            }
            this.currentSong = song;
            this.sound = new Howl({
                src: [song.url],
                html5: true,
            });
            this.sound.play();
            this.sound.on('play', () => {
                requestAnimationFrame(this.progress)
            })

        },
        async updateSeek(event) {
            if (!this.sound.playing) {
                return;
            }

            seekAndPlayFromPossition(this, () => {
                const { x, width } = event.currentTarget.getBoundingClientRect();
                // Document = 2000, Timeline = 1000, clientX = 1000, Distance = 500
                const clickX = event.clientX - x;
                const percentage = clickX / width;
                const seconds = this.sound.duration() * percentage;

                this.sound.seek(seconds);
                this.sound.once("seek", this.progress);
            });

        },
        progress() {
            this.seek = formatTime(this.sound.seek());
            this.duration = formatTime(this.sound.duration());

            this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`;

            if (this.sound.playing()) {
                requestAnimationFrame(this.progress)
            }
        },
        async toggleAudio() {
            if (!this.sound.playing) {
                return;
            }

            if (this.sound.playing()) {
                this.sound.pause();
            } else {
                this.sound.play();
            }
        }
    }
})

// export const seekAndPlayFromPossition = ($this, callback) => {
//     $this.sound.pause();
//     callback();
//     $this.sound.play();
// }