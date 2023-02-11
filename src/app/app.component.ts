import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title: string = 'Secret Key Generator';
  @ViewChild('lengthSlider') lengthSliderRef: ElementRef | undefined;
  @ViewChild('copyIcon') copyIconRef: ElementRef | undefined;
  @ViewChild('secretKeyInput') secretKeyInputRef: ElementRef | undefined;
  @ViewChild('indicator') indicatorRef: ElementRef | undefined;
  @ViewChild('indicatorText') indicatorTextRef: ElementRef | undefined;
  @ViewChild('gBtn') gBtnRef: ElementRef | undefined;
  @ViewChild('lengthIndicator') lengthIndicatorRef: ElementRef | undefined;
  @ViewChildren('option') optionsRef: QueryList<any> | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.lengthSlider = this.lengthSliderRef?.nativeElement;
    this.options = this.optionsRef?.toArray();
    this.copyIcon = this.copyIconRef?.nativeElement;
    this.secretKeyInput = this.secretKeyInputRef?.nativeElement;
    this.indicator = this.indicatorRef?.nativeElement;
    this.indicatorText = this.indicatorTextRef?.nativeElement;
    this.gerenateBtn = this.gBtnRef?.nativeElement;
    this.lengthIndicator = this.lengthIndicatorRef?.nativeElement;
  }

  lengthSlider: HTMLInputElement | undefined;
  options: HTMLInputElement[] | undefined;
  copyIcon: HTMLSpanElement | undefined;
  secretKeyInput: HTMLInputElement | undefined;
  indicator: HTMLDivElement | undefined;
  indicatorText: HTMLDivElement | undefined;
  gerenateBtn: HTMLButtonElement | undefined;
  lengthIndicator: HTMLSpanElement | undefined;

  charcters: any = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!$%&|[](){}:;.,*+-#@<>~',
  };

  generatePassword(): void {
    let staticPassword = '',
      randompassword = '',
      excludeDuplicate = false;

    this.options?.forEach((option: any) => {
      if (option.nativeElement.checked) {
        if (
          option.nativeElement.id !== 'exc-duplicate' &&
          option.nativeElement.id !== 'spaces'
        ) {
          staticPassword += this.charcters[option.nativeElement.id];
        } else if (option.nativeElement.id === 'spaces') {
          staticPassword += ` ${staticPassword} `;
        } else {
          excludeDuplicate = true;
        }
      }
    });

    for (let i = 0; i < +this.lengthSlider!.value; i++) {
      let randomChar =
        staticPassword[Math.floor(Math.random() * staticPassword.length)];
      if (excludeDuplicate) {
        !randompassword.includes(randomChar) || randomChar === ' '
          ? (randompassword += randomChar)
          : i--;
      } else {
        randompassword += randomChar;
      }
    }

    this.secretKeyInput!.value = randompassword;
  }

  updateIndicator(): void {
    this.indicator!.id =
      +this.lengthSlider!.value <= 8
        ? 'weak'
        : +this.lengthSlider!.value <= 16
        ? 'medium'
        : 'strong';
    this.indicatorText!.innerText =
      +this.lengthSlider!.value <= 8
        ? 'weak'
        : +this.lengthSlider!.value <= 16
        ? 'medium'
        : 'strong';
  }

  updateSlider(): void {
    this.lengthIndicator!.innerText = this.lengthSlider!.value;
    this.generatePassword();
    this.updateIndicator();
  }

  copySecretKey(): void {
    navigator.clipboard.writeText(this.secretKeyInput!.value);
    this.copyIcon!.innerText = 'check';
    this.copyIcon!.style.color = '#4285f4';
    setTimeout(() => {
      this.copyIcon!.innerText = 'copy_all';
      this.copyIcon!.style.color = '#707070';
    }, 1500);
  }
}
