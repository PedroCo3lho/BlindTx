import { MotionButtonProps, TextButtonProps } from "@/interfaces/interfaces";
import { motion } from "framer-motion";
import Image from "next/image";

export const TxtButton = ({
  label,
  type,
  rightIcon,
  className,
  func,
  Icon,
}: TextButtonProps<void>) => {
  return (
    <motion.button
      className={` px-4 py-2 text-black text-xl ${className} `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      type={type}
      onClick={() => func()}
    >
      {rightIcon ? (
        <>
          {Icon ? (
            <div className="flex items-center justify-center gap-2">
              <p className="truncate">{label}</p>
              <Image alt="" className="h-8 w-auto" src={Icon} />
            </div>
          ) : (
            <p className="truncate">{label}</p>
          )}
        </>
      ) : (
        <>
          {Icon ? (
            <div className="flex items-center justify-center gap-2">
              <Image alt="" className="h-8 w-auto" src={Icon} />
              <p className="truncate">{label}</p>
            </div>
          ) : (
            <p className="truncate">{label}</p>
          )}
        </>
      )}
    </motion.button>
  );
};
