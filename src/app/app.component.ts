import { ChangeDetectorRef, Component } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  wave: WaveSurfer = null;
  url = "https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3";

  constructor(private cdr: ChangeDetectorRef) { }

  generateWaveform(): void {
    Promise.resolve(null).then(() => {
      this.wave = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'red',
        progressColor: 'cyan',
        maxCanvasWidth: 10,
        barHeight:1,
        barWidth:10
      });

      this.wave.on('ready', () => {
        alert("I'm ready");
        this.wave.play();
      });
    });
  }

  onPreviewPressed(): void {
    if (!this.wave) {
      this.generateWaveform();
    }

    this.cdr.detectChanges();

    Promise.resolve().then(() => this.wave.load(this.url));
  }

  onStopPressed(): void {
    this.wave.stop();
  }
}
