import { create, Text, Wrapper } from './createElement.js';

import { TimeLine, Animation } from './animation';
import { ease } from './cubicBezier';

// import css from './carousel.css';

// console.log(css);
// let style = document.createElement('style');
// style.innerHTML = css[0][1];
// document.documentElement.appendChild(style);

export class Carousel {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }

  render() {
    let position = 0;

    const timeline = new TimeLine();

    timeline.start();

    let nextPicStopHandler = null;

    const children = this.data.map((url, currentPosition) => {
      const lastPostion = (currentPosition - 1 + this.data.length) % this.data.length;
      const nextPostion = (currentPosition + 1) % this.data.length;

      let offset = 0;

      const onStart = () => {
        timeline.pause();
        clearTimeout(nextPicStopHandler);

        const currentElement = children[currentPosition];

        const currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
        offset = currentTransformValue + 500 * currentPosition; // 受动画影响的偏移量
      };

      const onPanMove = ({ detail }) => {
        const lastElement = children[lastPostion];
        const currentElement = children[currentPosition];
        const nextElement = children[nextPostion];
        const dx = detail.clientX - detail.startX;

        const currentTransformValue = -500 * currentPosition + offset + dx;
        const lastTransformValue = -500 - 500 * lastPostion + offset + dx;
        const nextTransformValue = 500 - 500 * nextPostion + offset + dx;

        currentElement.style.transform = `translateX(${currentTransformValue}px)`;
        lastElement.style.transform = `translateX(${lastTransformValue}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue}px)`;
      };

      const onPanEnd = ({ detail }) => {
        let direction = 0;
        const dx = detail.clientX - detail.startX;

        if (dx + offset > 250 || dx > 0 && event.isFlick) {
          direction = 1;
        } else if (dx + offset < -250 || dx < 0 && event.isFlick) {
          direction = -1;
        }

        timeline.reset();
        timeline.start();

        const lastElement = children[lastPostion];
        const currentElement = children[currentPosition];
        const nextElement = children[nextPostion];

        let lastAnimation; let currentAnimation; let
          nextAnimation;

        if (direction) {
          lastAnimation = new Animation(lastElement.style,
            'transform',
            -500 - 500 * lastPostion + offset + dx,
            -500 - 500 * lastPostion + direction * 500,
            500, 0, ease,
            (v) => `translateX(${v}px)`);
          currentAnimation = new Animation(currentElement.style,
            'transform',
            -500 * currentPosition + offset + dx,
            -500 * currentPosition + direction * 500,
            500, 0, ease,
            (v) => `translateX(${v}px)`);
          nextAnimation = new Animation(nextElement.style,
            'transform',
            500 - 500 * nextPostion + offset + dx,
            500 - 500 * nextPostion + direction * 500,
            500, 0, ease,
            (v) => `translateX(${v}px)`);
        }

        timeline.add(lastAnimation);
        timeline.add(currentAnimation);
        timeline.add(nextAnimation);

        position = (position - direction + this.data.length) % this.data.length;
        nextPicStopHandler = setTimeout(nextPic, 3000);
      };

      const onFlick = ({ detail }) => {
      };

      const element = <img src={url} onStart={onStart} onPanMove={onPanMove} onPanEnd={onPanEnd} onFlick={onFlick} enableGesture />;
      element.style.transform = 'translateX(0px)';
      element.addEventListener('dragstart', (event) => event.preventDefault());
      return element;
    });

    const root = (
      <div className="carousel">
        { children }
      </div>
    );

    let nextPic = () => {
      const nextPostion = (position + 1) % this.data.length;

      const current = children[position];
      const next = children[nextPostion];

      const currentAnimation = new Animation(current.style,
        'transform',
        -100 * position,
        -100 - 100 * position,
        500, 0, ease,
        (v) => `translateX(${5 * v}px)`);
      const nextAnimation = new Animation(next.style,
        'transform',
        100 - 100 * nextPostion,
        -100 * nextPostion,
        500, 0, ease,
        (v) => `translateX(${5 * v}px)`);

      timeline.add(currentAnimation);
      timeline.add(nextAnimation);

      position = nextPostion;
      nextPicStopHandler = setTimeout(nextPic, 3000);
    };
    nextPicStopHandler = setTimeout(nextPic, 3000);

    return root;
  }

  appendChild(child) {
    this.children.push(child);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
