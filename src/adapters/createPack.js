import axios from 'axios';

export default function createPack(pack, setLoading, setSnackbar, setDownloadLink, setPack) {
    const apiAddress = sessionStorage.getItem("apiAddress");
    const fileName = pack.pack_file.name;
    const file = new Blob([pack.pack_file], {type: "application/zip"});    

    const formData = new FormData();
    formData.append("pack_file", file, fileName);
    formData.append("rep_id", pack.rep_id);
    formData.append("game_dir", pack.game_dir);
    setLoading(true);

    axios.post(`https://${apiAddress}/mprotector/packs/zip`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        if (response.data.dl_link) {
            setDownloadLink(response.data.dl_link);
            setSnackbar(true);
        }
        setPack({
            rep_id: "",
            game_dir: "",
            pack_file: [],
        })
        setLoading(false);
    }).catch((error) => {
        console.log(error);
        setLoading(false);
    });
}