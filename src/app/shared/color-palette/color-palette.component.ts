import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css']
})
export class ColorPaletteComponent implements OnInit {

  @Output() colorChanged: EventEmitter<string>;


  paletteOpened: boolean = false;
  numbers: number[] = Array(100).fill(0, 99).map((x, i) => i);

  //hexString = yourNumber.toString(16);


  constructor() {
    this.colorChanged = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  onSelectColor(color: string) {
    this.colorChanged.emit(color);
    this.paletteOpened = false;
  }

  onPaletteClick() {
    this.paletteOpened = !this.paletteOpened;
  }

  HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    }

    let result =  {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
    return result;
  }

  rainbow(p) {
    let rgb = this.HSVtoRGB(p / 100.0 * 0.85, 1.0, 1.0);
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
  }
}
