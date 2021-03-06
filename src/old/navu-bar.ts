import { Component, ce, html, TemplateResult, css, property } from '@slickstream/c4/lib/core/component.js';
import { FONT_STYLE } from '@slickstream/c4/lib/core/styles';

import './navu-dot';
import './icons';
import '@slickstream/c4/lib/icon';

declare global {
  interface HTMLElementTagNameMap {
    'navu-bar': NavuBar;
  }
}

@ce('navu-bar')
export class NavuBar extends Component {
  @property({ type: Boolean }) recommendation = false;
  @property({ type: Boolean }) engaged = false;

  static styles = [
    Component.styles,
    FONT_STYLE,
    css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 16px;
      pointer-events: none;
    }
    :host::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      z-index: -1;
      box-shadow: rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px;
      transform: translateY(110%);
      opacity: 0;
      transition: opacity 0.18s ease-out, transform 0.18s ease-out;
    }
    :host(.hovering) {
      pointer-events: auto;
      --navu-dot-box-shadow: none;
    }
    :host(.hovering)::before {
      opacity: 1;
      transform: none;
    }

    #dotsContainer {
      display: inline-flex;
      flex-direction: row;
      pointer-events: auto;
    }
    #dotsContainer::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 32px;
      width: 32px;
      height: 2px;
      margin-top: -1px;
      background-color: #000;
      z-index: -1;
    }
    #currentDot {
      transition: transform 1s ease-out;
    }
    #dotsContainer.engaged #currentDot {
      color: lightblue;
      --navu-dot-default-bg: lightblue;
      transform: scale(1.25);
    }
    #nextLabel {
      background: white;
      padding: 4px 8px;
      border: 1px solid #000;
      border-radius: 4px;
      box-shadow: rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px;
      font-size: 14px;
      letter-spacing: 0.5px;
      text-transform: capitalize;
      position: relative;
      user-select: none;
      transform: translateX(-12px) scaleX(0.2);
      transition: transform 0.28s ease-out;
      transform-origin: left;
      cursor: pointer;
    }
    #nextPanel {
      padding: 0 0 0 4px;
      position: relative;
      transition: opacity 0.3s ease;
      pointer-events: none;
      opacity: 0;
    }
    #nextPanel::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -16px;
      width: 20px;
      height: 2px;
      margin-top: -1px;
      background-color: #000;
      z-index: -1;
      pointer-events: none;
    }
    #nextPanel.showing {
      pointer-events: auto;
      opacity: 1;
    }
    #nextPanel.showing #nextLabel {
      transform: translateX(0) scaleX(1);
    }
    #searchContainer {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translate3d(0, 150%, 0);
      transition: transform 0.38s ease-out;
      padding: 6px 0;
      gap: 8px;
      border-bottom: 1px solid #e5e5e5;
      color: #808080;
    }
    input {
      outline: none;
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 14px;
      color: inherit;
    }
    :host(.hovering) #searchContainer{
      transform: translate3d(0, -50%, 0);
    }
    :host(.hovering) #nextLabel {
      box-shadow: none;
    }
    :host(.hovering) #nextLabel {
      box-shadow: none;
    }
    `
  ];

  render(): TemplateResult {
    return html`
    <div id="dotsContainer" class="center ${this.engaged ? 'engaged' : ''}">
      <navu-dot></navu-dot>
      <navu-dot id="currentDot"></navu-dot>
      <div id="nextPanel" class="${this.recommendation ? 'showing' : ''}">
        <div id="nextLabel">Pricing</div>
      </div>
    </div>
    <div id="searchContainer" class="horiz center">
      <input placeholder="search">
      <cf-icon icon="search"></cf-icon>
    </div>
    `;
  }

  firstUpdated() {
    this.addEventListener('mouseenter', () => this._mouseOver());
    this.addEventListener('mouseleave', () => this._mouseOut());
    console.log('AAAAA');
  }

  private _mouseOver() {
    console.log('over');
    this.classList.add('hovering');
  }

  private _mouseOut() {
    console.log('out');
    this.classList.remove('hovering');
  }
}