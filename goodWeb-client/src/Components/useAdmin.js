import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/users/admin/${user?.email}`);
            return res.data.admin;
            // console.log(res.data.admin)
        }
    })
    return [isAdmin, isAdminLoading]
}
export default useAdmin;