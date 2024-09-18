import { useSelector,useDispatch } from "react-redux";
import { handelModal } from "../redux/slices/handelLoginSlice";
export const handelCheckAuth = () => {
    const {isAuthenticated} = useSelector(store=>store.auth)
const dispatch =useDispatch()
    if (!isAuthenticated) {
      dispatch(handelModal(true));
      return true;
    }

    return false
  };