import React from 'react';
import AboutUsCard from '../../components/LandingPage/AboutUsCard/AboutUsCard';
import CarouselCard from '../../components/LandingPage/CarouselCard/CarouselCard';
import CategoryCard from '../../components/LandingPage/CategoryCard/CategoryCard';
import CommentCard from '../../components/LandingPage/CommentCard/CommentCard';
import ServiceStepCard from '../../components/LandingPage/ServiceStepCard/ServiceStepCard';

function LandingPage() {
  return (
    <>
      <CarouselCard />
      <AboutUsCard />
      <ServiceStepCard />
      <CommentCard />
      <CategoryCard />
    </>
  );
}

export default LandingPage;
