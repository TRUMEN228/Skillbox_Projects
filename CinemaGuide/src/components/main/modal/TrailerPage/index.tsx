import { FC } from "react";
import ReactModal from "react-modal";
import { TrailerView } from "../TrailerView";
import { Movie } from "../../../../api/types";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";
import { TrailerCloseButton } from "../TrailerCloseButton";

interface ITrailerPage {
  isOpen: boolean;
  film: Movie;
  onClose: () => void;
}

ReactModal.setAppElement("#root");

export const TrailerPage: FC<ITrailerPage> = ({
  isOpen,
  film,
  onClose
}) => {
  const isMobile = useMaxWidthQuery(375);

  var modalTrailerStyle: ReactModal.Styles = {
    overlay: {
      display: "flex",
      zIndex: "1",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(10, 11, 11, 0.5)"
    },
    content: {
      position: "relative",
      padding: "0",
      width: "960px",
      height: "540px",
      margin: "0 auto",
      backgroundColor: "#393b3c",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      borderRadius: "0",
      zIndex: "1",
      overflow: "visible"
    }
  };

  if (isMobile) {
    modalTrailerStyle = {
      overlay: {
        ...modalTrailerStyle.overlay,
        backgroundColor: "rgba(10, 11, 11, 0.9)"
      },
      content: {
        ...modalTrailerStyle.content,
        width: "100%",
        height: "212px",
        inset: "0",
        border: "none"
      }
    }
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalTrailerStyle}
    >
      <TrailerView film={film}/>
      <TrailerCloseButton onClick={onClose} />
    </ReactModal>
  );
}