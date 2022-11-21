import SourceCode from "./SourceCode";
import Translation from "./Translation";

type User = {

    username: string
    roles?: string[]
    translations?: Translation[]
    sourceCodes?: SourceCode[]
}
export default User;