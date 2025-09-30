import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { Trans, useTranslation } from "react-i18next";

import { fadeIn } from "../utils/motion";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      className="bg-white dark:bg-black w-full flex items-center justify-center py-3"
      initial="hidden"
      variants={fadeIn("up", 0.2)}
      whileInView="show"
    >
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://heroui.com"
        title={t("heroui-com-homepage")}
      >
        <span className="text-default-600">
          <Trans ns="base">powered-by</Trans>
        </span>
        <p className="text-primary">Jos</p>
      </Link>
    </motion.footer>
  );
};

export default Footer;
