import React from 'react';
import CategoryCard from '../../components/LandingPage/CategoryCard/CategoryCard';
import CommentCard from '../../components/LandingPage/CommentCard/CommentCard';
import ServiceStepCard from '../../components/LandingPage/ServiceStepCard/ServiceStepCard';

function LandingPage() {
  return (
    <>
      <h1>Home</h1>
      <ServiceStepCard />
      <CommentCard />
      <CategoryCard />
    </>
  );
}

export default LandingPage;
