import SourceCode from "./SourceCode";
import Translation from "./Translation";

type UserDTO = {
    username: string
    roles?: string[]
    password?: string
    translations?: Translation[]
    sourceCodes?: SourceCode[]
}
export default UserDTO;