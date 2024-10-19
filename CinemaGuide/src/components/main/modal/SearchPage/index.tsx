import { FC } from "react";
import ReactModal from "react-modal";
import { HeaderSearch } from "../../../header/HeaderSearch";

ReactModal.setAppElement("#root");

interface ISearchPage {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchPage: FC<ISearchPage> = ({
  isOpen,
  onClose
}) => {
  const modalStyle: ReactModal.Styles = {
    overlay: {
      display: "flex",
      zIndex: "1",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    content: {
      width: "100%",
      height: "fit-content",
      padding: "16px 20px",
      backgroundColor: "transparent",
      border: "none",
      overflow: "visible",
      inset: "0"
    }
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyle}
    >
      <HeaderSearch onClose={onClose} />
    </ReactModal>
  );
}