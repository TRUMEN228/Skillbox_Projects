import { FC } from "react";
import "./style.css";

interface ISocialsListItem {
  children: React.ReactNode;
  href: string;
}

export const SocialsListItem: FC<ISocialsListItem> = ({
  children,
  href
}) => {
  return (
    <li className="footer-socials__item">
      <a href={href}>{children}</a>
    </li>
  );
}