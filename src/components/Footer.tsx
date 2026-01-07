import { motion } from "framer-motion";
import { Link } from "@heroui/link";

import { fadeIn } from "../utils/motion";

const Footer = () => {
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
        href="https://josedvargas.vercel.app"
        title="josedvargas.vercel.app"
      >
        <span className="text-default-600">
          <p>Powered by</p>
        </span>
        <p className="text-primary">Jos</p>
      </Link>
    </motion.footer>
  );
};

export default Footer;
