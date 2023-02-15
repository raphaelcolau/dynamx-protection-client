export default function validPack(pack) {
    if (pack.rep_id && pack.rep_id !== "" && pack.rep_id.length > 0) {
        if (pack.pack_file instanceof File && pack.pack_file !== null && pack.pack_file !== undefined && pack.pack_file !== "") {
            return true;
        }
    }
    return false;
}