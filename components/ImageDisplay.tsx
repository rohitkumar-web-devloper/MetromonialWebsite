import { useMediaQuery } from "@/hooks";
import styled from "styled-components";
type ContainerProps = {
  height?: string;
};
type BlurProps = {
  src?: string;
};
const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${({ height }) => height || "250px"};
  position: relative;
  overflow: hidden;
  border-radius: "8px";
`;

const BlurredBackground = styled.div<BlurProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(5px);
  transform: scale(1.1);
  border-radius: "8px";

  /* Adding the black background overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
    border-radius: "8px";
  }
`;

const MainImage = styled.img`
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  background-size: contain;
  border-radius: 8px;
  object-fit: contain; /* Ensures the image maintains its aspect ratio */
`;
const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio */
  border-radius: 8px; /* Use correct syntax for border-radius */
`;

const MainVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-radius: 8px; /* Remove quotes */
`;

const ImageDisplay = ({ imageUrl, xs }: any) => {
  const isMobile = useMediaQuery("(max-width:715px)");
  const appliedHeight = isMobile ? xs : xs;
  return (
    <Container height={appliedHeight} className="rounded-[8px]">
      <BlurredBackground src={imageUrl} />
      <MainImage src={imageUrl} alt="Main" />


    </Container>
  );
};

export default ImageDisplay;
