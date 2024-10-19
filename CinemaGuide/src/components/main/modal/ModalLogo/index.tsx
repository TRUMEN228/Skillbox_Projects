import { FC } from "react";
import logo from "../../../../assets/logo.png";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";

export const ModalLogo: FC = () => {
  const isMobile = useMaxWidthQuery(375);

  var logoStyle: React.CSSProperties = {
    width: "180px",
    height: "24px",
    marginBottom: "40px"
  };

  if (isMobile) {
    logoStyle = {
      ...logoStyle,
      marginBottom: "32px"
    };
  }

  return (
    <img src={logo} style={logoStyle} alt="CinemaGuide" />
  );
}