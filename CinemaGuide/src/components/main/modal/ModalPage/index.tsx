import { FC, useState } from "react";
import { ModalAuthPage } from "../ModalAuthPage";
import ReactModal from "react-modal";
import { ModalRegPage } from "../ModalRegPage";
import { ModalCloseButton } from "../ModalCloseButton";
import { RegCompletePage } from "../RegCompletePage";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";

ReactModal.setAppElement("#root");

interface IModalPage {
  isOpen: boolean;
  refetchUser: () => Promise<void>;
  onClose: () => void;
}

export const ModalPage: FC<IModalPage> = ({
  isOpen,
  refetchUser,
  onClose
}) => {
  const [modalType, setModalType] = useState<"reg" | "auth" | "success">("auth");
  const isMobile = useMaxWidthQuery(375);

  const switchType = (type: "reg" | "auth" | "success") => {
    if (modalType === type) {
      return;
    }

    setModalType(type);
  }

  const handleModalClose = () => {
    onClose();
    setModalType("auth");
  }

  var modalAuthStyle: ReactModal.Styles = {
    overlay: {
      display: "flex",
      zIndex: "1",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(10, 11, 11, 0.5)"
    },
    content: {
      position: "relative",
      padding: "64px 40px",
      width: "420px",
      height: "fit-content",
      margin: "0 auto",
      borderRadius: "24px",
      zIndex: "1",
      overflow: "visible"
    }
  };

  if (isMobile) {
    modalAuthStyle = {
      ...modalAuthStyle,
      content: {
        ...modalAuthStyle.content,
        width: "335px",
        padding: "64px 20px",
        paddingBottom: "32px",
        inset: "0"
      },
    }
  }

  switch (modalType) {
    case "auth":
      return (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={handleModalClose}
          style={modalAuthStyle}
        >
          <ModalAuthPage onSwitchType={switchType} onClose={handleModalClose} refetchUser={refetchUser}/>
          <ModalCloseButton onClick={handleModalClose}/>
        </ReactModal>
      );
    case "reg":
      return (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={handleModalClose}
          style={modalAuthStyle}
        >
          <ModalRegPage onSwitchType={switchType}/>
          <ModalCloseButton onClick={handleModalClose}/>
        </ReactModal>
      );
    case "success":
      return (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={handleModalClose}
          style={modalAuthStyle}
        >
          <RegCompletePage onSwitchType={switchType}/>
        </ReactModal>
      );
  }
}