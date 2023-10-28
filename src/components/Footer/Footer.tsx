import styles from './Footer.module.scss';

import githubLogo from '../../assets/icons/github-icon.svg';
import gmailIcon from '../../assets/icons/gmail-icon.svg';
import telegramIcon from '../../assets/icons/telegram-icon.svg';

export const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.FooterLinkWrapper}>
                <img className={styles.FooterLinkIcon} src={telegramIcon} alt="telegram-icon" />
                <a
                    href="https:/t.me/iSvitka"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.FooterLink}
                >
                    iSvitka
                </a>
            </div>
            <div className={styles.FooterLinkWrapper}>
                <img className={styles.FooterLinkIcon} src={gmailIcon} alt="gmail-icon" />
                <a
                    href="https:/github.com/isvitka"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.FooterLink}
                >
                    svitka.ilya@gmail.com
                </a>
            </div>
            <div className={styles.FooterLinkWrapper}>
                <img className={styles.FooterLinkIcon} src={githubLogo} alt="github-icon" />
                <a
                    href="https:/mailto:svitka.ilya@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.FooterLink}
                >
                    iSvitka
                </a>
            </div>
        </footer>
    )
}