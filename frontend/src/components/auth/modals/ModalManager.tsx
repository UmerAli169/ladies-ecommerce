import { LoginModal } from "./LoginModal";
import { RecoverPasswordModal } from "./RecoverPasswordModal";
import { RegisterModal } from "./RegisterModal";
import { ResetPasswordModal } from "./ResetPasswordModal";

const ModalManager = ({ activeModal, closeModal, setActiveModal }: any) => {
    return (
      <>
        {activeModal === 'login' && (
          <LoginModal
            isOpen
            onClose={closeModal}
            onRecoverPassword={() => setActiveModal('recover')}
            onCreateAccount={() => setActiveModal('register')}
          />
        )}
  
        {activeModal === 'register' && (
          <RegisterModal isOpen onClose={closeModal} onLoginClick={() => setActiveModal('login')} />
        )}
  
        {activeModal === 'recover' && (
          <RecoverPasswordModal isOpen onClose={closeModal} onLoginClick={() => setActiveModal('login')} />
        )}
  
        {activeModal === 'reset' && <ResetPasswordModal isOpen onClose={closeModal} token='dummy-token' />}
      </>
    );
  };
  
  export default ModalManager;
  