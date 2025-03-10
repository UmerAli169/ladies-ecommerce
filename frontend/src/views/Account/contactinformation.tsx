"use client"

import AccountLayout from "../../app/(screens)/Account/AccountLayout/page";
import ContactInformationForm from '../../app/(screens)/Account/ContactInformationForm/page'

const ContactInformation = () => {
  return (
    <AccountLayout>
      <ContactInformationForm />
    </AccountLayout>
  );
};

export default ContactInformation;
