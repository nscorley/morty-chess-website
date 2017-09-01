import React from 'react';
import MainNavigation from './MainNavigation';
import SectionHeader from './SectionHeader';
import Engine from './Engine';
import Download from './Download';
import About from './About';
import Methodology from './Methodology';
import Contact from './Contact';

class App extends React.Component {
  render() {
    return (
      <div>
        <MainNavigation />
        <SectionHeader />
        <Engine />
        <Methodology />
        <Download />
        <About />
        <Contact />
      </div>
    );
  }
}

export default App;
