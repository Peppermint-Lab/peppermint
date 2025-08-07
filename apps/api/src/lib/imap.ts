import { ImapService } from "./services/imap.service";

export const getEmails = async (): Promise<void> => {
  try {
    await ImapService.fetchEmails();
    console.log('Email fetch completed');
  } catch (error) {
    console.error('An error occurred while fetching emails:', error);
  }
};
