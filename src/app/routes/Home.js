import React          from 'react';
import Helmet         from 'react-helmet';
import LayerSlider    from '../components/home/LayerSlider';
import TopBar         from '../components/home/TopBar';
import CallToAction   from '../components/home/CallToAction';
import CustomServices from '../components/home/CustomServices';
import ArticlesCards  from '../components/home/ArticlesCards';
import Testimonials   from '../components/home/Testimonials';

export default () => (
  <div>
    <Helmet title="Metromed Urgent Care" />

    <LayerSlider/>
    <TopBar/>
    <CallToAction/>
    <CustomServices/>

    <div className='flex-container'>
      <div className='flex-container-half'>
        <ArticlesCards />
      </div>

      <div className='flex-container-half'>
        <Testimonials/>
      </div>
    </div>
  </div>
);