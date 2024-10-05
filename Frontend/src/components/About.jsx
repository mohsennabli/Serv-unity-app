import React, { useState } from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
   
`;

const AboutContent = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const AboutHeading = styled.h1`
  font-size: 2.5rem;
  color: white;  /* White text */
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
`;

const AboutParagraph = styled.p`
  font-size: 1.2rem;
  color: white;  /* White text */
  line-height: 1.8;
  margin-bottom: 20px;
`;

const MissionStatement = styled.p`
  font-size: 1.2rem;
  color: white;  /* White text */
  line-height: 1.8;
  margin-top: 20px;
`;

const TutorialContainer = styled.div`
  flex: 1;
`;

const TutorialHeading = styled.h2`
  font-size: 2rem;
  color: white;  /* White text */
  margin-top: 40px;
`;

const TutorialImage = styled.img`
  max-width: 100%;
  margin-top: 20px;
`;

const TutorialDescription = styled.p`
  font-size: 1.2rem;
  color: white;  /* White text */
  line-height: 1.8;
`;

const TutorialButton = styled.span`
  font-size: 1.2rem;
  color: #6e88a4;  /* Keep the button blue for visual interest */
  text-decoration: underline;
  cursor: pointer;
`;

const ContactLink = styled.a`
  font-size: 1.2rem;
  color: #6e88a4;  /* Keep the link blue for consistency */
  text-decoration: underline;
  cursor: pointer;
`;

const About = ({setActiveTab}) => {
  const [showConsumerTutorial, setShowConsumerTutorial] = useState(false);
  const [showOwnerTutorial, setShowOwnerTutorial] = useState(false);

  return (
    <AboutContainer>
      <AboutContent>
        <AboutHeading>About Us</AboutHeading>
        <AboutParagraph>
          Welcome to <strong>ServUnity</strong>, your number one source for connecting service providers with consumers efficiently. If you're new here, we recommend checking out our <TutorialButton onClick={() => setShowConsumerTutorial(!showConsumerTutorial)}>Consumer Tutorial</TutorialButton> or <TutorialButton onClick={() => setShowOwnerTutorial(!showOwnerTutorial)}>Owner Tutorial</TutorialButton> to learn more about how to use our platform.
        </AboutParagraph>
        <MissionStatement>At ServUnity, our mission is to <em>revolutionize</em> the way service providers find clients and consumers find services. We are committed to simplifying the connection process using technology to save businesses time and money while providing consumers with quick and secure access to the services they need. We believe that our platform will contribute to the growth of small businesses, job creation, and enhance the service search experience for all.</MissionStatement>
        <AboutParagraph>
          For more information <ContactLink  onClick={() => setActiveTab('contact')}>contact us </ContactLink>.
        </AboutParagraph>
      </AboutContent>

      <TutorialContainer>
        {showConsumerTutorial && (
          <div>
            <TutorialHeading>Consumer Tutorial</TutorialHeading>
            
            <TutorialDescription>
              As a consumer, you can browse and search for services that meet your needs. Once you find a service, you can view details and contact the service provider for more information.
            </TutorialDescription>
          </div>
        )}

        {showOwnerTutorial && (
          <div>
            <TutorialHeading>Owner Tutorial</TutorialHeading>
            
            <TutorialDescription>
              As a service provider, you can list your services on ServUnity. Simply sign up, add your services, and connect with consumers who are looking for what you offer.
            </TutorialDescription>
          </div>
        )}
      </TutorialContainer>
    </AboutContainer>
  );
}

export default About;