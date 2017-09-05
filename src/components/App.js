import React from 'react';
import MainNavigation from './MainNavigation';
import SectionHeader from './SectionHeader';
import Engine from './Engine';
import Download from './Download';
import About from './About';
import Methodology from './Methodology';
import Contact from './Contact';
import Scroll, { scroller } from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()

let Element = Scroll.Element;
let scroll = Scroll.animateScroll;

class App extends React.Component {
  scrollToElement = to => {
    scroller.scrollTo(to, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -50,
    });
  };
  render() {
    return (
      <div>
        <MainNavigation scrollToElement={this.scrollToElement} />
        <Element name="section-header">
          <SectionHeader scrollToElement={this.scrollToElement} />
        </Element>
        <Element name="engine">
          <Engine />
        </Element>
        <Element name="methodology">
          <Methodology />
        </Element>
        <Element name="download">
          <Download />
        </Element>
        <Element name="about">
          <About />
        </Element>
        <Element name="contact">
          <Contact />
        </Element>
      </div>
    );
  }
}

export default App;
