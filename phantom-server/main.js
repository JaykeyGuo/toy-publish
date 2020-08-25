import { create, Text, Wrapper } from './createElement.js';

const element = (
  <div>
    <span>hello world</span>
  </div>
);
element.mountTo(document.body);

// import { Carousel } from './carousel.js';
// import { Panel } from './panel.js';
// import { TabPanel } from './tabPanel.js';
// import { ListView } from './listView.js';

// 轮播图组件
// let carousel = <Carousel data={[
//   "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
//   "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
//   "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
//   "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
// ]}>
// </Carousel>;
// carousel.mountTo(document.body);

// 容器组件
// let panel = <Panel title="this is title">
// <span>this is content</span>
// </Panel>
// panel.mountTo(document.body);

// Tab 容器组件
// let tabPanel = <TabPanel>
// <span title="title 1">this is content 1</span>
// <span title="title 2">this is content 2</span>
// <span title="title 3">this is content 3</span>
// <span title="title 4">this is content 4</span>
// </TabPanel>
// tabPanel.mountTo(document.body);

// 子元素式的组件
// let carouselView = <CarouselView>=
// </CarouselView>

// let data = [
//   { title: '蓝猫', url: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg" },
//   { title: '白猫', url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg" },
//   { title: '花猫', url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg" },
//   { title: '橘猫', url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg" },
// ]

// let listView = <ListView data={data}>
//   {
//     record => <figure>
//       <img src={record.url}></img>
//       <figcaption>{record.title}</figcaption>
//     </figure>
//   }
// </ListView>
// listView.mountTo(document.body);
