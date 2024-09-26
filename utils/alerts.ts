// import { toast, ToastPosition } from "react-toastify";
import Swal from "sweetalert2";

type AlertIconType = 'warning' | 'error' | 'success' | 'info' | 'question'
// type ToastIconType = 'info' | 'success' | 'warning' | 'error' | 'default'

export const successAlertModal = (text: string = "", title: string = "عملیات موفق", icon: AlertIconType = "info") => {
  return Swal.fire({
    // position,
    icon,
    text,
    title,
    showConfirmButton: true,
    // timer: 3000,
    backdrop: true,
  });
};
export const errorAlertModal = (text: string = "", title: string = "عملیات موفق", icon: AlertIconType = "info") => {
  return Swal.fire({
    // position,
    icon,
    text,
    title,
    showConfirmButton: true,
    // timer: 3000,
    backdrop: true,
  });
};

export const confirmAlert = (
  title = "آیا مطمئن هستید",
  text = "",
  icon: AlertIconType = "info",
  confirmButtonColor = "#FF5555",
  confirmButtonText = "تایید"
) => {
  return Swal.fire({
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: `انصراف`,
    confirmButtonColor,
    cancelButtonColor: "gray",
  });
};


//----------------------------------

// export const showToast = (text: string, icon: ToastIconType = "info", position?: ToastPosition | undefined, autoClose?: number | false | undefined) => {
//   return toast(text, {
//     closeOnClick: true,
//     position,
//     autoClose,
//     type: icon,
//     rtl: true
//   });
// }

// export const errorToast = (text = "عملیات ناموفق", icon: ToastIconType = "error", position: ToastPosition | undefined = "bottom-left", autoClose?: number | false | undefined) => {
//   return showToast(text, icon, position, autoClose)
// };

// export const successToast = (text = "عملیات موفق", icon: ToastIconType = "success", position: ToastPosition | undefined = "bottom-left", autoClose?: number | false | undefined) => {
//   return showToast(text, icon, position, autoClose)
// };